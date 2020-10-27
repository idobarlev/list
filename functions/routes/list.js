const express = require('express')
const { addParticipant } = require('../controllers/list')
const router = express.Router()

// Add participant to list.
router.post('/:_listId/join-to-list/', addParticipant)

module.exports = router