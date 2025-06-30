
function getFiredEmployeeById(db, userId) {
    let result = db.prepare(`
        SELECT * FROM FiredEmployees
        WHERE user_id = ?
    `).get(userId)
    return result
}

module.exports = getFiredEmployeeById