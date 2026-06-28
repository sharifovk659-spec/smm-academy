<?php

declare(strict_types=1);



require_once __DIR__ . '/../includes/auth.php';

require_once __DIR__ . '/../includes/ContentRepository.php';

require_once __DIR__ . '/includes/nav.php';



requireAuth();



$content = ContentRepository::get();

$layout = $content['layout'] ?? [];

$pageSections = $content['pageSections'] ?? [];

$flashSuccess = '';



$sectionDefs = [

    'hero' => 'Hero',

    'whatYouLearn' => 'Чему научишься (Open Book)',

    'forWhom' => 'Для кого обучение',

    'courseProgram' => 'Программа курса (Slider)',

    'learningPath' => 'Твой путь обучения',

    'studentResults' => 'Результаты учеников',

    'videoReviews' => 'Видео отзывы',

    'pricing' => 'Тарифы',

    'faq' => 'FAQ',

    'cta' => 'Финальный CTA',

    'results' => 'Statistics (опционально)',

];



if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $content['layout'] = [

        'scrollLabel' => trim($_POST['scroll_label'] ?? ''),

        'navCta' => trim($_POST['nav_cta'] ?? ''),

        'navCtaLink' => trim($_POST['nav_cta_link'] ?? '#pricing'),

        'modulePrefix' => trim($_POST['module_prefix'] ?? ''),

        'resultLabel' => trim($_POST['result_label'] ?? ''),

        'beforeLabel' => trim($_POST['before_label'] ?? ''),

        'afterLabel' => trim($_POST['after_label'] ?? ''),

        'videoReviewCategory' => trim($_POST['video_review_category'] ?? ''),

    ];



    foreach ($sectionDefs as $key => $label) {

        $content['pageSections'][$key] = [

            'enabled' => isset($_POST["section_$key"]),

            'order' => (int)($_POST["order_$key"] ?? 1),

        ];

    }



    ContentRepository::save($content);

    logAction('update', 'settings');

    $layout = $content['layout'];

    $pageSections = $content['pageSections'];

    $flashSuccess = 'Танзимот сабт шуд!';

}



$pageTitle = 'Танзимот';

$currentPage = 'settings';

$showSaveBtn = false;

require __DIR__ . '/includes/header.php';

adminPageHeader('Танзимот', 'Блокҳо · UI Labels · Система');

?>



<form method="POST">

  <div class="card card--premium">

    <div class="card-title">Блокҳои сайт (Фаъол / Ғайрифаъол)</div>

    <p style="color:#64748b;font-size:13px;margin-bottom:16px">Блокҳои ғайрифаъол дар сайт намоиш дода намешаванд.</p>

    <?php foreach ($sectionDefs as $key => $label):

      $sec = $pageSections[$key] ?? ['enabled' => true, 'order' => 1];

      $enabled = !empty($sec['enabled']);

      $order = (int)($sec['order'] ?? 1);

    ?>

    <div class="item-block" style="padding:14px">

      <div class="form-row" style="align-items:center">

        <label class="list-editor-enable" style="flex:1">

          <input type="checkbox" name="section_<?= $key ?>" <?= $enabled ? 'checked' : '' ?>>

          <strong><?= htmlspecialchars($label) ?></strong>

        </label>

        <div class="form-group" style="margin:0;width:100px">

          <label style="font-size:11px">Order</label>

          <input type="number" name="order_<?= $key ?>" value="<?= $order ?>" min="1" max="20">

        </div>

      </div>

    </div>

    <?php endforeach; ?>

  </div>



  <div class="card card--premium">

    <div class="card-title">UI Labels (матнҳои сайт)</div>

    <div class="form-row">

      <div class="form-group">

        <label>Navbar CTA</label>

        <input name="nav_cta" value="<?= htmlspecialchars($layout['navCta'] ?? '') ?>">

      </div>

      <div class="form-group">

        <label>Navbar CTA Link</label>

        <input name="nav_cta_link" value="<?= htmlspecialchars($layout['navCtaLink'] ?? '#pricing') ?>">

      </div>

    </div>

    <div class="form-row">

      <div class="form-group">

        <label>Hero Scroll label</label>

        <input name="scroll_label" value="<?= htmlspecialchars($layout['scrollLabel'] ?? '') ?>">

      </div>

      <div class="form-group">

        <label>Module prefix</label>

        <input name="module_prefix" value="<?= htmlspecialchars($layout['modulePrefix'] ?? '') ?>">

      </div>

    </div>

    <div class="form-row">

      <div class="form-group">

        <label>Result label</label>

        <input name="result_label" value="<?= htmlspecialchars($layout['resultLabel'] ?? '') ?>">

      </div>

      <div class="form-group">

        <label>Before / After</label>

        <div style="display:flex;gap:8px">

          <input name="before_label" value="<?= htmlspecialchars($layout['beforeLabel'] ?? '') ?>" placeholder="Пеш">

          <input name="after_label" value="<?= htmlspecialchars($layout['afterLabel'] ?? '') ?>" placeholder="Баъд">

        </div>

      </div>

    </div>

    <div class="form-group">

      <label>Video Review category</label>

      <input name="video_review_category" value="<?= htmlspecialchars($layout['videoReviewCategory'] ?? '') ?>">

    </div>

  </div>



  <div class="card">

    <div class="card-title">Система</div>

    <div class="info-row"><span>Content API</span><span>/api/content.php</span></div>

    <div class="info-row"><span>Frontend</span><a href="http://localhost:3000" target="_blank" style="color:#38BDF8">localhost:3000</a></div>

    <div class="info-row"><span>Database</span><span><?= htmlspecialchars(DB_NAME) ?></span></div>

    <p style="color:#64748b;font-size:13px;margin-top:16px">Ҳамаи контент аз MySQL → site.json sync мешавад.</p>

    <a href="/admin/media.php" class="btn btn-secondary" style="margin-top:12px">🖼 Медиа китобхона</a>

  </div>



  <button type="submit" class="btn btn-primary">💾 Save changes</button>

</form>



<?php require __DIR__ . '/includes/footer.php'; ?>


