# SMM Academy — PHP Admin Panel

Админ панел барои идоракунии контенти лендинг.

## Дастурҳо

| | |
|---|---|
| **URL** | http://localhost:8080/admin/ |
| **Login** | `login-admin` |
| **Password** | `Password-admin123` |

## Насб

### 1. MySQL

```bash
mysql -u root -p < database/schema.sql
php database/seed.php
```

### 2. PHP Server

```bash
cd backend
start.bat
# ё: php -S localhost:8080 -t .
```

### 3. Next.js Frontend

```env
# .env.local
NEXT_PUBLIC_CONTENT_API_URL=http://localhost:8080/api/content.php
```

```bash
npm run dev
```

## Медиа

- **Upload Image** — JPG, PNG, WebP, GIF → автоматик WebP
- **Delete / Preview** — идоракунии файлҳо
- **Responsive** — Desktop 1920px · Laptop 1440px · Tablet 768px · Mobile 390px
- Суратҳо дар `public/uploads/` — frontend бевосита мехонад

`GET /api/media.php` — рӯйхати медиа

## Идоракунии контент

- **Hero** — сурат, тренер, матн, CTA
- **Рақамҳо** — statistics cards + counter
- **Текстҳо** — site SEO, about, барои кӣ
- **Видеоҳо** — video cases slider
- **Отзывы** — video testimonials
- **Тарифҳо** — Standard, Pro, VIP
- **FAQ** — саволҳо
- **Контактҳо** — WhatsApp, Telegram, CTA, footer

## API

`GET /api/content.php` — JSON контент (ҳамон формати `site.json`)

Пас аз ҳар навсозӣ, контент ба `src/config/site.json` ва `public/content/site.json` sync мешавад.
