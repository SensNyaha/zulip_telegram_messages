const unfreezeUser = (db, userId) => {
    let result = db.prepare(`
        UPDATE Users
        SET isFrozen = 0
        WHERE id = ?
    `).run(userId);
    return result.changes > 0
}

module.exports = unfreezeUser;