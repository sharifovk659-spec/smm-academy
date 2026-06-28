<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/ContentRepository.php';
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/includes/media-picker.php';
require_once __DIR__ . '/includes/nav.php';

requireAuth();

$content = ContentRepository::get();
$hero = $content['hero'] ?? [];
$flashSuccess = '';
$loadMediaPicker = true;
$extraScripts = ['/admin/assets/media.js', '/admin/assets/hero-editor.js'];
$extraStyles = ['/admin/assets/hero-editor.css'];

$socialIcons = $hero['socialIcons'] ?? [];
$badges = $hero['badges'] ?? (isset($hero['badge']) ? [$hero['badge']] : ['']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $hero['logoText'] = trim($_POST['logo_text'] ?? '');
    $hero['logo'] = parseImageField($_POST['logo'] ?? '', $_POST['logo_json'] ?? '');
    if (is_string($hero['logo']) && $hero['logo'] === '') {
        $hero['logo'] = '';
    }

    $hero['title'] = trim($_POST['title'] ?? '');
    $hero['titleHighlight'] = trim($_POST['titleHighlight'] ?? '');
    $hero['subtitle'] = trim($_POST['subtitle'] ?? '');

    $badgesRaw = array_values(array_filter(array_map('trim', explode("\n", $_POST['badges'] ?? ''))));
    $hero['badges'] = $badgesRaw;
    $hero['badge'] = $badgesRaw[0] ?? '';

    $hero['image'] = parseImageField($_POST['image'] ?? '', $_POST['image_json'] ?? '');
    $hero['trainer']['name'] = trim($_POST['trainer_name'] ?? '');
    $hero['trainer']['role'] = trim($_POST['trainer_role'] ?? '');
    $hero['trainer']['image'] = parseImageField($_POST['trainer_image'] ?? '', $_POST['trainer_image_json'] ?? '');

    $hero['cta']['primary'] = trim($_POST['cta_primary'] ?? '');
    $hero['cta']['primaryLink'] = trim($_POST['cta_primary_link'] ?? '#pricing');
    $hero['cta']['secondary'] = trim($_POST['cta_secondary'] ?? '');
    $hero['cta']['secondaryLink'] = trim($_POST['cta_secondary_link'] ?? '#modules');

    $newSocial = [];
    $sCount = (int)($_POST['social_count'] ?? 0);
    for ($i = 0; $i < $sCount; $i++) {
        $newSocial[] = [
            'icon' => trim($_POST["social_icon_$i"] ?? 'FaInstagram'),
            'href' => trim($_POST["social_href_$i"] ?? '#'),
            'color' => trim($_POST["social_color_$i"] ?? '#2563EB'),
        ];
    }
    $hero['socialIcons'] = $newSocial;

    ContentRepository::updateSection('hero', $hero);
    logAction('update', 'hero');
    $flashSuccess = 'Hero бомуваффақият сабт шуд!';
    $socialIcons = $newSocial;
    $badges = $badgesRaw;
}

$pageTitle = 'Hero';
$currentPage = 'hero';
require __DIR__ . '/includes/header.php';
adminPageHeader('Hero Editor', 'Upload · Preview · Delete · Live Preview');
?>

