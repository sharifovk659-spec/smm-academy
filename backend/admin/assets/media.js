(function () {
  const grid = document.getElementById('media-grid');
  const uploadInput = document.getElementById('media-upload-input');
  const progress = document.getElementById('media-upload-progress');
  const modal = document.getElementById('media-modal');
  const modalImg = document.getElementById('modal-preview-img');
  const modalSizes = document.getElementById('modal-preview-sizes');
  const items = window.MEDIA_ITEMS || [];

  const SIZE_LABELS = {
    1920: 'Desktop 1920px',
    1440: 'Laptop 1440px',
    768: 'Tablet 768px',
    390: 'Mobile 390px',
  };

  function findItem(id) {
    return items.find((i) => i.id === id);
  }

  function showProgress(show) {
    if (progress) progress.classList.toggle('hidden', !show);
  }

  uploadInput?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append('file', file);

    showProgress(true);
    try {
      const res = await fetch('/api/upload.php', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      items.unshift(data.media);
      document.getElementById('media-empty')?.remove();
      grid.insertAdjacentHTML('afterbegin', renderCard(data.media));
    } catch (err) {
      alert(err.message || 'Хатогӣ');
    } finally {
      showProgress(false);
      uploadInput.value = '';
    }
  });

  function renderCard(item) {
    return `
      <div class="media-card" data-id="${item.id}">
        <div class="media-card-preview" data-preview="${item.id}">
          <img src="${item.default}" alt="${item.alt || item.original_name}" loading="lazy">
          <div class="media-card-overlay">
            <button type="button" class="btn-icon" data-action="preview" title="Preview">👁</button>
            <button type="button" class="btn-icon btn-danger" data-action="delete" title="Delete">🗑</button>
          </div>
        </div>
        <div class="media-card-meta">
          <span class="media-card-name">${item.original_name}</span>
          <span class="media-card-size">${item.width}×${item.height}</span>
        </div>
        <div class="media-card-url">
          <input type="text" readonly value="${item.default}" onclick="this.select()">
          <button type="button" class="btn-copy" data-copy="${item.default}">📋</button>
        </div>
      </div>`;
  }

  grid?.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-action]');
    const copyBtn = e.target.closest('[data-copy]');
    const card = e.target.closest('.media-card');

    if (copyBtn) {
      await navigator.clipboard.writeText(copyBtn.dataset.copy);
      copyBtn.textContent = '✓';
      setTimeout(() => (copyBtn.textContent = '📋'), 1500);
      return;
    }

    if (!btn || !card) return;
    const id = card.dataset.id;
    const action = btn.dataset.action;

    if (action === 'preview') {
      openPreview(id);
    }

    if (action === 'delete') {
      if (!confirm('Сурат нест карда шавад?')) return;
      try {
        const res = await fetch(`/api/media.php?id=${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Delete failed');
        card.remove();
        const idx = items.findIndex((i) => i.id === id);
        if (idx >= 0) items.splice(idx, 1);
      } catch (err) {
        alert(err.message || 'Хатогӣ');
      }
    }
  });

  function openPreview(id) {
    const item = findItem(id);
    if (!item) return;

    modalImg.src = item.default;
    modalImg.alt = item.alt || item.original_name;

    modalSizes.innerHTML = Object.entries(item.sizes || {})
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([w, url]) => `
        <div class="media-size-preview">
          <div class="media-size-label">${SIZE_LABELS[w] || w + 'px'}</div>
          <img src="${url}" alt="${w}px" loading="lazy">
          <code>${url}</code>
        </div>
      `).join('');

    modal.classList.remove('hidden');
  }

  modal?.addEventListener('click', (e) => {
    if (e.target.matches('[data-close-modal]')) {
      modal.classList.add('hidden');
    }
  });

  // Media picker support (used in hero, texts, etc.)
  window.SMMMediaPicker = {
    open(onSelect) {
      const pickerModal = document.getElementById('media-picker-modal');
      if (!pickerModal) {
        alert('Аввал ба саҳифаи Медиа равед');
        return;
      }
      pickerModal.classList.remove('hidden');
      pickerModal._onSelect = onSelect;
    },
    getItems() {
      return items;
    },
  };
})();

// Picker modal for content forms
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('[data-media-picker]')) {
    initFormPickers();
  }
});

window.initFormPickers = initFormPickers;

function initFormPickers() {
  document.querySelectorAll('[data-media-picker]:not([data-picker-init])').forEach((wrap) => {
    wrap.setAttribute('data-picker-init', '1');
    const input = wrap.querySelector('[data-media-url]');
    const jsonInput = wrap.querySelector('[data-media-json]');
    const preview = wrap.querySelector('[data-media-preview]');
    const uploadBtn = wrap.querySelector('[data-media-upload]');
    const pickBtn = wrap.querySelector('[data-media-pick]');
    const fileInput = wrap.querySelector('[data-media-file]');

    function updatePreview(src) {
      if (!preview) return;
      if (src) {
        preview.innerHTML = `<img src="${typeof src === 'string' ? src : src.default}" alt="preview">`;
        preview.classList.remove('hidden');
      } else {
        preview.innerHTML = '';
        preview.classList.add('hidden');
      }
    }

    if (input?.value) updatePreview(input.value);

    uploadBtn?.addEventListener('click', () => fileInput?.click());

    fileInput?.addEventListener('change', async () => {
      const file = fileInput.files?.[0];
      if (!file) return;
      const form = new FormData();
      form.append('file', file);
      try {
        const res = await fetch('/api/upload.php', { method: 'POST', body: form });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        applyMedia(data.image, data.media.default);
      } catch (err) {
        alert(err.message);
      }
      fileInput.value = '';
    });

    pickBtn?.addEventListener('click', async () => {
      try {
        const res = await fetch('/api/media.php');
        const data = await res.json();
        showPickerGrid(data.items, (item) => {
          applyMedia(
            { default: item.default, sizes: item.sizes, webp: true, alt: item.alt },
            item.default
          );
        });
      } catch {
        alert('Медиа бор нашуд');
      }
    });

    function applyMedia(imageObj, url) {
      if (jsonInput) jsonInput.value = JSON.stringify(imageObj);
      if (input) input.value = url;
      updatePreview(imageObj);
      document.dispatchEvent(new CustomEvent('mediaPickerUpdated'));
    }

    wrap.querySelector('[data-media-delete]')?.addEventListener('click', () => {
      if (jsonInput) jsonInput.value = '';
      if (input) input.value = '';
      updatePreview(null);
      document.dispatchEvent(new CustomEvent('mediaPickerUpdated'));
    });
  });
}

function showPickerGrid(items, onSelect) {
  let overlay = document.getElementById('inline-media-picker');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'inline-media-picker';
    overlay.className = 'media-modal';
    overlay.innerHTML = `
      <div class="media-modal-backdrop" data-close></div>
      <div class="media-modal-content media-picker-content">
        <div class="media-modal-header">
          <h2>Интихоби сурат</h2>
          <button type="button" class="btn-icon" data-close>✕</button>
        </div>
        <div class="media-picker-grid"></div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => {
      if (e.target.matches('[data-close]')) overlay.classList.add('hidden');
    });
  }

  const gridEl = overlay.querySelector('.media-picker-grid');
  gridEl.innerHTML = items.length
    ? items.map((item) => `
        <button type="button" class="media-picker-item" data-id="${item.id}">
          <img src="${item.default}" alt="">
          <span>${item.original_name}</span>
        </button>
      `).join('')
    : '<p class="media-empty-text">Сурат нест. Upload кунед.</p>';

  gridEl.querySelectorAll('.media-picker-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = items.find((i) => i.id === btn.dataset.id);
      if (item) onSelect(item);
      overlay.classList.add('hidden');
    });
  });

  overlay.classList.remove('hidden');
}
