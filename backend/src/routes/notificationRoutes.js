const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Routes for notifications
router.get('/', notificationController.getNotifications);               // List notifications for a user
router.post('/mark-read', notificationController.markNotificationsRead);// Mark notifications as read
router.delete('/:id', notificationController.deleteNotification);       // Delete a notification

module.exports = router;
