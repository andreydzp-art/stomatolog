# Домен nkolesnik.com

Сайт — статический HTML в корне репозитория. **Прод:** тот же VPS (FastPanel), что [iqmoschool.ru](https://www.iqmoschool.ru/) и epizodes.ru.

## Деплой на VPS (основной способ)

В репозитории **IQMO** (монорепо с `deploy.yml`): **Actions → Deploy stomatolog (nkolesnik.com) → Run workflow**.

Workflow: `.github/workflows/deploy-stomatolog.yml` — checkout `andreydzp-art/stomatolog`, rsync на docroot nkolesnik.com, smoke по заголовку страницы.

Секреты те же: `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`.

---

## GitHub Pages (запасной, если DNS на GitHub)

Сайт — статический HTML. Публикация через **GitHub Pages** (сейчас DNS на VPS — этот блок не используется).

## 1. Включить Pages (один раз)

В [настройках репозитория](https://github.com/andreydzp-art/stomatolog/settings/pages):

- **Source:** Deploy from a branch
- **Branch:** `main` / **`/ (root)`**
- **Custom domain:** `nkolesnik.com` (подтянется из файла `CNAME`)

После push с `CNAME` и `.nojekyll` GitHub начнёт отдавать `index.html` с корня.

## 2. DNS у регистратора / хостинга

Замените записи, которые сейчас ведут на заглушку «Application placeholder», на адреса GitHub Pages.

### Корень домена `@` → nkolesnik.com

| Тип | Имя | Значение |
|-----|-----|----------|
| A | @ | `185.199.108.153` |
| A | @ | `185.199.109.153` |
| A | @ | `185.199.110.153` |
| A | @ | `185.199.111.153` |

(опционально IPv6)

| Тип | Имя | Значение |
|-----|-----|----------|
| AAAA | @ | `2606:50c0:8000::153` |
| AAAA | @ | `2606:50c0:8001::153` |
| AAAA | @ | `2606:50c0:8002::153` |
| AAAA | @ | `2606:50c0:8003::153` |

### www (по желанию)

| Тип | Имя | Значение |
|-----|-----|----------|
| CNAME | www | `andreydzp-art.github.io` |

В Pages включите **Enforce HTTPS** после появления зелёной галочки DNS.

## 3. Проверка

- https://andreydzp-art.github.io/stomatolog/ — сразу после деплоя Pages  
- https://nkolesnik.com/ — после обновления DNS (обычно 15 мин – 48 ч)

## Альтернатива: текущий хостинг (FTP)

Если домен должен остаться на текущем сервере (без смены DNS), загрузите в **корень сайта** (часто `public_html` / `www` / `httpdocs`):

- `index.html`
- `image-slot.js`
- папку `images/` целиком

Нужны: хост FTP/SFTP, логин, пароль, путь к корню. Без этого агент не может залить файлы на ваш сервер.
