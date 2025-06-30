function getUserFiringNotificationStatus(db, userId) {
    let result = db.prepare(`
        SELECT * FROM FiringNotificationsStatus
        WHERE user_id = ?
    `).get(userId)
    return result
}

module.exports = getUserFiringNotificationStatus