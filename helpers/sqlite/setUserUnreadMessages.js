function setUserUnreadMessages(db, userId, jsonedMessages) {
    const result = db.prepare(`
        UPDATE Users
        SET unread_messages = ?
        WHERE id = ?
    `).run(jsonedMessages, userId)
    return result.changes
}

module.exports = setUserUnreadMessages