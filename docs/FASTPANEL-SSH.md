# SSH для автодеплоя nkolesnik.com

Деплой идёт **не** от `iqmoschool_r_usr` (нет прав на чужой сайт), а от системного пользователя сайта **`nkolesnik_co_usr`**.

## Шаги в FASTPANEL

1. **Сайты → nkolesnik.com → SSH-доступ** (или «SSH-ключи»).
2. Добавьте **тот же публичный ключ**, что используется для деплоя IQMO  
   (пара к секрету `DEPLOY_SSH_KEY` в GitHub → репозиторий **iqmo** → Settings → Secrets).
3. Если отдельный ключ — создайте секреты в **iqmo**:
   - `DEPLOY_STOMA_USER` = `nkolesnik_co_usr`
   - `DEPLOY_STOMA_SSH_KEY` = приватный ключ (полностью, с `BEGIN`/`END`)

## Запуск деплоя

GitHub → **andreydzp-art/iqmo** → Actions → **Deploy stomatolog (nkolesnik.com)** → Run workflow.

## Проверка

https://nkolesnik.com/ — заголовок «Композитные виниры», не заглушка FASTPANEL.
