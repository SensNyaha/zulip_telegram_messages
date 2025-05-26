function increaseZulipCredentialsFailedAttempts(db, userId) {
    let result = db.prepare(`
        UPDATE ZulipCredentials
        SET failed_attempts = failed_attempts + 1
        WHERE user_id = ?
    `).run(userId);
    return result.changes > 0
}

module.exports = increaseZulipCredentialsFailedAttempts