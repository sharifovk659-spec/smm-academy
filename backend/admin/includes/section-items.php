<?php

declare(strict_types=1);



/**

 * Render a single For Whom card editor block.

 */

function renderForWhomItem(int $index, array $item): void

{

    $enabled = $item['enabled'] ?? true;

    $image = $item['image'] ?? '';

    ?>

    <div class="list-editor-item item-block<?= $enabled ? '' : ' is-disabled' ?>">

      <div class="list-editor-toolbar">

        <span class="item-block-header item-index-label">#<?= $index + 1 ?> — <?= htmlspecialchars($item['title'] ?? '') ?></span>

        <div class="list-editor-actions">

          <button type="button" class="btn-icon" data-action="up" title="Боло">↑</button>

          <button type="button" class="btn-icon" data-action="down" title="Поён">↓</button>

          <label class="list-editor-enable">

            <input type="checkbox" data-enable-toggle <?= $enabled ? 'checked' : '' ?>>

            Фаъол

          </label>

          <input type="hidden" data-enable-hidden data-field="enabled" name="enabled_<?= $index ?>" value="<?= $enabled ? '1' : '0' ?>">

          <button type="button" class="btn-icon btn-danger" data-action="delete" title="Нест кардан">🗑</button>

        </div>

      </div>

      <div class="form-row">

        <div class="form-group">

          <label>Icon (FiUser, FiCamera...)</label>

          <input type="text" data-field="icon" name="icon_<?= $index ?>" value="<?= htmlspecialchars($item['icon'] ?? '') ?>" placeholder="FiUser">

        </div>

        <div class="form-group">

          <label>Tag</label>

          <input type="text" data-field="tag" name="tag_<?= $index ?>" value="<?= htmlspecialchars($item['tag'] ?? '') ?>" placeholder="Сифр">

        </div>

      </div>

      <div class="form-group">

        <label>Title</label>

        <input type="text" data-field="title" name="title_<?= $index ?>" value="<?= htmlspecialchars($item['title'] ?? '') ?>">

      </div>

      <div class="form-group">

        <label>Description</label>

        <textarea data-field="desc" name="desc_<?= $index ?>" rows="3"><?= htmlspecialchars($item['description'] ?? '') ?></textarea>

      </div>

      <?php renderMediaPicker("image_$index", "image_{$index}_json", $image, 'Image / Avatar'); ?>

    </div>

    <?php

}



/**

 * Render a single What You Learn skill editor block.

 */

function renderWhatYouLearnItem(int $index, array $item): void

{

    ?>

    <div class="list-editor-item item-block">

      <div class="list-editor-toolbar">

        <span class="item-block-header item-index-label">#<?= $index + 1 ?> — <?= htmlspecialchars($item['title'] ?? '') ?></span>

        <div class="list-editor-actions">

          <button type="button" class="btn-icon" data-action="up" title="Боло">↑</button>

          <button type="button" class="btn-icon" data-action="down" title="Поён">↓</button>

          <button type="button" class="btn-icon btn-danger" data-action="delete" title="Нест кардан">🗑</button>

        </div>

      </div>

      <div class="form-row">

        <div class="form-group">

          <label>Icon (FiVideo, FiTarget...)</label>

          <input type="text" data-field="icon" name="icon_<?= $index ?>" value="<?= htmlspecialchars($item['icon'] ?? '') ?>" placeholder="FiZap">

        </div>

        <div class="form-group">

          <label>Title</label>

          <input type="text" data-field="title" name="title_<?= $index ?>" value="<?= htmlspecialchars($item['title'] ?? '') ?>">

        </div>

      </div>

      <div class="form-group">

        <label>Description</label>

        <textarea data-field="desc" name="desc_<?= $index ?>" rows="3"><?= htmlspecialchars($item['description'] ?? '') ?></textarea>

      </div>

    </div>

    <?php

}


