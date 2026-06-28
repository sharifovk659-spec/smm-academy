@echo off
echo Starting SMM Admin Panel (PHP) on http://localhost:8080
echo Admin: http://localhost:8080/admin/
echo API:   http://localhost:8080/api/content.php
cd /d "%~dp0"
php -S localhost:8080 router.php
