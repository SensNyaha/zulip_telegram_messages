if docker ps -f name=redis | grep redis > /dev/null; then
    echo "Контейнер redis запущен"
else
    echo "Контейнер redis не запущен"
    docker run -d --name redis-container -p 6379:6379 redis
fi
if docker ps -f name=redis | grep redis > /dev/null; then
    echo "Контейнер redis запущен"
else
    echo "Контейнер redis не запущен"
    docker run -d --name redis-container -p 6379:6379 redis
fi
if docker ps -f name=redis | grep redis > /dev/null; then
    echo "Контейнер redis запущен"
else
    echo "Контейнер redis не запущен"
    docker run -d --name redis-container -p 6379:6379 redis
fi

# Получаем директорию, в которой находится скрипт
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Переходим в эту директорию
echo "$SCRIPT_DIR"

cd "$SCRIPT_DIR"

npm i
systemctl restart zulip_telegram_messages