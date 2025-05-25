function getUserById(db, userId) {
    let result = db.prepare(`
        SELECT * FROM Users
        WHERE id = ?
    `).get(userId)
    return result
}

module.exports = getUserById