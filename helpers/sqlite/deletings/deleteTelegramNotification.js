function deleteTelegramNotification(db, userId, zulipMessageId) {
    let result = db.prepare(`
        DELETE FROM NotifiedMessages
        WHERE user_id = ? AND zulip_message_id = ?
    `).run(userId, zulipMessageId);
    return result.changes > 0
}

module.exports = deleteTelegramNotification