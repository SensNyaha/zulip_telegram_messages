function getAllUsers(db) {
    let result = db.prepare(`
        SELECT * FROM Users
    `).all()
    return result
}

module.exports = getAllUsers