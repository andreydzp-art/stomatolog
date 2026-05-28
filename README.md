# Лендинг «Композитные виниры»

Одностраничный сайт стоматолога (экспорт из Claude Design). Статический HTML — без сборки и npm-зависимостей.

## Стек

- HTML5, встроенные CSS и JavaScript в `index.html`
- Google Fonts (Instrument Serif, Geist)
- Локальные изображения в `images/`

## Запуск локально

Нужен простой HTTP-сервер (не открывайте `index.html` как `file://` — иначе возможны ограничения браузера).

**Вариант 1 — Python (если установлен):**

```bash
cd e:\1\stoma
python -m http.server 8080
```

Откройте: http://localhost:8080

**Вариант 2 — npx (Node.js):**

```bash
cd e:\1\stoma
npx --yes serve -l 8080
```

**Вариант 3 — Live Server** в VS Code / Cursor: «Go Live» на `index.html`.

## Структура

| Файл / папка | Назначение |
|--------------|------------|
| `index.html` | Вся страница: разметка, стили, скрипты |
| `images/` | Фото врача и кейсы «до/после» |
| `image-slot.js` | Заглушка web-компонента из экспорта (на странице используются обычные `<img>`) |
| `CURSOR.md` | Заметки по правкам (ссылки мессенджеров, палитра, секции) |

Подробнее по контенту и правкам — в [CURSOR.md](./CURSOR.md).

## Деплой

Подходит любой хостинг статики: GitHub Pages, Netlify, Vercel (static), обычный VPS с nginx.

Корень сайта = папка с `index.html`.

## GitHub

```bash
cd e:\1\stoma
git init
git add .
git commit -m "Initial import: composite veneers landing"
gh repo create stoma --public --source=. --push
```

Или создайте репозиторий вручную на github.com и:

```bash
git remote add origin https://github.com/ВАШ_НИК/stoma.git
git push -u origin main
```
