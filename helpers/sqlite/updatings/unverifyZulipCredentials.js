function unverifyZulipCredentials(db, userId) {
    let result = db.prepare(`
        UPDATE ZulipCredentials
        SET verified = 0
        WHERE user_id = ?
    `).run(userId);
    return result.changes > 0
}

module.exports = unverifyZulipCredentials