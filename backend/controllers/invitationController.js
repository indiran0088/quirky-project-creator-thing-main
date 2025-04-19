// controllers/invitationController.js
const { models } = require('../config/db');

exports.createInvitation = async (req, res) => {
  try {
    // Create invitation record
    const invitation = await models.Invitation.create({
      guestName: req.body.guestName,
      guestEmail: req.body.guestEmail,
      collegeName: req.body.collegeName,
      eventTitle: req.body.eventTitle,
      subject: req.body.subject,
      staffNumber: req.body.staffNumber,
      staffEmail: req.body.staffEmail,
      status: 'pending' // Default status
    });

    res.status(201).json({
      success: true,
      data: invitation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create invitation',
      error: error.message
    });
  }
};

// Basic CRUD operations
exports.getAllInvitations = async (req, res) => {
  try {
    const invitations = await models.Invitation.findAll();
    res.json({
      success: true,
      data: invitations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch invitations',
      error: error.message
    });
  }
};

exports.getInvitationById = async (req, res) => {
  try {
    const invitation = await models.Invitation.findByPk(req.params.id);
    if (!invitation) {
      return res.status(404).json({
        success: false,
        message: 'Invitation not found'
      });
    }
    res.json({
      success: true,
      data: invitation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch invitation',
      error: error.message
    });
  }
};

exports.updateInvitation = async (req, res) => {
  try {
    const [updated] = await models.Invitation.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Invitation not found'
      });
    }
    
    const updatedInvitation = await models.Invitation.findByPk(req.params.id);
    res.json({
      success: true,
      data: updatedInvitation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update invitation',
      error: error.message
    });
  }
};

exports.deleteInvitation = async (req, res) => {
  try {
    const deleted = await models.Invitation.destroy({
      where: { id: req.params.id }
    });
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Invitation not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Invitation deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete invitation',
      error: error.message
    });
  }
};