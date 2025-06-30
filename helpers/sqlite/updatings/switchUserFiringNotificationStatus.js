const switchUserFiringNotificationStatus = (db, userId, newNotifyStatus) => {
  let result = db
    .prepare(
      `
        UPDATE FiringNotificationsStatus
        SET notifyStatus = ?
        WHERE user_id = ?`
    )
    .run(newNotifyStatus, userId);
  return result.changes > 0;
};

module.exports = switchUserFiringNotificationStatus;
