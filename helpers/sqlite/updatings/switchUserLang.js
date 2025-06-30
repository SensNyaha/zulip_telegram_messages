const switchUserLang = (db, userId, newLang) => {
  let result = db
    .prepare(
      `
        UPDATE Langs
        SET lang = ?
        WHERE user_id = ?
    `
    )
    .run(newLang, userId);
  return result.changes > 0;
};

module.exports = switchUserLang;
