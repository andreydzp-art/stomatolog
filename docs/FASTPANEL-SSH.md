# SSH для автодеплоя nkolesnik.com

Деплой идёт **не** от `iqmoschool_r_usr` (нет прав на чужой сайт), а от системного пользователя сайта **`nkolesnik_co_usr`**.

## Шаги в FASTPANEL

1. **Сайты → nkolesnik.com → SSH-доступ** (или «SSH-ключи»).
2. Добавьте **публичный ключ** (пара к `DEPLOY_SSH_KEY` в репозитории **stomatolog**):

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIA9JTQY8/fFKzGuo93mgUB8fkWh5SyvvNari1A1C+1UW deploy-nkolesnik-stoma
```
3. Приватный ключ — в **stomatolog** → Settings → Secrets → `DEPLOY_SSH_KEY`  
   (см. [DEPLOY.md](./DEPLOY.md))

## Запуск деплоя

GitHub → **andreydzp-art/stomatolog** → Actions → **Deploy to nkolesnik.com** → Run workflow.

## Проверка

https://nkolesnik.com/ — заголовок «Композитные виниры», не заглушка FASTPANEL.
