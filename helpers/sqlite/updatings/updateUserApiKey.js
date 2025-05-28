function updateUserApiKey(db, userId, newApiKey) {
    let result = db.prepare(`
        UPDATE ZulipCredentials
        SET api_key = ?, verified = 1
        WHERE user_id = ?
    `).run(newApiKey, userId);
    return result.changes > 0
}

module.exports = updateUserApiKey