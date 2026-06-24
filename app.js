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
  const roiRatio = document.getElementById('roi-ratio');

  if (slots && m.pilotSlotsRemaining !== undefined) slots.textContent = m.pilotSlotsRemaining;
  if (waitlistSlots && m.pilotSlotsRemaining !== undefined) waitlistSlots.textContent = m.pilotSlotsRemaining;
  if (waitlistCount && m.waitlistCount !== undefined) waitlistCount.textContent = m.waitlistCount;
  if (roiRatio && m.avgCompressionRatio !== undefined) roiRatio.textContent = m.avgCompressionRatio;
}

function initROICalculator() {
  const slider = document.getElementById('storage-slider');
  const storageTb = document.getElementById('storage-tb');
  const currentCost = document.getElementById('current-cost');
  const foldCost = document.getElementById('fold-cost');
  const savingsCost = document.getElementById('savings-cost');
  if (!slider) return;

  const ratio = (window.FOLD_METRICS && window.FOLD_METRICS.avgCompressionRatio) || 8;
  const s3PerTB = 23;
  const platformFee = 299;

  function update() {
    const tb = parseInt(slider.value, 10);
    const storageCost = tb * s3PerTB;
    const foldedStorage = storageCost / ratio;
    const foldTotal = foldedStorage + platformFee;
    const savings = Math.max(0, storageCost - foldTotal);

    storageTb.textContent = tb;
    currentCost.textContent = `$${formatNumber(storageCost)}/mo`;
    foldCost.textContent = `$${formatNumber(Math.round(foldTotal))}/mo`;
    savingsCost.textContent = `+$${formatNumber(Math.round(savings))}/mo`;
  }

  slider.addEventListener('input', update);
  update();
}

async function compressFile(file) {
  const buffer = await file.arrayBuffer();
  const stream = new Blob([buffer]).stream().pipeThrough(new CompressionStream('gzip'));
  const compressed = await new Response(stream).arrayBuffer();
  return { original: buffer.byteLength, compressed: compressed.byteLength };
}

const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('file-input');
const demoResults = document.getElementById('demo-results');
const resultsBody = document.getElementById('results-body');
const resultsSummary = document.getElementById('results-summary');
const clearBtn = document.getElementById('clear-btn');

let allResults = [];

dropzone.addEventListener('click', () => fileInput.click());

dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropzone.classList.add('dragover');
});

dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));

dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropzone.classList.remove('dragover');
  handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

clearBtn.addEventListener('click', () => {
  allResults = [];
  resultsBody.innerHTML = '';
  resultsSummary.innerHTML = '';
  demoResults.classList.add('hidden');
  fileInput.value = '';
});

async function handleFiles(files) {
  if (!files.length) return;
  demoResults.classList.remove('hidden');

  for (const file of files) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${file.name}</td><td colspan="4" style="color: var(--text-muted)">Compressing…</td>`;
    resultsBody.appendChild(row);

    try {
      const { original, compressed } = await compressFile(file);
      const ratio = (original / compressed).toFixed(1);
      const saved = ((1 - compressed / original) * 100).toFixed(0);

      allResults.push({ original, compressed });

      row.innerHTML = `
        <td>${file.name}</td>
        <td>${formatBytes(original)}</td>
        <td>${formatBytes(compressed)}</td>
        <td class="ratio-good">${ratio}×</td>
        <td class="ratio-good">${saved}%</td>
      `;
    } catch {
      row.innerHTML = `<td>${file.name}</td><td colspan="4" style="color: #ef4444">Compression failed</td>`;
    }
  }

  updateSummary();
}

function updateSummary() {
  const totalOriginal = allResults.reduce((s, r) => s + r.original, 0);
  const totalCompressed = allResults.reduce((s, r) => s + r.compressed, 0);
  const overallRatio = totalOriginal ? (totalOriginal / totalCompressed).toFixed(1) : '—';
  const overallSaved = totalOriginal ? ((1 - totalCompressed / totalOriginal) * 100).toFixed(0) : '—';

  resultsSummary.innerHTML = `
    <div class="summary-card">
      <div class="value">${formatBytes(totalOriginal)}</div>
      <div class="label">Total original</div>
    </div>
    <div class="summary-card">
      <div class="value">${formatBytes(totalCompressed)}</div>
      <div class="label">Total compressed</div>
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
}

const contactEmail = (window.FOLD_CONTACT && window.FOLD_CONTACT.email) || 'imogendhy@gmail.com';

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

document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!currentContactIntent) return;

  const email = document.getElementById('contact-email').value.trim();
  const company = document.getElementById('contact-company').value.trim();
  const message = document.getElementById('contact-message').value.trim();
  const note = document.getElementById('contact-note');
  const subject = encodeURIComponent(currentContactIntent.subject);
  const body = encodeURIComponent(
    `${currentContactIntent.bodyIntro}\n\nEmail: ${email}\nCompany: ${company || '—'}\n\n${message || '(No additional details provided)'}\n`
  );

  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  note.textContent = "Thank you! We'll be in touch shortly.";
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

document.getElementById('waitlist-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email-input').value.trim();
  const note = document.getElementById('waitlist-note');
  const subject = encodeURIComponent(currentWaitlistIntent.subject);
  const body = encodeURIComponent(
    `Hi Fold team,\n\n${currentWaitlistIntent.bodyIntro}\n\nEmail: ${email}\n`
  );
  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  note.textContent = "Thank you! We'll be in touch shortly.";
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
initROICalculator();
