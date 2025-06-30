function createNewFiredEmployee(db, userId, fullname, firedDate) {
    let result = db.prepare(`
        INSERT OR IGNORE INTO FiredEmployees(user_id, fullname, firedDate)
        VALUES (?, ?, ?)
    `).run(userId, fullname, firedDate);
    return result.changes > 0 
}

module.exports = createNewFiredEmployee