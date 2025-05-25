function isUserExist(db, userId) {
    let result = db.prepare(`
        SELECT count(*) AS count FROM Users
        WHERE id = ?
    `).get(userId)
    return result.count > 0
}

module.exports = isUserExist