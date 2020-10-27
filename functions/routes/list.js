const express = require('express')
const { addParticipant } = require('../controllers/list')
const router = express.Router()

router.get('/join-to-list', addParticipant)
//router.post('/:_id', addParticipant)

module.exports = router