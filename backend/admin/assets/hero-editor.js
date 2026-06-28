(function () {
  const form = document.getElementById('hero-form');
  if (!form) return;

  const el = {
    logo: document.getElementById('hp-logo'),
    badges: document.getElementById('hp-badges'),
    title: document.getElementById('hp-title'),
    subtitle: document.getElementById('hp-subtitle'),
    ctaPrimary: document.getElementById('hp-cta-primary'),
    ctaSecondary: document.getElementById('hp-cta-secondary'),
    trainer: document.getElementById('hp-trainer'),
    trainerName: document.getElementById('hp-trainer-name'),
    trainerRole: document.getElementById('hp-trainer-role'),
    bg: document.getElementById('hp-bg'),
  };

  function val(name) {
    const input = form.querySelector(`[name="${name}"]`);
    return input ? input.value.trim() : '';
  }

  function imageUrl(name) {
    const input = form.querySelector(`[name="${name}"]`);
    return input?.value.trim() || '';
  }

  function updatePreview() {
    const logoText = val('logo_text') || 'PRO SMM';
    const logoImg = imageUrl('logo');
    if (el.logo) {
      el.logo.innerHTML = logoImg
        ? `<img src="${logoImg}" alt="" style="height:28px;width:auto">`
        : logoText;
    }

    const badgeLines = val('badges').split('\n').map((s) => s.trim()).filter(Boolean);
    if (el.badges) {
      el.badges.innerHTML = badgeLines
        .map((b) => `<span class="hp-badge">${escapeHtml(b)}</span>`)
        .join('');
    }

    const title = val('title');
    const highlight = val('titleHighlight');
    if (el.title) {
      el.title.innerHTML = `${escapeHtml(title)} <span>${escapeHtml(highlight)}</span>`;
    }

    if (el.subtitle) el.subtitle.textContent = val('subtitle');
    if (el.ctaPrimary) el.ctaPrimary.textContent = val('cta_primary') || 'CTA';
    if (el.ctaSecondary) el.ctaSecondary.textContent = val('cta_secondary') || 'Video';
    if (el.trainerName) el.trainerName.textContent = val('trainer_name');
    if (el.trainerRole) el.trainerRole.textContent = val('trainer_role');

    const trainerImg = imageUrl('trainer_image');
    if (el.trainer) {
      el.trainer.style.backgroundImage = trainerImg ? `url('${trainerImg}')` : 'none';
    }

    const bgImg = imageUrl('image');
    if (el.bg) {
      el.bg.style.backgroundImage = bgImg ? `url('${bgImg}')` : 'none';
    }
  }

  function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  form.addEventListener('input', updatePreview);
  form.addEventListener('change', updatePreview);

  // Watch media picker URL fields
  const observer = new MutationObserver(updatePreview);
  form.querySelectorAll('[data-media-url]').forEach((input) => {
    input.addEventListener('input', updatePreview);
  });

  document.addEventListener('mediaPickerUpdated', updatePreview);

  updatePreview();
})();
