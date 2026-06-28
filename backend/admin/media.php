<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/MediaService.php';
require_once __DIR__ . '/includes/nav.php';

requireAuth();

$items = MediaService::listAll();
$breakpoints = MediaService::breakpoints();

$pageTitle = 'Медиа';
$currentPage = 'media';
$extraScripts = ['/admin/assets/media.js'];
require __DIR__ . '/includes/header.php';
adminPageHeader('Медиа', 'Upload · Preview · Delete · WebP · Responsive');
?>

<div class="media-toolbar">
  <label class="btn btn-primary media-upload-btn">
    📤 Upload Image
    <input type="file" id="media-upload-input" accept="image/jpeg,image/png,image/webp,image/gif" hidden>
  </label>
  <div class="media-toolbar-info">
    <span class="badge-webp">WebP</span>
    <span class="badge-size">Desktop 1920px</span>
    <span class="badge-size">Laptop 1440px</span>
    <span class="badge-size">Tablet 768px</span>
    <span class="badge-size">Mobile 390px</span>
  </div>
</div>

<div id="media-upload-progress" class="media-progress hidden">
  <div class="media-progress-bar"></div>
  <span>Конвертатсия ба WebP...</span>
</div>

<div id="media-grid" class="media-grid" data-breakpoints="<?= htmlspecialchars(json_encode($breakpoints)) ?>">
  <?php if (empty($items)): ?>
    <div class="media-empty" id="media-empty">
      <div class="media-empty-icon">🖼</div>
      <p>Ҳоло сурат нест. Upload Image пахш кунед.</p>
    </div>
  <?php else: ?>
    <?php foreach ($items as $item): ?>
      <div class="media-card" data-id="<?= htmlspecialchars($item['id']) ?>">
        <div class="media-card-preview" data-preview="<?= htmlspecialchars($item['id']) ?>">
          <img src="<?= htmlspecialchars($item['default']) ?>" alt="<?= htmlspecialchars($item['alt'] ?: $item['original_name']) ?>" loading="lazy">
          <div class="media-card-overlay">
            <button type="button" class="btn-icon" data-action="preview" title="Preview">👁</button>
            <button type="button" class="btn-icon btn-danger" data-action="delete" title="Delete">🗑</button>
          </div>
        </div>
        <div class="media-card-meta">
          <span class="media-card-name"><?= htmlspecialchars($item['original_name']) ?></span>
          <span class="media-card-size"><?= (int) $item['width'] ?>×<?= (int) $item['height'] ?></span>
        </div>
        <div class="media-card-url">
          <input type="text" readonly value="<?= htmlspecialchars($item['default']) ?>" onclick="this.select()">
          <button type="button" class="btn-copy" data-copy="<?= htmlspecialchars($item['default']) ?>">📋</button>
        </div>
      </div>
    <?php endforeach; ?>
  <?php endif; ?>
</div>

<!-- Preview Modal -->
<div id="media-modal" class="media-modal hidden">
  <div class="media-modal-backdrop" data-close-modal></div>
  <div class="media-modal-content">
    <div class="media-modal-header">
      <h2>Preview Image</h2>
      <button type="button" class="btn-icon" data-close-modal>✕</button>
    </div>
    <div class="media-modal-body">
      <div class="media-preview-main">
        <img id="modal-preview-img" src="" alt="">
      </div>
      <div id="modal-preview-sizes" class="media-preview-sizes"></div>
    </div>
  </div>
</div>

<script>
window.MEDIA_ITEMS = <?= json_encode($items, JSON_UNESCAPED_UNICODE) ?>;
</script>

<?php require __DIR__ . '/includes/footer.php'; ?>
