import { listsRef } from '../../firebaseConfig'
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    state: { // The data we want to store
        lists : [],
    },
    getters: { // Return state data
        userLists : state => {
            return state.lists
        }
    },
    mutations: { // Change state data directly
        setLists(state, listsData) {
            state.lists = listsData
        }
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
    }
});