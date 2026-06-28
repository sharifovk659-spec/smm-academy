<?php
declare(strict_types=1);

function adminNavItems(): array
{
    return [
        ['id' => 'dashboard', 'href' => '/admin/dashboard.php', 'label' => 'Dashboard', 'icon' => 'grid'],
        ['id' => 'hero', 'href' => '/admin/hero.php', 'label' => 'Hero', 'icon' => 'image'],
        ['id' => 'statistics', 'href' => '/admin/statistics.php', 'label' => 'Statistics', 'icon' => 'chart'],
        ['id' => 'about', 'href' => '/admin/about.php', 'label' => 'About Course', 'icon' => 'book'],
        ['id' => 'for-whom', 'href' => '/admin/for-whom.php', 'label' => 'Барои кӣ', 'icon' => 'users'],
        ['id' => 'what-you-learn', 'href' => '/admin/what-you-learn.php', 'label' => 'Чӣ меомӯзӣ', 'icon' => 'layers'],
        ['id' => 'videos', 'href' => '/admin/videos.php', 'label' => 'Видеоҳо', 'icon' => 'video'],
        ['id' => 'course-program', 'href' => '/admin/course-program.php', 'label' => 'Барномаи курс', 'icon' => 'timeline'],
        ['id' => 'learning-path', 'href' => '/admin/learning-path.php', 'label' => 'Роҳи омӯзиш', 'icon' => 'clock'],
        ['id' => 'student-results', 'href' => '/admin/student-results.php', 'label' => 'Натиҷаҳои шогирдон', 'icon' => 'trophy'],
        ['id' => 'testimonials', 'href' => '/admin/testimonials.php', 'label' => 'Отзывы', 'icon' => 'star'],
        ['id' => 'pricing', 'href' => '/admin/pricing.php', 'label' => 'Тарифҳо', 'icon' => 'diamond'],
        ['id' => 'faq', 'href' => '/admin/faq.php', 'label' => 'FAQ', 'icon' => 'help'],
        ['id' => 'cta', 'href' => '/admin/cta.php', 'label' => 'CTA', 'icon' => 'zap'],
        ['id' => 'contacts', 'href' => '/admin/contacts.php', 'label' => 'Контактҳо', 'icon' => 'phone'],
        ['id' => 'seo', 'href' => '/admin/seo.php', 'label' => 'SEO', 'icon' => 'search'],
        ['id' => 'media', 'href' => '/admin/media.php', 'label' => 'Медиа', 'icon' => 'folder'],
        ['id' => 'settings', 'href' => '/admin/settings.php', 'label' => 'Танзимот', 'icon' => 'settings'],
    ];
}

function adminQuickEditItems(): array
{
    return [
        ['id' => 'hero', 'href' => '/admin/hero.php', 'label' => 'Hero', 'icon' => 'image'],
        ['id' => 'statistics', 'href' => '/admin/statistics.php', 'label' => 'Statistics', 'icon' => 'chart'],
        ['id' => 'about', 'href' => '/admin/about.php', 'label' => 'About', 'icon' => 'book'],
        ['id' => 'videos', 'href' => '/admin/videos.php', 'label' => 'Видеоҳо', 'icon' => 'video'],
        ['id' => 'testimonials', 'href' => '/admin/testimonials.php', 'label' => 'Отзывы', 'icon' => 'star'],
        ['id' => 'pricing', 'href' => '/admin/pricing.php', 'label' => 'Тарифҳо', 'icon' => 'diamond'],
        ['id' => 'faq', 'href' => '/admin/faq.php', 'label' => 'FAQ', 'icon' => 'help'],
        ['id' => 'cta', 'href' => '/admin/cta.php', 'label' => 'CTA', 'icon' => 'zap'],
        ['id' => 'media', 'href' => '/admin/media.php', 'label' => 'Медиа', 'icon' => 'folder'],
    ];
}

function adminSiteName(): string
{
    static $name = null;
    if ($name !== null) {
        return $name;
    }
    $name = 'SMM Academy';
    try {
        if (!class_exists('ContentRepository')) {
            require_once __DIR__ . '/../../includes/ContentRepository.php';
        }
        $content = ContentRepository::get();
        $name = $content['site']['name'] ?? $name;
    } catch (Throwable) {
        // fallback
    }
    return $name;
}

function adminIcon(string $name): string
{
    $icons = [
        'grid' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
        'image' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>',
        'chart' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M7 16V9"/><path d="M12 16V5"/><path d="M17 16v-7"/></svg>',
        'book' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
        'users' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
        'layers' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12.83 2.18 8 4.5a1 1 0 0 1 0 1.64l-8 4.5a2 2 0 0 1-1.66 0l-8-4.5a1 1 0 0 1 0-1.64l8-4.5a2 2 0 0 1 1.66 0z"/><path d="m3.6 12.3 8 4.5a2 2 0 0 0 1.8 0l8-4.5"/><path d="m3.6 17.3 8 4.5a2 2 0 0 0 1.8 0l8-4.5"/></svg>',
        'video' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m16 13 5.2 3.5a1 1 0 0 0 1.5-.86V8.36a1 1 0 0 0-1.5-.86L16 11"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>',
        'timeline' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
        'trophy' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
        'star' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
        'diamond' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2.7 10.3 12 3l9.3 7.3"/><path d="m6 10 6 11 6-11"/><path d="M2.7 10.3h18.6"/></svg>',
        'help' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',
        'zap' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
        'phone' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
        'search' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
        'folder' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>',
        'settings' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
        'external' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
        'logout' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
        'save' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>',
        'blocks' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
        'clock' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    ];
    return $icons[$name] ?? $icons['grid'];
}

function adminPageHeader(string $title, string $subtitle = ''): void
{
    echo '<div class="page-header">';
    echo '<div><h1 class="page-title">' . htmlspecialchars($title) . '</h1>';
    if ($subtitle !== '') {
        echo '<p class="page-subtitle">' . htmlspecialchars($subtitle) . '</p>';
    }
    echo '</div></div>';
}

function adminUserInitials(string $username): string
{
    $parts = preg_split('/[\s\-_]+/', $username) ?: [];
    if (count($parts) >= 2) {
        return strtoupper(substr($parts[0], 0, 1) . substr($parts[1], 0, 1));
    }
    return strtoupper(substr($username, 0, 2));
}
