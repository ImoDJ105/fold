function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(i > 0 ? 1 : 0)} ${sizes[i]}`;
}

function formatNumber(n, decimals = 0) {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function initMetrics() {
  const m = window.FOLD_METRICS || {};
  document.querySelectorAll('[data-metric]').forEach((el) => {
    const key = el.dataset.metric;
    const val = m[key];
    if (val === undefined) return;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    el.textContent = prefix + formatNumber(val, decimals) + suffix;
  });

  const slots = document.getElementById('slots-remaining');
  const waitlistSlots = document.getElementById('waitlist-slots');
  const waitlistCount = document.getElementById('waitlist-count');

  if (slots && m.pilotSlotsRemaining !== undefined) slots.textContent = m.pilotSlotsRemaining;
  if (waitlistSlots && m.pilotSlotsRemaining !== undefined) waitlistSlots.textContent = m.pilotSlotsRemaining;
  if (waitlistCount && m.waitlistCount !== undefined) waitlistCount.textContent = m.waitlistCount;
}

function formatCurrency(n, decimals = 0) {
  if (n >= 1_000_000) {
    return `$${formatNumber(n / 1_000_000, 1)}M`;
  }
  if (n >= 1_000) {
    return `$${formatNumber(Math.round(n), decimals)}`;
  }
  return `$${formatNumber(n, decimals)}`;
}

const S3_PER_TB = 23;
const ENGINEER_YEAR = 220_000;
const CALC_DEFAULTS = { s3Bill: 2300, ratio: 3 };

function formatStorage(tb) {
  if (tb >= 1024) {
    const pb = tb / 1024;
    return { value: pb % 1 === 0 ? pb.toFixed(0) : pb.toFixed(1), unit: 'PB', tb };
  }
  return { value: formatNumber(Math.round(tb)), unit: 'TB', tb };
}

function calcImpactFromBill({ s3Before, ratio }) {
  const s3After = s3Before / ratio;
  const monthlySavings = s3Before - s3After;
  const annualSavings = monthlySavings * 12;
  const savingsPct = s3Before > 0 ? Math.round((monthlySavings / s3Before) * 100) : 0;
  const storageTb = s3Before / S3_PER_TB;
  const effectiveTb = storageTb * ratio;
  const engineerFraction = annualSavings / ENGINEER_YEAR;

  return {
    s3Before,
    s3After,
    monthlySavings,
    annualSavings,
    savingsPct,
    storageTb,
    effectiveTb,
    engineerFraction,
    ratio,
  };
}

function initImpactCalculator() {
  const root = document.getElementById('impact-calc');
  if (!root) return;

  const s3BillEl = document.getElementById('calc-s3bill');
  const storageEl = document.getElementById('calc-storage');
  const ratioEl = document.getElementById('calc-ratio');
  const billControl = document.getElementById('calc-bill-control');
  const sizeControl = document.getElementById('calc-size-control');

  let inputMode = 'bill';
  let storageUnit = 'tb';
  let syncing = false;

  function tbToSliderVal(tb) {
    if (storageUnit === 'pb') {
      const pb = tb / 1024;
      return Math.min(10, Math.max(0.1, Math.round(pb * 10) / 10));
    }
    return Math.min(2000, Math.max(10, Math.round(tb / 10) * 10));
  }

  function sliderValToTb(val) {
    return storageUnit === 'pb' ? val * 1024 : val;
  }

  function configureStorageSlider() {
    if (storageUnit === 'pb') {
      storageEl.min = 0.1;
      storageEl.max = 10;
      storageEl.step = 0.1;
    } else {
      storageEl.min = 10;
      storageEl.max = 2000;
      storageEl.step = 10;
    }
  }

  function syncFromBill() {
    if (syncing) return;
    syncing = true;
    const bill = parseInt(s3BillEl.value, 10);
    const tb = bill / S3_PER_TB;
    storageEl.value = tbToSliderVal(tb);
    syncing = false;
  }

  function syncFromStorage() {
    if (syncing) return;
    syncing = true;
    const tb = sliderValToTb(parseFloat(storageEl.value));
    s3BillEl.value = Math.min(50000, Math.max(500, Math.round(tb * S3_PER_TB / 250) * 250));
    syncing = false;
  }

  function initDefaults() {
    s3BillEl.value = CALC_DEFAULTS.s3Bill;
    ratioEl.value = CALC_DEFAULTS.ratio;
    syncFromBill();
    update();
  }

  function update() {
    if (inputMode === 'size') syncFromStorage();
    else syncFromBill();

    const s3Before = parseInt(s3BillEl.value, 10);
    const ratio = parseFloat(ratioEl.value);
    const r = calcImpactFromBill({ s3Before, ratio });

    document.getElementById('calc-hero-pct').textContent = `${r.savingsPct}%`;
    document.getElementById('calc-hero-save').textContent = formatCurrency(r.monthlySavings);

    document.getElementById('calc-s3bill-val').textContent = `${formatCurrency(s3Before)}/mo`;
    const storageFmt = formatStorage(r.storageTb);
    document.getElementById('calc-bill-hint').textContent =
      `≈ ${storageFmt.value} ${storageFmt.unit} at ~$${S3_PER_TB}/TB/mo`;

    document.getElementById('calc-storage-val').textContent = storageUnit === 'pb'
      ? (sliderValToTb(parseFloat(storageEl.value)) / 1024).toFixed(1)
      : formatNumber(parseInt(storageEl.value, 10));
    document.getElementById('calc-storage-unit').textContent = storageUnit.toUpperCase();
    document.getElementById('calc-size-bill').textContent = formatCurrency(s3Before);

    document.getElementById('calc-ratio-val').textContent = ratio % 1 === 0 ? ratio : ratio.toFixed(1);

    document.getElementById('bar-before-amt').textContent = `${formatCurrency(r.s3Before)}/mo`;
    document.getElementById('bar-after-amt').textContent = `${formatCurrency(r.s3After)}/mo`;
    document.getElementById('bar-before').style.width = '100%';
    document.getElementById('bar-after').style.width = `${Math.max(6, (r.s3After / r.s3Before) * 100)}%`;

    document.getElementById('calc-bar-save-line').innerHTML =
      `You keep <strong>${r.savingsPct}%</strong> of your S3 spend · <strong>${formatCurrency(r.monthlySavings)}/mo</strong> saved`;

    const corePct = (100 / ratio).toFixed(1);
    const bonusPct = (100 - 100 / ratio).toFixed(1);
    const todayTrack = document.querySelector('.calc-capacity-track-sm');
    if (todayTrack) todayTrack.style.maxWidth = `${corePct}%`;
    document.getElementById('cap-core').style.width = `${corePct}%`;
    document.getElementById('cap-bonus').style.width = `${bonusPct}%`;
    document.getElementById('cap-bonus-label').textContent =
      ratio % 1 === 0 ? `+${ratio - 1}× more` : `+${(ratio - 1).toFixed(1)}× more`;
    document.getElementById('cap-today').textContent = '1× data';
    document.getElementById('cap-with').textContent =
      ratio % 1 === 0 ? `${ratio}× data` : `${ratio.toFixed(1)}× data`;

    const eff = formatStorage(r.effectiveTb);
    document.getElementById('calc-capacity-foot').innerHTML =
      `Keep <strong>${ratio % 1 === 0 ? ratio : ratio.toFixed(1)}× more</strong> of the data you retain — logs, datasets &amp; files — without a bigger AWS budget.`;

    document.getElementById('out-monthly').textContent = `${formatCurrency(r.monthlySavings)}/mo`;
    document.getElementById('out-annual').textContent =
      `${formatCurrency(r.annualSavings)}/yr stays in your company — not AWS`;

    document.getElementById('out-retention').textContent =
      ratio % 1 === 0 ? `${ratio}× more` : `${ratio.toFixed(1)}× more`;
    document.getElementById('out-retention-sub').textContent =
      'same S3 bill · more logs, datasets & files you retain';

    const engLabel =
      r.engineerFraction >= 1
        ? `~${r.engineerFraction.toFixed(1)} hires`
        : r.engineerFraction >= 0.45
          ? `~½ engineer`
          : `~${Math.round(r.engineerFraction * 12)} eng-months`;
    document.getElementById('out-reinvest').textContent = engLabel;

    document.getElementById('out-investor').textContent = `−${r.savingsPct}% storage COGS`;
    document.getElementById('out-investor-sub').textContent =
      'Cleaner, leaner unit economics — storage is a cost of serving customers, and that line just got smaller.';
  }

  s3BillEl.addEventListener('input', () => {
    syncFromBill();
    update();
  });

  storageEl.addEventListener('input', () => {
    syncFromStorage();
    update();
  });

  ratioEl.addEventListener('input', update);

  root.querySelectorAll('.calc-mode-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      inputMode = btn.dataset.mode;
      root.querySelectorAll('.calc-mode-btn').forEach((b) => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      });
      billControl.classList.toggle('hidden', inputMode !== 'bill');
      sizeControl.classList.toggle('hidden', inputMode !== 'size');
      update();
    });
  });

  root.querySelectorAll('.calc-unit').forEach((btn) => {
    btn.addEventListener('click', () => {
      const prevTb = sliderValToTb(parseFloat(storageEl.value));
      storageUnit = btn.dataset.unit;
      root.querySelectorAll('.calc-unit').forEach((b) => b.classList.toggle('active', b === btn));
      configureStorageSlider();
      storageEl.value = tbToSliderVal(prevTb);
      update();
    });
  });

  configureStorageSlider();
  initDefaults();
}

/* Demo examples */
const FOLD_ESTIMATE_MIN = 3;
const FOLD_ESTIMATE_MAX = 9;
const UPLOAD_ESTIMATE_MIN = 3;
const UPLOAD_ESTIMATE_MAX = 5;

const DEMO_WORKLOADS = {
  'agent-logs': {
    name: 'agent-logs.jsonl',
    label: 'Agent logs',
    originalBytes: 2_292_000,
    foldRatio: 3.3,
  },
  'service-logs': {
    name: 'service-logs.jsonl',
    label: 'Service logs',
    originalBytes: 1_840_000,
    foldRatio: 3.8,
  },
  'training-export': {
    name: 'training-export.jsonl',
    label: 'Training export',
    originalBytes: 4_800_000,
    foldRatio: 4.5,
  },
};

const demoResults = document.getElementById('demo-results');
const resultsBody = document.getElementById('results-body');
const resultsSummary = document.getElementById('results-summary');
const demoResultsTitle = document.getElementById('demo-results-title');
const demoNote = document.getElementById('demo-note');
const demoResetBtn = document.getElementById('demo-reset-btn');
const demoUploadStatus = document.getElementById('demo-upload-status');
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('file-input');

let demoUploadRows = [];
let demoMode = 'examples';

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function foldBytes(original, ratio) {
  return Math.max(1, Math.round(original / ratio));
}

function estimateFoldRatio(fileName, byteLength, buffer) {
  const KB = 1024;
  const MB = KB * 1024;
  const GB = MB * 1024;

  // Browser uploads are usually KB–few MB. Stay conservative — TB-scale ratios
  // come from the calculator and a design session, not a single small file.
  if (byteLength < 10 * MB) {
    return UPLOAD_ESTIMATE_MIN;
  }

  // 10 MB → 3×  …  1 GB+ → up to 5× (cap for upload demo)
  const logMin = Math.log10(10 * MB);
  const logMax = Math.log10(GB);
  let sizeFactor = (Math.log10(byteLength) - logMin) / (logMax - logMin);
  sizeFactor = Math.min(1, Math.max(0, sizeFactor));

  let repFactor = 0;
  if (byteLength >= 50 * MB) {
    try {
      const chunk = buffer.slice(0, Math.min(byteLength, 400000));
      const text = new TextDecoder('utf-8', { fatal: false }).decode(chunk);
      const lines = text.split('\n').filter((line) => line.trim().length > 24);
      if (lines.length >= 8) {
        const sample = lines.slice(0, Math.min(lines.length, 400));
        const prefixes = sample.map((line) => line.slice(0, 72));
        const unique = new Set(prefixes).size;
        repFactor = (1 - unique / prefixes.length) * 0.2;
      }
    } catch (_) {
      /* binary — size-only */
    }
  }

  const combined = Math.min(1, sizeFactor * 0.85 + repFactor);
  const ratio =
    UPLOAD_ESTIMATE_MIN + combined * (UPLOAD_ESTIMATE_MAX - UPLOAD_ESTIMATE_MIN);
  return Math.round(Math.min(UPLOAD_ESTIMATE_MAX, Math.max(UPLOAD_ESTIMATE_MIN, ratio)) * 10) / 10;
}

function buildRow({ label, originalBytes, ratio, kind }) {
  const fold = foldBytes(originalBytes, ratio);
  const saved = originalBytes > 0 ? Math.round((1 - fold / originalBytes) * 100) : 0;
  const safeLabel = escapeHtml(label);
  const badge =
    kind === 'upload'
      ? '<span class="demo-row-badge">Estimate</span>'
      : '<span class="demo-row-badge demo-row-badge-muted">Typical</span>';

  return {
    original: originalBytes,
    fold,
    ratio,
    saved,
    html: `
      <tr>
        <td><span class="demo-row-name">${safeLabel}</span> ${badge}</td>
        <td>${formatBytes(originalBytes)}</td>
        <td class="demo-col-fold">${formatBytes(fold)}</td>
        <td class="ratio-good">${ratio}×</td>
        <td class="ratio-good">${saved}%</td>
      </tr>
    `,
  };
}

function renderDemoTable(rows, { title, note, showReset }) {
  if (!resultsBody) return;

  resultsBody.innerHTML = rows.map((r) => r.html).join('');

  const totalOriginal = rows.reduce((s, r) => s + r.original, 0);
  const totalFold = rows.reduce((s, r) => s + r.fold, 0);
  const overallRatio = totalOriginal ? (totalOriginal / totalFold).toFixed(1) : '—';
  const overallSaved = totalOriginal ? Math.round((1 - totalFold / totalOriginal) * 100) : '—';

  resultsSummary.innerHTML = `
    <div class="summary-card">
      <div class="value">${formatBytes(totalOriginal)}</div>
      <div class="label">Total raw</div>
    </div>
    <div class="summary-card">
      <div class="value">${formatBytes(totalFold)}</div>
      <div class="label">With Fold</div>
    </div>
    <div class="summary-card">
      <div class="value">${overallRatio}×</div>
      <div class="label">Compression ratio</div>
    </div>
    <div class="summary-card">
      <div class="value">${overallSaved}%</div>
      <div class="label">Storage saved</div>
    </div>
  `;

  if (demoResultsTitle) demoResultsTitle.textContent = title;
  if (demoNote) demoNote.innerHTML = note;
  if (demoResetBtn) demoResetBtn.classList.toggle('hidden', !showReset);
  if (demoUploadStatus) demoUploadStatus.classList.add('hidden');
}

function setUploadStatus(message, isError) {
  if (!demoUploadStatus) return;
  demoUploadStatus.textContent = message;
  demoUploadStatus.classList.toggle('demo-upload-status-error', !!isError);
  demoUploadStatus.classList.remove('hidden');
}

function loadDemoSamples(keys) {
  demoMode = 'examples';
  demoUploadRows = [];

  const sampleKeys = keys.filter((k) => DEMO_WORKLOADS[k]);
  if (!sampleKeys.length) return;

  const rows = sampleKeys.map((key) => {
    const w = DEMO_WORKLOADS[key];
    return buildRow({
      label: w.label,
      originalBytes: w.originalBytes,
      ratio: w.foldRatio,
      kind: 'example',
    });
  });

  renderDemoTable(rows, {
    title: 'Example results',
    note:
      'Typical ratios from design sessions on repetitive logs & datasets. <a href="#calculator">Model your S3 savings →</a>',
    showReset: false,
  });

  document.querySelectorAll('[data-sample]').forEach((btn) => {
    btn.classList.toggle('demo-sample-active', sampleKeys[0] === btn.dataset.sample);
  });
}

async function handleUploadedFiles(fileList) {
  const files = Array.from(fileList || []);
  if (!files.length) return;

  setUploadStatus('Estimating…', false);
  demoMode = 'upload';
  demoUploadRows = [];

  try {
    for (const file of files) {
      const buffer = await file.arrayBuffer();
      const ratio = estimateFoldRatio(file.name, buffer.byteLength, buffer);
      demoUploadRows.push(
        buildRow({
          label: file.name,
          originalBytes: buffer.byteLength,
          ratio,
          kind: 'upload',
        })
      );
    }

    if (!demoUploadRows.length) return;

    renderDemoTable(demoUploadRows, {
      title: 'Your file — Fold estimate',
      note:
        'Conservative estimate on this file (3×–5×). At TB scale on S3, design sessions often reach 3×–9× — <a href="#calculator">model your bill →</a>',
      showReset: true,
    });

    if (demoResults) {
      demoResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    document.querySelectorAll('[data-sample]').forEach((btn) => btn.classList.remove('demo-sample-active'));
  } catch (_) {
    setUploadStatus('Could not read that file — try JSON, JSONL, CSV, Parquet, or logs.', true);
    return;
  }

  if (fileInput) fileInput.value = '';
}

function initDemo() {
  document.querySelectorAll('[data-sample]').forEach((btn) => {
    btn.addEventListener('click', () => loadDemoSamples([btn.dataset.sample]));
  });

  if (demoResetBtn) {
    demoResetBtn.addEventListener('click', () => {
      if (fileInput) fileInput.value = '';
      loadDemoSamples(['agent-logs']);
    });
  }

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      handleUploadedFiles(e.dataTransfer.files);
    });
    fileInput.addEventListener('change', (e) => {
      handleUploadedFiles(e.target.files);
    });
  }

  loadDemoSamples(['agent-logs']);
}

const contactEmail = (window.FOLD_CONTACT && window.FOLD_CONTACT.email) || 'imogendhy@gmail.com';
const formEndpoint =
  (window.FOLD_CONTACT && window.FOLD_CONTACT.formEndpoint) ||
  `https://formsubmit.co/ajax/${contactEmail}`;

