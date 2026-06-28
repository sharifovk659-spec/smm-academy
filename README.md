# SMM Academy — Premium Landing Page

Премиум лендинг барои курси Social Media Marketing (SMM).

## Технологияҳо

- **Next.js 15** — App Router, SSR, SEO
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** — аниматсияҳои UI
- **GSAP** — аниматсияҳои Hero ва Modules
- **Lenis** — Smooth Scroll
- **Swiper** — слайдери шаҳодатномаҳо
- **React Icons**

## Оғоз

```bash
npm install
npm run dev
```

Сайт дар [http://localhost:3000](http://localhost:3000) кушода мешавад.

## Конфиг

Ҳамаи маълумот дар `src/config/site.json` нигоҳ дошта мешавад. Барои тағйир додани матн, нарх, модулҳо ва ғайра танҳо ин файлро таҳрир кунед.

## Бахшҳо

- Hero — сарлавҳа бо статистика
- About — хусусиятҳои курс
- Modules — 8 модул
- Instructors — муаллифон
- Testimonials — фикру мулоҳизаҳо (Swiper)
- Pricing — 3 нақшаи нарх
- FAQ — саволҳои зиёд такроршаванда
- CTA — даъвати амал
- Footer

## Deploy — GitHub + Vercel

Сайт барои Vercel омода аст. PHP admin панел дар Vercel кор намекунад — танҳо frontend (Next.js) publish мешавад. Маълумот аз `public/content/site.json` мегирад.

### 1. GitHub

```bash
git add .
git commit -m "Initial commit: SMM Academy landing"
git remote add origin https://github.com/YOUR_USERNAME/smm-academy.git
git push -u origin main
```

### 2. Vercel

1. Ба [vercel.com](https://vercel.com) ворид шавед
2. **Add New Project** → репозитории GitHub-ро интихоб кунед
3. Framework: **Next.js** (автоматӣ муайян мешавад)
4. **Deploy** — тугмаро пахш кунед

Пас аз deploy, Vercel URL медиҳад (масалан `smm-academy.vercel.app`) — инро ба дигарон мефиристед.

### Тағйири контент

Матн ва тасвирҳоро дар `src/config/site.json` тағйир диҳед, сипас ҳамон файлро ба `public/content/site.json` нусха кунед:

```bash
copy src\config\site.json public\content\site.json
```

Сипас `git add`, `git commit`, `git push` — Vercel автоматӣ сайтро навсозӣ мекунад.

### Admin панел (PHP)

Барои таҳрири контент тавассути admin панел, PHP backend-ро дар хостинги алоҳида (масалан shared hosting) deploy кунед. Барои Vercel ин лозим нест.
