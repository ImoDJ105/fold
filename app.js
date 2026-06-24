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

  function update() {
    const tb = parseInt(slider.value, 10);
    const current = tb * s3PerTB;
    const compressed = current / ratio;
    const foldFee = 299 + compressed * 0.006 * 1024;
    const savings = current - foldFee;

    storageTb.textContent = tb;
    currentCost.textContent = `$${formatNumber(current)}/mo`;
    foldCost.textContent = `$${formatNumber(Math.round(foldFee))}/mo`;
    savingsCost.textContent = `$${formatNumber(Math.round(savings))}/mo`;
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

document.getElementById('waitlist-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email-input').value.trim();
  const note = document.getElementById('waitlist-note');
  const subject = encodeURIComponent('Fold — early access request');
  const body = encodeURIComponent(`Hi Fold team,\n\nI'd like to request early access.\n\nEmail: ${email}\n`);
  window.location.href = `mailto:dhyes11@gmail.com?subject=${subject}&body=${body}`;
  note.textContent = 'Opening your email client… If nothing opens, email us at dhyes11@gmail.com';
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
