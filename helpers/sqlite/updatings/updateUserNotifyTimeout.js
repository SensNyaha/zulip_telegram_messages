const updateUserNotifyTimeout = (db, userId, sec) => {
    let result = db.prepare(`
        UPDATE Users
        SET notify_timeout_sec = ?
        WHERE id = ?
    `).run(sec, userId);
    return result.changes > 0
}

module.exports = updateUserNotifyTimeout