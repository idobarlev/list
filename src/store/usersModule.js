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
        getCurUserFromFirebase : context => {
            context.commit('setIsLoading', true, { root: true })

            if (!auth.currentUser) {
                context.commit('setIsLoading', false, { root: true })
                return false
            }
            const uid = auth.currentUser.uid

            return new Promise((resolve, reject) => { 
                usersRef.doc(uid).onSnapshot(curUser => {
                    const curUserData = {
                        name : curUser.data().name,
                        email : curUser.data().email,
                        lists : curUser.data().lists,
                        id: curUser.id
                    }
                    if (!curUserData) {
                        context.commit('setIsLoading', false, { root: true })
                        reject()
                    }
                    context.commit('setCurUser', curUserData)    
                    context.commit('setIsLoading', false, { root: true })
                    resolve()
                })
            })
        },
    }
}

export default usersModule