const THANK_YOU = "Thank you! We'll be in touch shortly.";
const SUBMIT_ERROR = `Something went wrong. Please email ${contactEmail} directly.`;

async function submitForm(payload, submitButton) {
  const originalLabel = submitButton ? submitButton.textContent : '';
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
  }

  try {
    const response = await fetch(formEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _captcha: 'false',
        _template: 'table',
        ...payload,
      }),
    });

    if (!response.ok) throw new Error('Form submit failed');
    const data = await response.json();
    if (data.success !== 'true' && data.success !== true) throw new Error('Form submit failed');
    return true;
  } catch {
    return false;
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalLabel;
    }
  }
}

const CONTACT_INTENTS = {
  growth: {
    title: 'Get started with Growth',
    description: 'Ready to go live on the $299/mo plan? Tell us about your workload and we\'ll get you set up.',
    subject: 'Fold — Growth plan inquiry',
    messagePlaceholder: 'Company, data volume on S3, timeline to go live…',
    submitLabel: 'Contact us',
    bodyIntro: 'I would like to get started on the Growth plan.',
  },
  enterprise: {
    title: 'Contact sales',
    description: 'Need on-prem, VPC, or volume pricing? We typically reply within one business day.',
    subject: 'Fold — enterprise inquiry',
    messagePlaceholder: 'Deployment needs, data volume, timeline…',
    submitLabel: 'Send message',
    bodyIntro: 'I would like to discuss an enterprise deployment.',
  },
};

