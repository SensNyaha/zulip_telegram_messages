function getUserUnreadMessages(db, userId) {
    const result = db.prepare(`
        SELECT unread_messages FROM Users
        WHERE id = ?
    `).get(userId)
    return result.unread_messages
}

module.exports = getUserUnreadMessages