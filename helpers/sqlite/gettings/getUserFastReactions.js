function getUserFastReactions(db, userId) {
    let result = db.prepare(`
        SELECT * FROM UserFastReactions
        WHERE user_id = ?
    `).get(userId)
    return result
}

module.exports = getUserFastReactions