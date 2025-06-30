function createUserFiringNotificationStatus(db, userId) {
    let result = db.prepare(`
        INSERT OR IGNORE INTO FiringNotificationsStatus(user_id)
        VALUES (?)
    `).run(userId);
    return result.changes > 0 
}

module.exports = createUserFiringNotificationStatus