<div class="hero-editor-layout">
  <div class="hero-editor-form">
    <form method="POST" id="hero-form">
      <div class="card card--premium">
        <div class="card-title">Logo & Badges</div>
        <div class="form-group">
          <label>Logo Text</label>
          <input type="text" name="logo_text" data-preview="logoText" value="<?= htmlspecialchars($hero['logoText'] ?? '') ?>">
        </div>
        <?php renderMediaPicker('logo', 'logo_json', $hero['logo'] ?? '', 'Logo Image (ихтиёрӣ)'); ?>
        <div class="form-group">
          <label>Hero Badges (як сатр — як badge)</label>
          <textarea name="badges" rows="3" data-preview="badges"><?= htmlspecialchars(implode("\n", $badges)) ?></textarea>
        </div>
      </div>

      <div class="card card--premium">
        <div class="card-title">Матн</div>
        <div class="form-row">
          <div class="form-group">
            <label>Title</label>
            <input type="text" name="title" data-preview="title" value="<?= htmlspecialchars($hero['title'] ?? '') ?>">
          </div>
          <div class="form-group">
            <label>Highlight text</label>
            <input type="text" name="titleHighlight" data-preview="titleHighlight" value="<?= htmlspecialchars($hero['titleHighlight'] ?? '') ?>">
          </div>
        </div>
        <div class="form-group">
          <label>Subtitle</label>
          <textarea name="subtitle" data-preview="subtitle"><?= htmlspecialchars($hero['subtitle'] ?? '') ?></textarea>
        </div>
      </div>

      <div class="card card--premium">
        <div class="card-title">CTA Buttons</div>
        <div class="form-row">
          <div class="form-group">
            <label>CTA Button text</label>
            <input type="text" name="cta_primary" data-preview="ctaPrimary" value="<?= htmlspecialchars($hero['cta']['primary'] ?? '') ?>">
          </div>
          <div class="form-group">
            <label>CTA Button link</label>
            <input type="text" name="cta_primary_link" value="<?= htmlspecialchars($hero['cta']['primaryLink'] ?? '#pricing') ?>">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Video Button text</label>
            <input type="text" name="cta_secondary" data-preview="ctaSecondary" value="<?= htmlspecialchars($hero['cta']['secondary'] ?? '') ?>">
          </div>
          <div class="form-group">
            <label>Video Button link</label>
            <input type="text" name="cta_secondary_link" value="<?= htmlspecialchars($hero['cta']['secondaryLink'] ?? '#modules') ?>">
          </div>
        </div>
      </div>

      <div class="card card--premium">
        <div class="card-title">Суратҳо</div>
        <?php renderMediaPicker('image', 'image_json', $hero['image'] ?? '', 'Background image'); ?>
        <div class="form-row" style="margin-top:16px">
          <div class="form-group">
            <label>Trainer Name</label>
            <input type="text" name="trainer_name" data-preview="trainerName" value="<?= htmlspecialchars($hero['trainer']['name'] ?? '') ?>">
          </div>
          <div class="form-group">
            <label>Trainer Role</label>
            <input type="text" name="trainer_role" data-preview="trainerRole" value="<?= htmlspecialchars($hero['trainer']['role'] ?? '') ?>">
          </div>
        </div>
        <?php renderMediaPicker('trainer_image', 'trainer_image_json', $hero['trainer']['image'] ?? '', 'Сурати тренер'); ?>
      </div>

      <div class="card card--premium">
        <div class="card-title">Floating Icons</div>
        <input type="hidden" name="social_count" value="<?= count($socialIcons) ?>">
        <?php foreach ($socialIcons as $i => $social): ?>
        <div class="item-block">
          <div class="item-block-header">Icon #<?= $i + 1 ?></div>
          <div class="form-row">
            <div class="form-group">
              <label>Icon (FaInstagram, FaTiktok...)</label>
              <input name="social_icon_<?= $i ?>" value="<?= htmlspecialchars($social['icon'] ?? '') ?>">
            </div>
            <div class="form-group">
              <label>Link</label>
              <input name="social_href_<?= $i ?>" value="<?= htmlspecialchars($social['href'] ?? '') ?>">
            </div>
            <div class="form-group">
              <label>Color</label>
              <input name="social_color_<?= $i ?>" value="<?= htmlspecialchars($social['color'] ?? '#2563EB') ?>">
            </div>
          </div>
        </div>
        <?php endforeach; ?>
      </div>

      <button type="submit" class="btn btn-primary">💾 Save changes</button>
    </form>
  </div>

  <div class="hero-editor-preview-wrap">
    <div class="preview-label">Live Preview</div>
    <div class="hero-live-preview" id="hero-live-preview">
      <div class="hp-bg" id="hp-bg"></div>
      <div class="hp-aurora"></div>
      <div class="hp-content">
        <div class="hp-logo" id="hp-logo"></div>
        <div class="hp-badges" id="hp-badges"></div>
        <h2 class="hp-title" id="hp-title"></h2>
        <p class="hp-subtitle" id="hp-subtitle"></p>
        <div class="hp-cta">
          <span class="hp-btn-primary" id="hp-cta-primary"></span>
          <span class="hp-btn-secondary" id="hp-cta-secondary"></span>
        </div>
        <div class="hp-trainer-wrap">
          <div class="hp-trainer-ring"></div>
          <div class="hp-trainer-img" id="hp-trainer"></div>
          <div class="hp-trainer-info">
            <div id="hp-trainer-name"></div>
            <div id="hp-trainer-role"></div>
          </div>
        </div>
      </div>
    </div>
    <p class="preview-hint">Тағйирот дар вақти воқеӣ намоиш дода мешавад</p>
  </div>
</div>

<?php require __DIR__ . '/includes/footer.php'; ?>
