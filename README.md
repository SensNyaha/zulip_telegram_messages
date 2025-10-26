# 🚀 Гайд по запуску проекта с Node.js, Docker и Redis

## 1. Установка Node.js

### 1.1 Установка Node.js на компьютер

- **Скачать с официального сайта:**  
   [https://nodejs.org/en/download](https://nodejs.org/en/download)
- **Для Linux:**  
   Рекомендуется установка через `nvm` (Node Version Manager):
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  source ~/.bashrc
  nvm install --lts
  ```
- **Для Windows:**  
   Устанавливайте `.msi` версию

### 1.2 Проверка установки

Откройте терминал и выполните команды:

```bash
node -v
npm -v
```

Убедитесь, что отобразились версии Node.js и npm.

---

## 2. Установка и настройка Docker

### 2.1 Установка Docker

- **Для Windows и macOS:**  
   Устанавливайте [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **Для Linux:**  
   Следуйте официальной инструкции по установке [Docker Engine](https://docs.docker.com/engine/install/)

### 2.2 Проверка установки

Выполните в терминале:

```bash
docker -v
docker info
```

Убедитесь, что Docker работает. Если вы используете Desktop-версию — проверьте GUI-интерфейс.

### 2.3 Запуск Redis контейнера

Откройте терминал или терминал в Docker Desktop и выполните:

```bash
docker run -d --name redis-zulip-msg -p 6379:6379 redis
```

- `redis-zulip-msg` — имя контейнера (можно изменить)
- `6379:6379` — проброс порта
- `-v redis_data:/data` — том для хранения данных
- `--appendonly yes` — включение сохранения данных Redis

### 2.4 Проверка Redis

Убедитесь, что Redis работает:

```bash
docker exec -it redis-zulip-msg redis-cli ping
```

Ответ должен быть `PONG`

> 💡 _Альтернатива_: можно использовать `docker-compose.yml` для автоматизации (по запросу).

---

## 3. Конфигурация проекта и установка зависимостей

### 3.1 Открытие проекта

Откройте папку проекта в удобном редакторе (напр., VS Code)

### 3.2 Создание `.env` файла

В корне проекта создайте файл `.env` со следующим содержимым:

```env
TG_BOT_KEY=your_telegram_key
REDIS_URL=redis://127.0.0.1:6379
```

- `TG_BOT_KEY` — ключ от [BotFather](https://marketolog.mts.ru/blog/kak-sozdat-bota-v-botfather-gaid-dlya-novichkov)
- `REDIS_URL` — адрес Redis (оставьте как есть при дефолтных настройках)

### 3.3 Установка зависимостей

В терминале в корне проекта выполните:

```bash
npm install
```

Дождитесь, пока все зависимости будут установлены.

Если при загрузке зависимостей будет ошибка, связанная с невозможностью установки C-шных библиотек

```bash
sudo apt update
sudo apt install -y build-essential python3-minimal
```

### 3.4 Запуск проекта

Обычный запуск:

```bash
node app.js
```

Разработка с автоперезапуском:

```bash
npx nodemon app.js
```

---

! ВНИМАНИЕ !
При запуске службы может возникнуть ошибка из-за того, что в файле .service указан полный путь до исполняемого файла node
Чтобы обойти эту проблему выполните в терминале команду

```bash
whereis node
```

Полученный скопируйте и вставьте в файл /etc/systemd/system/zulip_telegram_messages.service в строчку

```
...
ExecStart=[прошлый путь до node] app.js
...
```

вместо старого пути до node.

✅ **Готово!** Проект должен успешно запуститься. Если есть ошибки — проверьте переменные окружения и соединение с Redis.
