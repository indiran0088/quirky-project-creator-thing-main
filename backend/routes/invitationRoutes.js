// routes/invitationRoutes.js
const express = require('express');
const router = express.Router();
const invitationController = require('../controllers/invitationController');
const { validateInvitation } = require('../middlewares/validation');

// POST /api/invitations - Create new invitation
router.post('/', validateInvitation, invitationController.createInvitation);

// GET /api/invitations - Get all invitations
router.get('/', invitationController.getAllInvitations);

router.get('/:id', invitationController.getInvitationById);
router.put('/:id', validateInvitation, invitationController.updateInvitation);
router.delete('/:id', invitationController.deleteInvitation);

module.exports = router;