const WAITLIST_INTENTS = {
  default: {
    subject: 'Fold — early access request',
    bodyIntro: 'I would like to request early access.',
    submitLabel: 'Request early access',
  },
  pilot: {
    subject: 'Fold — pilot application',
    bodyIntro: 'I would like to apply for the free pilot program.',
    submitLabel: 'Apply for pilot',
    title: 'Apply for the free pilot',
    description:
      '30-day design partner program — up to 500 GB compressed, dedicated onboarding, and a Slack support channel.',
  },
};

let currentWaitlistIntent = WAITLIST_INTENTS.default;
let currentContactIntent = null;

function getWaitlistCount() {
  return (window.FOLD_METRICS && window.FOLD_METRICS.waitlistCount) || 37;
}

function getPilotSlots() {
  return (window.FOLD_METRICS && window.FOLD_METRICS.pilotSlotsRemaining) || 2;
}

function setWaitlistPlan(plan) {
  currentWaitlistIntent = WAITLIST_INTENTS[plan] || WAITLIST_INTENTS.default;
  const titleEl = document.getElementById('waitlist-title');
  const descEl = document.getElementById('waitlist-desc');
  const submitEl = document.getElementById('waitlist-submit');
  if (!titleEl || !descEl || !submitEl) return;

  if (plan === 'pilot') {
    titleEl.textContent = currentWaitlistIntent.title;
    descEl.innerHTML = `${currentWaitlistIntent.description} We're accepting <strong id="waitlist-slots">${getPilotSlots()}</strong> more design partners for Q3.`;
  } else {
    titleEl.innerHTML = `Join <span id="waitlist-count">${getWaitlistCount()}</span>+ teams on the waitlist`;
    descEl.innerHTML =
      `We're accepting <strong id="waitlist-slots">${getPilotSlots()}</strong> more design partners for Q3. Running observability on your own infra? Building RAG pipelines? Let's talk.`;
  }
  submitEl.textContent = currentWaitlistIntent.submitLabel;
}

