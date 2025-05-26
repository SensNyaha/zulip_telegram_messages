function getTelegramNotification(db, userId, zulipMessageId) {
    let result = db.prepare(`
        SELECT * FROM NotifiedMessages
        WHERE user_id = ? AND zulip_message_id = ?
    `).get(userId, zulipMessageId)
    return result
}

module.exports = getTelegramNotification