function resetZulipCredentialsFailedAttempts(db, userId) {
    let result = db.prepare(`
        UPDATE ZulipCredentials
        SET failed_attempts = 0
        WHERE user_id = ?
    `).run(userId);
    return result.changes > 0
}

module.exports = resetZulipCredentialsFailedAttempts