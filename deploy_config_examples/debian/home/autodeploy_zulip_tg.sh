#!/bin/bash

REPO_DIR="/root/zulip_telegram_messages"
LOG_FILE="/root/zulip_telegram_messages_deploy.log"

# Переходим в репозиторий
cd "$REPO_DIR" || exit 1

# Получаем последний коммит ДО pull
OLD_COMMIT=$(git rev-parse HEAD)

# Выполняем git pull и записываем вывод в лог
echo "[$(date)] Running git pull..." >> "$LOG_FILE"
git pull origin main >> "$LOG_FILE" 2>&1

# Получаем последний коммит ПОСЛЕ pull
NEW_COMMIT=$(git rev-parse HEAD)

# Проверяем, изменился ли коммит
if [ "$OLD_COMMIT" != "$NEW_COMMIT" ]; then
    echo "[$(date)] Repository updated! Old commit: $OLD_COMMIT, New commit: $NEW_COMMIT" >> "$LOG_FILE"

    # Тут выполняем нужные команды, если репозиторий обновился
    echo "Запускаю дополнительные команды..." >> "$LOG_FILE"

    /bin/bash "$REPO_DIR/deploy.sh"
else
    echo "[$(date)] No changes detected." >> "$LOG_FILE"
fi