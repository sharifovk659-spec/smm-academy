@echo off
echo Starting MySQL (if not running)...
tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I "mysqld.exe" >NUL
if errorlevel 1 (
  start "" /B "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysqld.exe" --defaults-file="C:\ProgramData\MySQL\MySQL Server 8.4\my.ini"
  timeout /t 5 /nobreak >NUL
)

echo Setting up database...
cd /d "%~dp0backend\database"
php setup.php

echo.
echo Starting PHP Admin on http://localhost:8080/admin/
cd /d "%~dp0backend"
start "" /B php -S localhost:8080 router.php

echo Starting Next.js on http://localhost:3000
cd /d "%~dp0"
start "" http://localhost:3000
start "" http://localhost:8080/admin/
call npm run dev
