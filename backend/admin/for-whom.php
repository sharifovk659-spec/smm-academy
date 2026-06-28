<?php

declare(strict_types=1);



require_once __DIR__ . '/../includes/auth.php';

require_once __DIR__ . '/../includes/ContentRepository.php';

require_once __DIR__ . '/../includes/helpers.php';

require_once __DIR__ . '/includes/media-picker.php';

require_once __DIR__ . '/includes/section-items.php';

require_once __DIR__ . '/includes/nav.php';



requireAuth();



$content = ContentRepository::get();

$section = $content['forWhom'] ?? [];

$items = $section['items'] ?? [];

$flashSuccess = '';

$loadMediaPicker = true;

$extraScripts = [
    '/admin/assets/list-editor.js',
    '/admin/assets/for-whom-editor.js',
];

$extraStyles = ['/admin/assets/section-editor.css'];



if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $section['badge'] = trim($_POST['badge'] ?? '');

    $section['title'] = trim($_POST['title'] ?? '');

    $section['titleHighlight'] = trim($_POST['titleHighlight'] ?? '');



    $newItems = [];

    $count = (int)($_POST['count'] ?? 0);

    for ($i = 0; $i < $count; $i++) {

        $newItems[] = [

            'icon' => trim($_POST["icon_$i"] ?? ''),

            'title' => trim($_POST["title_$i"] ?? ''),

            'description' => trim($_POST["desc_$i"] ?? ''),

            'tag' => trim($_POST["tag_$i"] ?? ''),

            'image' => parseImageField($_POST["image_$i"] ?? '', $_POST["image_{$i}_json"] ?? ''),

            'enabled' => ($_POST["enabled_$i"] ?? '0') === '1',

        ];

    }

    $section['items'] = $newItems;

    ContentRepository::updateSection('forWhom', $section);

    logAction('update', 'forWhom');

    $items = $newItems;

    $flashSuccess = 'Барои кӣ бомуваффақият сабт шуд!';

}



if (empty($items)) {

    $items = [[

        'icon' => 'FiUser',

        'title' => '',

        'description' => '',

        'tag' => '',

        'image' => '',

        'enabled' => true,

    ]];

}



$pageTitle = 'Барои кӣ';

$currentPage = 'for-whom';

require __DIR__ . '/includes/header.php';

adminPageHeader('Барои кӣ Editor', 'Add · Edit · Delete · Sort · Enable/Disable · Live Preview');

?>



<div class="section-editor-layout">

  <div class="section-editor-form">

    <form method="POST" id="for-whom-form">

      <div class="card card--premium">

        <div class="card-title">Заголовоки секция</div>

        <div class="form-row">

          <div class="form-group">

            <label>Badge</label>

            <input type="text" name="badge" value="<?= htmlspecialchars($section['badge'] ?? '') ?>">

          </div>

          <div class="form-group">

            <label>Title</label>

            <input type="text" name="title" value="<?= htmlspecialchars($section['title'] ?? '') ?>">

          </div>

          <div class="form-group">

            <label>Highlight</label>

            <input type="text" name="titleHighlight" value="<?= htmlspecialchars($section['titleHighlight'] ?? '') ?>">

          </div>

        </div>

      </div>



      <div class="card card--premium">

        <div class="card-title">Карточкаҳо</div>

        <button type="button" class="btn btn-secondary list-editor-add" id="for-whom-add">➕ Иловаи карточка</button>

        <input type="hidden" name="count" id="for-whom-count" value="<?= count($items) ?>">

        <div id="for-whom-items">

          <?php foreach ($items as $i => $item): ?>

            <?php renderForWhomItem($i, $item); ?>

          <?php endforeach; ?>

        </div>

      </div>



      <button type="submit" class="btn btn-primary">💾 Save changes</button>

    </form>

  </div>



  <div class="section-editor-preview-wrap">

    <div class="preview-label">Live Preview</div>

    <div class="section-live-preview" id="for-whom-live-preview">

      <div class="sp-section-badge" id="fw-preview-badge"></div>

      <h2 class="sp-section-title" id="fw-preview-title"></h2>

      <div class="fw-preview-grid" id="fw-preview-grid"></div>

    </div>

    <p class="preview-hint">Тағйирот дар вақти воқеӣ намоиш дода мешавад</p>

  </div>

</div>



<template id="for-whom-item-template">

  <?php renderForWhomItem(0, [

      'icon' => 'FiUser',

      'title' => '',

      'description' => '',

      'tag' => '',

      'image' => '',

      'enabled' => true,

  ]); ?>

</template>



<script>

document.addEventListener('DOMContentLoaded', () => {

  window.SMMListEditor?.init({

    formId: 'for-whom-form',

    containerId: 'for-whom-items',

    templateId: 'for-whom-item-template',

    countInputId: 'for-whom-count',

    addBtnId: 'for-whom-add',

    defaultItem: { icon: 'FiUser' },

  });

});

</script>



<?php require __DIR__ . '/includes/footer.php'; ?>


