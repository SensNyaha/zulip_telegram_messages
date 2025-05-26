function createNewUserFastReactions(db, userId) {
    let result = db.prepare(`
        INSERT OR IGNORE INTO UserFastReactions(user_id)
        VALUES (?)
    `).run(userId);
    return result.changes > 0
}

module.exports = createNewUserFastReactions