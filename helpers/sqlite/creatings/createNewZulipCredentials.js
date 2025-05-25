function createNewZulipCredentials(db, userId, {apiKey, username, realm}, verified) {
    let result = db.prepare(`
        INSERT OR IGNORE INTO ZulipCredentials(user_id, api_key, username, realm, verified)
        VALUES (?, ?, ?, ?, ?)
    `).run(userId, apiKey, username, realm, +verified);
    return result.changes > 0
}

module.exports = createNewZulipCredentials