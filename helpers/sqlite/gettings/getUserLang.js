function getUserLang(db, userId) {
    let result = db.prepare(`
        SELECT lang FROM Langs
        WHERE user_id = ?
    `).get(userId)
    return result?.lang || "eng"
}

module.exports = getUserLang