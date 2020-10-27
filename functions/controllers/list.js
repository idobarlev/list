const admin = require('firebase-admin');
const db = admin.firestore();

exports.addParticipant = async (req, res) => {

    const { _listId } = req.params
    const { _userId } = req.body
    
    if (!(_listId && _userId) || (_listId.length < 5) || (_userId.length < 5)) {
        res.status(400).json({msg : 'Something went wrong..'})
        return false
    }

    // Get participant
    const participantData = (await db.collection('users').doc(_userId).get())
    const participant = {
        name : participantData.data().name,
        email : participantData.data().email,
        id: participantData.id
    }

    if (!participant) {
        res.status(400).json({msg : 'Something went wrong..'})
        return false
    }

    // Update participants in list
    await db.collection('lists').doc(_listId)
    .update({
        participants: admin.firestore.FieldValue.arrayUnion(participant)
    })
    res.json({msg : 'Added successfully', participant})
}