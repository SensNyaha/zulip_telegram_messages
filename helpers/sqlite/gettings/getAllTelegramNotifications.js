function getAllTelegramNotifications(db, userId) {
    let result = db.prepare(`
        SELECT * FROM NotifiedMessages
        WHERE user_id = ?
    `).all(userId)
    return result
}

module.exports = getAllTelegramNotifications