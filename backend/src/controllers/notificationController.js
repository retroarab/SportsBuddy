const prisma = require('../prisma');

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { user_id: req.userId }, // Assuming user ID is available
      orderBy: { created_at: 'desc' },
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve notifications' });
  }
};

exports.markNotificationsRead = async (req, res) => {
  const { notificationIds } = req.body; // Expecting an array of notification IDs
  try {
    await prisma.notification.updateMany({
      where: { id: { in: notificationIds } },
      data: { read: true },
    });
    res.json({ message: 'Notifications marked as read' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark notifications as read' });
  }
};

exports.deleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.notification.delete({ where: { notification_id: parseInt(id) } });
    res.json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete notification' });
  }
};
