# Деплой nkolesnik.com

Всё для стоматологического сайта — **только репозиторий [stomatolog](https://github.com/andreydzp-art/stomatolog)**.  
Репозиторий IQMO к этому сайту не относится (там только учебная платформа).

## GitHub Secrets (один раз)

**Settings → Secrets and variables → Actions → New repository secret**

| Secret | Значение |
|--------|----------|
| `DEPLOY_HOST` | IP сервера FastPanel, у вас: `5.188.31.205` |
| `DEPLOY_SSH_KEY` | Приватный ключ (файл `C:\Users\user\.ssh\stoma_nkolesnik_deploy`) |

Публичный ключ (`.pub`) — в FASTPANEL для пользователя сайта **nkolesnik_co_usr** (FTP / SSH / SFTP), см. [FASTPANEL-SSH.md](./FASTPANEL-SSH.md).

## Автодеплой

- **Push в `main`** (если менялись `index.html`, `images/`, `image-slot.js`) → workflow **Deploy to nkolesnik.com**
- Или вручную: **Actions → Deploy to nkolesnik.com → Run workflow**

## Без GitHub

FASTPANEL → nkolesnik.com → **Файловый менеджер** → корень сайта → загрузить `index.html`, `image-slot.js`, `images/`.
