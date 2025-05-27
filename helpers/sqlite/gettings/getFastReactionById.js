function getFastReactionById(db, id) {
    let result = db.prepare(`
        SELECT * FROM FastReactions
        WHERE id = ?
    `).get(id)
    return result
}

module.exports = getFastReactionById