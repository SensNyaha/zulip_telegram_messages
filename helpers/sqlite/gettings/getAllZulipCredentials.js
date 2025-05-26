function getAllZulipCredentials(db) {
    let result = db.prepare(`
        SELECT * FROM ZulipCredentials
    `).all()
    return result
}

module.exports = getAllZulipCredentials