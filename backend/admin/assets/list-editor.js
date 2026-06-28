(function () {
  const ICON_EMOJI = {
    FiUser: '👤',
    FiCamera: '📷',
    FiBriefcase: '💼',
    FiMonitor: '🖥',
    FiVideo: '🎬',
    FiBarChart2: '📊',
    FiPenTool: '✏️',
    FiTarget: '🎯',
    FiHash: '#',
    FiZap: '⚡',
    FiUsers: '👥',
    FiBookOpen: '📖',
    FiHeart: '❤',
    FiClock: '⏱',
    FiLayers: '📚',
    FiStar: '⭐',
    FiTrendingUp: '📈',
    FiDollarSign: '💰',
    FiAward: '🏆',
  };

  window.SMMListEditor = {
    iconEmoji(name) {
      return ICON_EMOJI[name?.trim()] || '◆';
    },

    init(options) {
      const container = document.getElementById(options.containerId);
      const template = document.getElementById(options.templateId);
      const countInput = document.getElementById(options.countInputId);
      const addBtn = document.getElementById(options.addBtnId);
      const form = document.getElementById(options.formId);

      if (!container || !template) return;

      const getItems = () => Array.from(container.querySelectorAll('.list-editor-item'));

      const syncEnabledState = (item) => {
        const toggle = item.querySelector('[data-enable-toggle]');
        const hidden = item.querySelector('[data-enable-hidden]');
        if (!toggle || !hidden) return;
        hidden.value = toggle.checked ? '1' : '0';
        item.classList.toggle('is-disabled', !toggle.checked);
      };

      const reindex = () => {
        getItems().forEach((item, i) => {
          const label = item.querySelector('.item-index-label');
          if (label) label.textContent = `#${i + 1}`;

          item.querySelectorAll('[data-field]').forEach((el) => {
            const field = el.dataset.field;
            el.name = `${field}_${i}`;
          });

          item.querySelectorAll('[data-json-field]').forEach((el) => {
            const field = el.dataset.jsonField;
            el.name = `${field}_${i}_json`;
          });

          syncEnabledState(item);
        });

        if (countInput) countInput.value = String(getItems().length);
        document.dispatchEvent(new CustomEvent('listEditorChanged'));
      };

      const bindItem = (item) => {
        item.querySelectorAll('[data-action]').forEach((btn) => {
          btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            const items = getItems();
            const idx = items.indexOf(item);
            if (idx < 0) return;

            if (action === 'delete') {
              if (items.length <= 1) {
                alert('Ҳадди ақал як элемент бояд монад.');
                return;
              }
              if (!confirm('Ин элемент нест карда шавад?')) return;
              item.remove();
              reindex();
              return;
            }

            if (action === 'up' && idx > 0) {
              container.insertBefore(item, items[idx - 1]);
              reindex();
            }

            if (action === 'down' && idx < items.length - 1) {
              container.insertBefore(items[idx + 1], item);
              reindex();
            }
          });
        });

        const toggle = item.querySelector('[data-enable-toggle]');
        toggle?.addEventListener('change', () => {
          syncEnabledState(item);
          document.dispatchEvent(new CustomEvent('listEditorChanged'));
        });
      };

      const addItem = (defaults = {}) => {
        const fragment = template.content.cloneNode(true);
        const item = fragment.querySelector('.list-editor-item');
        if (!item) return;

        Object.entries(defaults).forEach(([key, value]) => {
          const input = item.querySelector(`[data-field="${key}"]`);
          if (input && value != null) input.value = value;
        });

        container.appendChild(fragment);
        const added = getItems()[getItems().length - 1];
        bindItem(added);
        if (typeof window.initFormPickers === 'function') {
          window.initFormPickers();
        }
        reindex();
      };

      getItems().forEach(bindItem);
      reindex();

      addBtn?.addEventListener('click', () => {
        addItem(options.defaultItem || {});
      });

      form?.addEventListener('submit', () => reindex());

      container.addEventListener('input', () => {
        document.dispatchEvent(new CustomEvent('listEditorChanged'));
      });

      return { reindex, addItem, getItems };
    },
  };
})();