function openContactModal(intent) {
  const config = CONTACT_INTENTS[intent];
  if (!config) return;

  currentContactIntent = config;
  const modal = document.getElementById('contact-modal');
  const title = document.getElementById('contact-modal-title');
  const desc = document.getElementById('contact-modal-desc');
  const message = document.getElementById('contact-message');
  const submit = document.getElementById('contact-submit');
  const note = document.getElementById('contact-note');
  const form = document.getElementById('contact-form');

  title.textContent = config.title;
  desc.textContent = config.description;
  message.placeholder = config.messagePlaceholder;
  submit.textContent = config.submitLabel;
  note.textContent = '';
  form.reset();

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  document.getElementById('contact-email').focus();
}

function closeContactModal() {
  const modal = document.getElementById('contact-modal');
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  currentContactIntent = null;
}

document.querySelectorAll('[data-contact]').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    openContactModal(el.dataset.contact);
  });
});

document.querySelectorAll('[data-waitlist-plan]').forEach((el) => {
  el.addEventListener('click', () => {
    setWaitlistPlan(el.dataset.waitlistPlan);
  });
});

document.querySelectorAll('a[href="#waitlist"]:not([data-waitlist-plan])').forEach((el) => {
  el.addEventListener('click', () => setWaitlistPlan('default'));
});

