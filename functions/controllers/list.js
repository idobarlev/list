const userId = 'jic67ikrYMf7gSLAtBkYgUOFyxm1'
const listId = 'lwaciy8eWK9FgbdfL4jf'
const admin = require('firebase-admin');
const db = admin.firestore();

exports.addParticipant = async (req, res) => {

    // Get participant
    const participantData = (await db.collection('users').doc(userId).get())
    const participant = {
        name : participantData.data().name,
        email : participantData.data().email,
        id: participantData.id
    }

    console.log(participant)
    if (!participant) {
        res.status(400).send('Something went wrong..')
    }

    await db.collection('lists').doc(listId)
    .update({
        participants: db.FieldValue.arrayUnion(participant)
    })
    res.json({msg : 'Added successfully', participant})
}