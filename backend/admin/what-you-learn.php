<?php

declare(strict_types=1);



require_once __DIR__ . '/../includes/auth.php';

require_once __DIR__ . '/../includes/ContentRepository.php';

require_once __DIR__ . '/includes/section-items.php';

require_once __DIR__ . '/includes/nav.php';



requireAuth();



$content = ContentRepository::get();

$section = $content['whatYouLearn'] ?? [];

$whatYouGet = $content['whatYouGet'] ?? ['items' => []];

$items = $section['items'] ?? [];

$getItems = $whatYouGet['items'] ?? [];

$flashSuccess = '';

$extraScripts = [

    '/admin/assets/list-editor.js',

    '/admin/assets/what-you-learn-editor.js',

];

$extraStyles = ['/admin/assets/section-editor.css'];



if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $section['badge'] = trim($_POST['badge'] ?? '');

    $section['title'] = trim($_POST['title'] ?? '');

    $section['titleHighlight'] = trim($_POST['titleHighlight'] ?? '');

    $section['learnTitle'] = trim($_POST['learnTitle'] ?? 'Чӣ меомӯзед');

    $section['getTitle'] = trim($_POST['getTitle'] ?? 'Чӣ мегиред');



    $newItems = [];

    $count = (int)($_POST['count'] ?? 0);

    for ($i = 0; $i < $count; $i++) {

        $newItems[] = [

            'icon' => trim($_POST["icon_$i"] ?? ''),

            'title' => trim($_POST["title_$i"] ?? ''),

            'description' => trim($_POST["desc_$i"] ?? ''),

        ];

    }

    $section['items'] = $newItems;

    ContentRepository::updateSection('whatYouLearn', $section);



    $newGetItems = [];

    $getCount = (int)($_POST['get_count'] ?? 0);

    for ($i = 0; $i < $getCount; $i++) {

        $newGetItems[] = [

            'icon' => trim($_POST["get_icon_$i"] ?? ''),

            'title' => trim($_POST["get_title_$i"] ?? ''),

            'description' => trim($_POST["get_desc_$i"] ?? ''),

        ];

    }

    ContentRepository::updateSection('whatYouGet', ['items' => $newGetItems]);

    logAction('update', 'whatYouLearn');

    $items = $newItems;

    $getItems = $newGetItems;

    $flashSuccess = 'Чӣ меомӯзед бомуваффақият сабт шуд!';

}



if (empty($getItems)) {

    $getItems = [[

        'icon' => 'FiAward',

        'title' => '',

        'description' => '',

    ]];

}



if (empty($items)) {

    $items = [[

        'icon' => 'FiZap',

        'title' => '',

        'description' => '',

    ]];

}



$pageTitle = 'Чӣ меомӯзед';

$currentPage = 'what-you-learn';

require __DIR__ . '/includes/header.php';

adminPageHeader('Чӣ меомӯзед Editor', 'Add · Edit · Delete · Sort · Live Preview');

?>



<div class="section-editor-layout">

  <div class="section-editor-form">

    <form method="POST" id="what-you-learn-form">

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

          <div class="form-group">

            <label>Learn panel title</label>

            <input type="text" name="learnTitle" value="<?= htmlspecialchars($section['learnTitle'] ?? 'Чӣ меомӯзед') ?>">

          </div>

          <div class="form-group">

            <label>Get panel title</label>

            <input type="text" name="getTitle" value="<?= htmlspecialchars($section['getTitle'] ?? 'Чӣ мегиред') ?>">

          </div>

        </div>

      </div>



      <div class="card card--premium">

        <div class="card-title">Чӣ меомӯзед (Left page)</div>

        <button type="button" class="btn btn-secondary list-editor-add" id="wyl-add">➕ Иловаи малака</button>

        <input type="hidden" name="count" id="wyl-count" value="<?= count($items) ?>">

        <div id="wyl-items">

          <?php foreach ($items as $i => $item): ?>

            <?php renderWhatYouLearnItem($i, $item); ?>

          <?php endforeach; ?>

        </div>

      </div>



      <div class="card card--premium">

        <div class="card-title">Чӣ мегиред (Right page)</div>

        <input type="hidden" name="get_count" value="<?= count($getItems) ?>">

        <?php foreach ($getItems as $i => $item): ?>

        <div class="item-block" style="margin-bottom:12px">

          <div class="form-row">

            <div class="form-group"><label>Icon</label><input name="get_icon_<?= $i ?>" value="<?= htmlspecialchars($item['icon'] ?? '') ?>"></div>

            <div class="form-group"><label>Title</label><input name="get_title_<?= $i ?>" value="<?= htmlspecialchars($item['title'] ?? '') ?>"></div>

          </div>

          <div class="form-group"><label>Description</label><textarea name="get_desc_<?= $i ?>" rows="2"><?= htmlspecialchars($item['description'] ?? '') ?></textarea></div>

        </div>

        <?php endforeach; ?>

      </div>



      <button type="submit" class="btn btn-primary">💾 Save changes</button>

    </form>

  </div>



  <div class="section-editor-preview-wrap">

    <div class="preview-label">Live Preview</div>

    <div class="section-live-preview" id="wyl-live-preview">

      <div class="sp-section-badge" id="wyl-preview-badge"></div>

      <h2 class="sp-section-title" id="wyl-preview-title"></h2>

      <div class="wyl-preview-grid" id="wyl-preview-grid"></div>

    </div>

    <p class="preview-hint">Тағйирот дар вақти воқеӣ намоиш дода мешавад</p>

  </div>

</div>



<template id="wyl-item-template">

  <?php renderWhatYouLearnItem(0, [

      'icon' => 'FiZap',

      'title' => '',

      'description' => '',

  ]); ?>

</template>



<script>

document.addEventListener('DOMContentLoaded', () => {

  window.SMMListEditor?.init({

    formId: 'what-you-learn-form',

    containerId: 'wyl-items',

    templateId: 'wyl-item-template',

    countInputId: 'wyl-count',

    addBtnId: 'wyl-add',

    defaultItem: { icon: 'FiZap' },

  });

});

</script>



<?php require __DIR__ . '/includes/footer.php'; ?>


