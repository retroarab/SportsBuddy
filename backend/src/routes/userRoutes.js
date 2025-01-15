const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware'); // Import middleware for protected routes

// User routes
router.get('/search', authMiddleware, userController.searchUsers);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:id', authMiddleware, userController.getUser);
router.put('/:id', authMiddleware, userController.updateUserProfile);
router.post('/:id/connections', authMiddleware, userController.addConnection);
router.get('/:id/connections', authMiddleware, userController.getConnections);
router.post('/:id/upload-picture', authMiddleware, userController.uploadPicture);
router.put('/:id/update-password', authMiddleware, userController.updatePassword);

module.exports = router;
