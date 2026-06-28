<?php
/**
 * Reusable media picker for admin forms.
 * @param string $name URL input name
 * @param string $jsonName Hidden JSON input name (responsive image object)
 * @param mixed $value Current value (string URL or array)
 * @param string $label Field label
 */
function renderMediaPicker(string $name, string $jsonName, mixed $value, string $label = 'Сурат'): void
{
    $url = '';
    $json = '';

    if (is_array($value)) {
        $url = $value['default'] ?? '';
        $json = json_encode($value, JSON_UNESCAPED_UNICODE);
    } elseif (is_string($value) && $value !== '') {
        $url = $value;
    }

    $previewSrc = htmlspecialchars($url);
    $previewHidden = $url ? '' : 'hidden';
    ?>
    <div class="media-picker" data-media-picker>
      <label><?= htmlspecialchars($label) ?></label>
      <div class="media-picker-row">
        <input type="url" name="<?= htmlspecialchars($name) ?>" data-media-url
               value="<?= htmlspecialchars($url) ?>" placeholder="URL ё Upload">
        <input type="hidden" name="<?= htmlspecialchars($jsonName) ?>" data-media-json
               value="<?= htmlspecialchars($json) ?>">
        <button type="button" class="btn btn-secondary" data-media-upload>📤 Upload</button>
        <button type="button" class="btn btn-secondary" data-media-pick>🖼 Медиа</button>
        <button type="button" class="btn btn-secondary btn-media-delete" data-media-delete title="Delete image">🗑</button>
        <input type="file" data-media-file accept="image/*" hidden>
      </div>
      <div class="media-picker-preview <?= $previewHidden ?>" data-media-preview>
        <?php if ($url): ?><img src="<?= $previewSrc ?>" alt="preview"><?php endif; ?>
      </div>
    </div>
    <?php
}
