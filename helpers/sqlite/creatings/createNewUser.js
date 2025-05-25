function createNewUser(db, userId) {
    let result = db.prepare(`
        INSERT OR IGNORE INTO Users(id)
        VALUES (?)
    `).run(userId);
    return result.changes > 0 
}

module.exports = createNewUser