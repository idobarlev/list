import {auth, listsRef, timeStamp, usersRef} from '../../firebaseConfig'
import * as firebase from 'firebase/app'

const listsModule = {
    namespaced: true,
    state: { 
        lists : [],
        tempList : {},
    },
    getters: { 
        getUserLists : state => {
            return state.lists
        },
        getTempList : state => {
            return state.tempList
        },
    },
    mutations: {
        setLists : (state, listsData) => {
            state.lists = listsData
        },
        setTempList : (state, value) => {
            state.tempList = value
        },
        setTempId : (state, value) => {
            state.tempList.id = value
        },
        setTempListName : (state, value) => {
            state.tempList.name = value
        },
        setTempListDate : (state, value) => {
            state.tempList.date = value
        },
        setTempListType : (state, value) => {
            state.tempList.type = value
        },
    },
    actions: {
        getListsFromFirebase : context => {
            context.commit('setIsLoading', true, { root: true })
            listsRef.onSnapshot(snapshot => {
                const docs = snapshot.docs
                var listsData = []
                docs.forEach(list => {
                    listsData.push({ ...list.data(), id: list.id })
                })
                context.commit('setLists', listsData)
                context.commit('setIsLoading', false, { root: true })
            })
        },
        createList : async context => {
            context.commit('setIsLoading', true, { root: true })
            const isValid = await context.dispatch('isValid')
            if (!isValid) {
                context.commit('setIsLoading', false, { root: true })
                console.error(`Please fill all fields correctly!`)
                return false
            }

            const { name, date, type} = context.state.tempList
            listsRef.add({
                createdAt: timeStamp,
                ownerUid: auth.currentUser.uid,
                name,
                date,
                type
            })
            .then(() => {
                context.commit('setIsLoading', false, { root: true })
                context.commit('setTempList',{})
            })
            .catch((err) => {
                context.commit('setIsLoading', false, { root: true })
                alert('Error occurred on creating event')
                console.error(err)
            })
        },
        updateList : async context => {
            context.commit('setIsLoading', true, { root: true })
            const isValid = await context.dispatch('isValid')
            if (!isValid) {
                console.error(`Please fill all fields correctly!`)
                return false
            }

            const { name, date, type} = context.state.tempList
            listsRef.doc(context.state.tempList.id)
            .update({ name, date, type })
            .then(() => {
                context.commit('setIsLoading', false, { root: true })
                console.log('Item updated!')
                context.commit('setTempList',{})
            }).catch(err => {
                console.error('Error in update', err)
                context.commit('setIsLoading', false, { root: true })
            })
        },
        deleteList : (context, id) => {
            context.commit('setIsLoading', true, { root: true })            
            listsRef.doc(id).delete()
            .then(() => {
                context.commit('setIsLoading', false, { root: true })
                return 'ok'
            })
            .catch(err => {
                context.commit('setIsLoading', false, { root: true })
                console.error(err)
            })
        },
        addParticipant : async context => {
            const listId = context.state.tempList.id
            const {id, email, name} = context.rootState.usersModule.curUser
            const participant = { id, email, name }
            
            //Update participants in list
            await listsRef.doc(listId)
            .update({
                participants: firebase.firestore.FieldValue.arrayUnion(participant)
            })

            //Update lists in participant
            await usersRef.doc(id)
            .update({
                lists: firebase.firestore.FieldValue.arrayUnion(listId)
            })
        },
        deleteParticipant : async context => {
            const listId = context.state.tempList.id
            const {id, email, name} = context.rootState.usersModule.curUser
            const participant = { id, email, name }
            
            //Update participants in list
            await listsRef.doc(listId)
            .update({
                participants: firebase.firestore.FieldValue.arrayRemove(participant)
            })

            //Update lists in participant
            await usersRef.doc(id)
            .update({
                lists: firebase.firestore.FieldValue.arrayRemove(listId)
            })
        },
        isValid : context => {
            return (context.state.tempList.name != undefined &&
            context.state.tempList.type != undefined &&
            context.state.tempList.name.length > 1) 
        }
    }
}

export default listsModule