document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!currentContactIntent) return;

  const email = document.getElementById('contact-email').value.trim();
  const company = document.getElementById('contact-company').value.trim();
  const message = document.getElementById('contact-message').value.trim();
  const note = document.getElementById('contact-note');
  const submit = document.getElementById('contact-submit');

  const ok = await submitForm(
    {
      _subject: currentContactIntent.subject,
      _replyto: email,
      email,
      company: company || '—',
      message: message || '(No additional details provided)',
      request: currentContactIntent.bodyIntro,
    },
    submit
  );

  note.textContent = ok ? THANK_YOU : SUBMIT_ERROR;
  if (ok) document.getElementById('contact-form').reset();
});

document.getElementById('contact-modal-close').addEventListener('click', closeContactModal);

document.getElementById('contact-modal').addEventListener('click', (e) => {
  if (e.target.id === 'contact-modal') closeContactModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !document.getElementById('contact-modal').classList.contains('hidden')) {
    closeContactModal();
  }
});

function handleRouteIntent() {
  const hash = window.location.hash;
  if (hash === '#waitlist-pilot') {
    setWaitlistPlan('pilot');
  } else if (hash === '#contact-growth') {
    openContactModal('growth');
    history.replaceState(null, '', '#pricing');
  } else if (hash === '#contact-enterprise') {
    openContactModal('enterprise');
    history.replaceState(null, '', '#pricing');
  }
}

window.addEventListener('hashchange', handleRouteIntent);
handleRouteIntent();

document.getElementById('waitlist-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email-input').value.trim();
  const note = document.getElementById('waitlist-note');
  const submit = document.getElementById('waitlist-submit');

  const ok = await submitForm(
    {
      _subject: currentWaitlistIntent.subject,
      _replyto: email,
      email,
      request: currentWaitlistIntent.bodyIntro,
    },
    submit
  );

  note.textContent = ok ? THANK_YOU : SUBMIT_ERROR;
  if (ok) document.getElementById('waitlist-form').reset();
});

const menuToggle = document.getElementById('menu-toggle');
const navMobile = document.getElementById('nav-mobile');

if (menuToggle && navMobile) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navMobile.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMobile.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

initMetrics();
initImpactCalculator();
initDemo();
