    <?php if (isLoggedIn()): ?>

    </main>

  </div>

    <?php else: ?>

    </main>

    <?php endif; ?>

  </div>

  <?php if (!empty($extraScripts)): ?>

    <?php foreach ($extraScripts as $script): ?>

      <script src="<?= htmlspecialchars($script) ?>"></script>

    <?php endforeach; ?>

  <?php endif; ?>

  <?php if (!empty($loadMediaPicker)): ?>

    <script src="/admin/assets/media.js"></script>

  <?php endif; ?>

  <script src="/admin/assets/admin.js"></script>

</body>

</html>

