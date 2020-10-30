import { listsRef } from '../../firebaseConfig'
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    state: { // The data we want to store
        lists : [],
        tempList : {},
    },
    getters: { // Return state data
        userLists : state => {
            return state.lists
        },
        getTempList : state => {
            return state.tempList
        },
    },
    mutations: { // Change state data directly
        setLists(state, listsData) {
            state.lists = listsData
        },
        setTempList(state, value) {
            state.tempList = value
        },
        setTempListName(state, value) {
            state.tempList.name = value
        },
        setTempListDate(state, value) {
            state.tempList.date = value
        },
        setTempListType(state, value) {
            state.tempList.type = value
        },
    },
    actions: { // To lunch mutations -> update state data
        getListsFromFirebase : context => {
            
            // Real time listener for lists.
            listsRef.onSnapshot(snapshot => {
                const changes = snapshot.docChanges();
                var listsData = []
                changes.forEach(list => {
                if (list.type === 'added') {
                    listsData.push({
                    ...list.doc.data(),
                    id: list.doc.id
                    })
                } else if (list.type === 'removed') {
        
                    // get index of object with id: list.doc.id
                    var removeIndex = listsData.map(list => list.id).indexOf(list.doc.id);
        
                    // remove object
                    listsData.splice(removeIndex, 1);
                }
                })

                // Fire mutations to set actual data of state.list
                context.commit('setLists', listsData)
            })
        },
        actionSetTempList : (context, value) => {
            context.commit('setTempList', value)
        },
        actionSetTempListName : (context, value) => {
            context.commit('setTempListName', value)
        },
        actionSetTempListDate : (context, value) => {
            context.commit('setTempListDate', value)
        },
        actionSetTempListType : (context, value) => {
            context.commit('setTempListType', value)
        },
        actionSaveTempListChanges : context => {
            const { name, date, type} = context.state.tempList
            listsRef.doc(context.state.tempList.id)
            .update({ name, date, type })
            .then(() => {
                console.log('Item updated!')
                context.commit('setTempList',{})
            }).catch(err => console.error('Error in update', err))
        },
    }
});