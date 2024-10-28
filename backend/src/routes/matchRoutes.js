// backend/src/routes/matchRoutes.js
const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController'); // Ensure correct path

// Match routes
router.post('/', matchController.createMatch);
router.get('/', matchController.listMatches);
router.get('/:id', matchController.getMatch);
router.post('/:id/join', matchController.joinMatch);
router.delete('/:id/leave', matchController.leaveMatch);
router.post('/:id/invite', matchController.inviteToMatch);
router.post('/:id/message', matchController.sendMessage);

module.exports = router;
