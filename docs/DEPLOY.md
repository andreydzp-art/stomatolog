# Деплой nkolesnik.com

Всё для стоматологического сайта — **только репозиторий [stomatolog](https://github.com/andreydzp-art/stomatolog)**.  
Репозиторий IQMO к этому сайту не относится (там только учебная платформа).

## GitHub Secrets (один раз)

**Settings → Secrets and variables → Actions → New repository secret**

| Secret | Значение |
|--------|----------|
| `FTP_HOST` | `5.188.31.205` |
| `FTP_USERNAME` | `nkolesnik_co` |
| `FTP_PASSWORD` | пароль из FASTPANEL (шаг «Сгенерировать» у FTP-аккаунта) |

Старые `DEPLOY_HOST` / `DEPLOY_SSH_KEY` больше не используются (можно удалить).

## Автодеплой

- **Push в `main`** (если менялись `index.html`, `images/`, `image-slot.js`) → workflow **Deploy to nkolesnik.com**
- Или вручную: **Actions → Deploy to nkolesnik.com → Run workflow**

## Без GitHub

FASTPANEL → nkolesnik.com → **Файловый менеджер** → корень сайта → загрузить `index.html`, `image-slot.js`, `images/`.
