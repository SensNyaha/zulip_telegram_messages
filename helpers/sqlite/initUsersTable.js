function initDB(db) {
    db.prepare(` 
        CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY,
            zulip_credits TEXT NOT NULL,
            isFrozen INTEGER DEFAULT 0,
            unread_messages TEXT,
            notified_message_ids TEXT
        )
    `).run()
}
// unread_messages - удалить, так как я и так получаю непрочтенные сообщения
// notified_message_ids - будет заполняться через JSON массив айдишников сообщений зулипа, о которых уже было уведомлено через бота в телеграме
// при получении каждого нового запроса непрочтенных сообщений необходимо удалять все айдишники, которых нет в пришедшем ответе от зулипа (были прочтены успешно)
// поможет проверять - если время сообщения >5 минут и оно есть в notified_message_ids - уведомлять о нём не стоит
module.exports = initDB