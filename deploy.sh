if docker ps -f name=redis | grep redis > /dev/null; then
    echo "Контейнер redis запущен"
else
    echo "Контейнер redis не запущен"
    docker run -d --name redis-container -p 6379:6379 redis
fi

npm i
systemctl restart zulip_messages
