import { auth, usersRef } from '../../firebaseConfig'

const usersModule = {
    namespaced: true,
    state: { 
        curUser : {},
    },
    getters: { 
        getCurUser : state => {
            return state.curUser
        },
        IsUserExistInList (state, getters, rootState, rootGetters) {
            const listId = rootGetters['listsModule/getTempList'].id
            const userLists = state.curUser.lists
            return (userLists && userLists.includes(listId))
        },
    },
    mutations: {
        setCurUser : (state, curUser) => {
            state.curUser = curUser
        },
    },
    actions: {
        async getCurUserFromFirebase(context) {

            if (!auth.currentUser) {
                return false
            }
            const uid = auth.currentUser.uid

            // Get cur user
            const curUser = await usersRef.doc(uid).get()
            const curUserData = {
                name : curUser.data().name,
                email : curUser.data().email,
                lists : curUser.data().lists,
                id: curUser.id
            }

            if (!curUserData) {
                return false
            }

            context.commit('setCurUser', curUserData)
        },
    }
}

export default usersModule
