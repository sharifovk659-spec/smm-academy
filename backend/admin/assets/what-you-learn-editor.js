(function () {
  const form = document.getElementById('what-you-learn-form');
  const grid = document.getElementById('wyl-preview-grid');
  if (!form || !grid) return;

  const badgeEl = document.getElementById('wyl-preview-badge');
  const titleEl = document.getElementById('wyl-preview-title');

  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function headerVal(name) {
    const input = form.querySelector(`[name="${name}"]`);
    return input ? input.value.trim() : '';
  }

  function updatePreview() {
    const badge = headerVal('badge');
    const title = headerVal('title');
    const highlight = headerVal('titleHighlight');

    if (badgeEl) badgeEl.textContent = badge || 'Чӣ меомӯзед';
    if (titleEl) {
      titleEl.innerHTML = `${escapeHtml(title)} <span>${escapeHtml(highlight)}</span>`;
    }

    const items = form.querySelectorAll('#wyl-items .list-editor-item');
    grid.innerHTML = '';

    items.forEach((item, i) => {
      const icon = item.querySelector('[data-field="icon"]')?.value.trim() || 'FiZap';
      const titleText = item.querySelector('[data-field="title"]')?.value.trim() || 'Skill';
      const desc = item.querySelector('[data-field="desc"]')?.value.trim() || '';
      const emoji = window.SMMListEditor?.iconEmoji(icon) || '◆';

      const card = document.createElement('div');
      card.className = 'wyl-preview-card';
      card.innerHTML = `
        <div class="wyl-preview-num">0${i + 1}</div>
        <div class="wyl-preview-icon">${emoji}</div>
        <div class="wyl-preview-title">${escapeHtml(titleText)}</div>
        <div class="wyl-preview-desc">${escapeHtml(desc)}</div>
      `;
      grid.appendChild(card);
    });
  }

  form.addEventListener('input', updatePreview);
  form.addEventListener('change', updatePreview);
  document.addEventListener('listEditorChanged', updatePreview);
  updatePreview();
})();
