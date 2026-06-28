<?php
declare(strict_types=1);
require_once __DIR__ . '/nav.php';

$currentPage = $currentPage ?? '';
$pageTitle = $pageTitle ?? 'Admin';
$adminUser = $_SESSION['admin_user'] ?? 'Admin';
$siteName = adminSiteName();
$showSaveBtn = $showSaveBtn ?? ($currentPage !== 'dashboard' && $currentPage !== 'settings' && $currentPage !== 'media');
$userInitials = adminUserInitials($adminUser);
?>
<!DOCTYPE html>
<html lang="tg">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= htmlspecialchars($pageTitle) ?> — SMM Admin</title>
  <link rel="stylesheet" href="/admin/assets/admin.css">
  <?php if (!empty($extraStyles)): ?>
    <?php foreach ($extraStyles as $style): ?>
      <link rel="stylesheet" href="<?= htmlspecialchars($style) ?>">
    <?php endforeach; ?>
  <?php endif; ?>
</head>
<body>
  <div class="admin-layout">
    <?php if (isLoggedIn()): ?>
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-brand">
        <span class="brand-icon">⚡</span>
        <div>
          <div class="brand-title">SMM Admin</div>
          <div class="brand-sub">Premium Panel</div>
        </div>
      </div>
      <nav class="sidebar-nav">
        <?php foreach (adminNavItems() as $item): ?>
          <a href="<?= htmlspecialchars($item['href']) ?>"
             class="nav-link <?= $currentPage === $item['id'] ? 'active' : '' ?>">
            <span class="nav-icon"><?= adminIcon($item['icon']) ?></span>
            <span class="nav-label"><?= htmlspecialchars($item['label']) ?></span>
          </a>
        <?php endforeach; ?>
      </nav>
    </aside>
    <div class="admin-shell">
      <header class="topbar">
        <button type="button" class="topbar-toggle" id="sidebar-toggle" aria-label="Меню">
          <span></span><span></span><span></span>
        </button>
        <div class="topbar-left">
          <span class="topbar-site"><?= htmlspecialchars($siteName) ?></span>
          <span class="topbar-divider">/</span>
          <span class="topbar-page"><?= htmlspecialchars($pageTitle) ?></span>
        </div>
        <div class="topbar-actions">
          <a href="http://localhost:3000" target="_blank" rel="noopener" class="topbar-btn topbar-btn-ghost">
            <?= adminIcon('external') ?>
            <span>View Website</span>
          </a>
          <?php if ($showSaveBtn): ?>
          <button type="button" class="topbar-btn topbar-btn-primary" id="topbar-save">
            <?= adminIcon('save') ?>
            <span>Save</span>
          </button>
          <?php endif; ?>
          <div class="topbar-profile" id="topbar-profile">
            <button type="button" class="profile-trigger" id="profile-trigger" aria-expanded="false">
              <span class="profile-avatar"><?= htmlspecialchars($userInitials) ?></span>
              <span class="profile-name"><?= htmlspecialchars($adminUser) ?></span>
            </button>
            <div class="profile-dropdown" id="profile-dropdown">
              <div class="profile-dropdown-header">
                <span class="profile-avatar profile-avatar-lg"><?= htmlspecialchars($userInitials) ?></span>
                <div>
                  <div class="profile-dropdown-name"><?= htmlspecialchars($adminUser) ?></div>
                  <div class="profile-dropdown-role">Administrator</div>
                </div>
              </div>
              <a href="/admin/settings.php" class="profile-dropdown-link">
                <?= adminIcon('settings') ?> Танзимот
              </a>
              <a href="/admin/logout.php" class="profile-dropdown-link profile-dropdown-logout">
                <?= adminIcon('logout') ?> Logout
              </a>
            </div>
          </div>
        </div>
      </header>
      <main class="admin-main">
        <?php if (!empty($flashSuccess)): ?>
          <div class="alert alert-success"><?= htmlspecialchars($flashSuccess) ?></div>
        <?php endif; ?>
        <?php if (!empty($flashError)): ?>
          <div class="alert alert-error"><?= htmlspecialchars($flashError) ?></div>
        <?php endif; ?>
    <?php else: ?>
    <main class="admin-main admin-main--full">
    <?php endif; ?>
