function createNewUserLang(db, userId) {
    let result = db.prepare(`
        INSERT OR IGNORE INTO Langs(user_id)
        VALUES (?)
    `).run(userId);
    return result.changes > 0
}

module.exports = createNewUserLang