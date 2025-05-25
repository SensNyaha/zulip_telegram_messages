function isUserHasVerifiedZulipCredentials(db, userId) {
    let result = db.prepare(`
        SELECT * FROM ZulipCredentials
        WHERE user_id = ?
    `).get(userId)
    return result && result.verified > 0
}

module.exports = isUserHasVerifiedZulipCredentials