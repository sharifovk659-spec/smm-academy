<?php

declare(strict_types=1);



require_once __DIR__ . '/../includes/auth.php';

require_once __DIR__ . '/../includes/ContentRepository.php';

require_once __DIR__ . '/includes/nav.php';



requireAuth();



$content = ContentRepository::get();

$footer = $content['footer'] ?? [];

$flashSuccess = '';



if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $footer['description'] = trim($_POST['footer_description'] ?? '');

    $footer['copyright'] = trim($_POST['footer_copyright'] ?? '');



    $courseLinks = [];

    $cCount = (int)($_POST['course_count'] ?? 0);

    for ($i = 0; $i < $cCount; $i++) {

        $courseLinks[] = [

            'label' => trim($_POST["course_label_$i"] ?? ''),

            'href' => trim($_POST["course_href_$i"] ?? ''),

        ];

    }

    $supportLinks = [];

    $sCount = (int)($_POST['support_count'] ?? 0);

    for ($i = 0; $i < $sCount; $i++) {

        $supportLinks[] = [

            'label' => trim($_POST["support_label_$i"] ?? ''),

            'href' => trim($_POST["support_href_$i"] ?? ''),

        ];

    }

    $footer['links']['course'] = $courseLinks;

    $footer['links']['support'] = $supportLinks;

    ContentRepository::updateSection('footer', $footer);

    logAction('update', 'contacts');

    $flashSuccess = 'Контактҳо навсозӣ шуданд!';

}



$pageTitle = 'Контактҳо';

$currentPage = 'contacts';

require __DIR__ . '/includes/header.php';

adminPageHeader('Контактҳо', 'Footer, линкҳо ва тавсиф');

?>



<form method="POST">

  <div class="card">

    <div class="card-title">Footer</div>

    <div class="form-group"><label>Description</label><textarea name="footer_description"><?= htmlspecialchars($footer['description'] ?? '') ?></textarea></div>

    <div class="form-group"><label>Copyright</label><input name="footer_copyright" value="<?= htmlspecialchars($footer['copyright'] ?? '') ?>"></div>

  </div>



  <div class="card">

    <div class="card-title">Линкҳо — Курс</div>

    <input type="hidden" name="course_count" value="<?= count($footer['links']['course'] ?? []) ?>">

    <?php foreach ($footer['links']['course'] ?? [] as $i => $link): ?>

    <div class="form-row">

      <div class="form-group"><label>Label</label><input name="course_label_<?= $i ?>" value="<?= htmlspecialchars($link['label'] ?? '') ?>"></div>

      <div class="form-group"><label>Href</label><input name="course_href_<?= $i ?>" value="<?= htmlspecialchars($link['href'] ?? '') ?>"></div>

    </div>

    <?php endforeach; ?>

  </div>



  <div class="card">

    <div class="card-title">Линкҳо — Дастгирӣ</div>

    <input type="hidden" name="support_count" value="<?= count($footer['links']['support'] ?? []) ?>">

    <?php foreach ($footer['links']['support'] ?? [] as $i => $link): ?>

    <div class="form-row">

      <div class="form-group"><label>Label</label><input name="support_label_<?= $i ?>" value="<?= htmlspecialchars($link['label'] ?? '') ?>"></div>

      <div class="form-group"><label>Href</label><input name="support_href_<?= $i ?>" value="<?= htmlspecialchars($link['href'] ?? '') ?>"></div>

    </div>

    <?php endforeach; ?>

  </div>



  <button type="submit" class="btn btn-primary">💾 Навсозӣ кардан</button>

</form>



<?php require __DIR__ . '/includes/footer.php'; ?>

