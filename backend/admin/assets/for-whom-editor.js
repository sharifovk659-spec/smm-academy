(function () {
  const form = document.getElementById('for-whom-form');
  const grid = document.getElementById('fw-preview-grid');
  if (!form || !grid) return;

  const badgeEl = document.getElementById('fw-preview-badge');
  const titleEl = document.getElementById('fw-preview-title');

  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function headerVal(name) {
    const input = form.querySelector(`[name="${name}"]`);
    return input ? input.value.trim() : '';
  }

  function imageUrl(item, field) {
    const input = item.querySelector(`[data-field="${field}"]`);
    return input?.value.trim() || '';
  }

  function updatePreview() {
    const badge = headerVal('badge');
    const title = headerVal('title');
    const highlight = headerVal('titleHighlight');

    if (badgeEl) badgeEl.textContent = badge || 'Барои кӣ';
    if (titleEl) {
      titleEl.innerHTML = `${escapeHtml(title)} <span>${escapeHtml(highlight)}</span>`;
    }

    const items = form.querySelectorAll('#for-whom-items .list-editor-item');
    grid.innerHTML = '';

    items.forEach((item) => {
      const enabled = item.querySelector('[data-enable-toggle]')?.checked !== false;
      const icon = item.querySelector('[data-field="icon"]')?.value.trim() || 'FiUser';
      const titleText = item.querySelector('[data-field="title"]')?.value.trim() || 'Title';
      const desc = item.querySelector('[data-field="desc"]')?.value.trim() || '';
      const tag = item.querySelector('[data-field="tag"]')?.value.trim() || '';
      const avatar = imageUrl(item, 'image');
      const emoji = window.SMMListEditor?.iconEmoji(icon) || '◆';

      const card = document.createElement('div');
      card.className = `fw-preview-card${enabled ? '' : ' is-off'}`;
      card.innerHTML = `
        <div class="fw-preview-card-head">
          ${avatar
            ? `<div class="fw-preview-avatar" style="background-image:url('${avatar}')"></div>`
            : `<div class="fw-preview-icon">${emoji}</div>`}
          ${tag ? `<span class="fw-preview-tag">${escapeHtml(tag)}</span>` : ''}
        </div>
        <div class="fw-preview-title">${escapeHtml(titleText)}</div>
        <div class="fw-preview-desc">${escapeHtml(desc)}</div>
      `;
      grid.appendChild(card);
    });
  }

  form.addEventListener('input', updatePreview);
  form.addEventListener('change', updatePreview);
  document.addEventListener('listEditorChanged', updatePreview);
  document.addEventListener('mediaPickerUpdated', updatePreview);
  updatePreview();
})();
