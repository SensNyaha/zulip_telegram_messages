function createNewTelegramNotification(db, userId, zulipMessageId, telegramNotifyId) {
    let result = db.prepare(`
        INSERT OR IGNORE INTO NotifiedMessages(user_id, zulip_message_id, telegram_notify_id)
        VALUES (?, ?, ?)
    `).run(userId, zulipMessageId, telegramNotifyId);
    return result.changes > 0
}

module.exports = createNewTelegramNotification