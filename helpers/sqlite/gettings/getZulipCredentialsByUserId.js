function getZulipCredentialsByUserId(db, userId) {
    let result = db.prepare(`
        SELECT * FROM ZulipCredentials
        WHERE user_id = ?
    `).get(userId)
    return result
}

module.exports = getZulipCredentialsByUserId