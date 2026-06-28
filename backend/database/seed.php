<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/ContentRepository.php';

echo "Seeding database from site.json...\n";

try {
    require_once __DIR__ . '/../includes/db.php';
    db();
    ContentRepository::seedFromFile();
    echo "✓ Done! Content imported to MySQL.\n";
} catch (Throwable $e) {
    echo "✗ Error: " . $e->getMessage() . "\n";
    echo "Make sure MySQL is running and schema.sql is imported.\n";
    exit(1);
}
