const freezeUser = (db, userId) => {
    let result = db.prepare(`
        UPDATE Users
        SET isFrozen = 1
        WHERE id = ?
    `).run(userId);
    return result.changes > 0
}

module.exports = freezeUser;