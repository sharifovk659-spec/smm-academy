(function () {
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  toggle?.addEventListener('click', () => {
    sidebar?.classList.toggle('open');
    document.body.classList.toggle('sidebar-open');
  });
  document.addEventListener('click', (e) => {
    if (sidebar?.classList.contains('open') &&
        !sidebar.contains(e.target) &&
        !toggle?.contains(e.target)) {
      sidebar.classList.remove('open');
      document.body.classList.remove('sidebar-open');
    }
    const profile = document.getElementById('topbar-profile');
    const trigger = document.getElementById('profile-trigger');
    if (profile && !profile.contains(e.target)) {
      profile.classList.remove('open');
      trigger?.setAttribute('aria-expanded', 'false');
    }
  });

  const saveBtn = document.getElementById('topbar-save');
  saveBtn?.addEventListener('click', () => {
    const form = document.querySelector('.admin-main form');
    if (form) {
      if (typeof form.requestSubmit === 'function') {
        form.requestSubmit();
      } else {
        form.submit();
      }
      saveBtn.classList.add('saving');
      setTimeout(() => saveBtn.classList.remove('saving'), 1200);
    }
  });

  const profileTrigger = document.getElementById('profile-trigger');
  const profileWrap = document.getElementById('topbar-profile');
  profileTrigger?.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = profileWrap?.classList.toggle('open');
    profileTrigger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();
