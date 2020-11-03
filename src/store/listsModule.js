import {auth, listsRef, timeStamp} from '../../firebaseConfig'

const listsModule = {
    namespaced: true,
    state: { 
        lists : [],
        tempList : {},
        isLoading : true,
    },
    getters: { 
        getUserLists : state => {
            return state.lists
        },
        getTempList : state => {
            return state.tempList
        },
        getIsLoading : state => {
            return state.isLoading
        },  
    },
    mutations: {
        setLists : (state, listsData) => {
            state.lists = listsData
        },
        setTempList : (state, value) => {
            state.tempList = value
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
        setIsLoading : (state, value) => {
            state.isLoading = value
        },
    },
    actions: {
        getListsFromFirebase : context => {
            context.commit('setIsLoading', true)

            listsRef.onSnapshot(snapshot => {
                const docs = snapshot.docs
                var listsData = []
                docs.forEach(list => {
                    listsData.push({ ...list.data(), id: list.id })
                })
                context.commit('setLists', listsData)
                context.commit('setIsLoading', false)
            })
        },
        createList : async context => {
            const isValid = await context.dispatch('isValid')
            if (!isValid) {
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
                context.commit('setTempList',{})
            })
            .catch((err) => {
                alert('Error occurred on creating event')
                console.error(err)
            })
        },
        updateList : async context => {
            const isValid = await context.dispatch('isValid')
            if (!isValid) {
                console.error(`Please fill all fields correctly!`)
                return false
            }

            const { name, date, type} = context.state.tempList
            listsRef.doc(context.state.tempList.id)
            .update({ name, date, type })
            .then(() => {
                console.log('Item updated!')
                context.commit('setTempList',{})
            }).catch(err => console.error('Error in update', err))
        },
        deleteList : (context, id) => {            
            listsRef.doc(id).delete()
            .then(() => {
                return 'ok'
            })
            .catch(err => console.error(err))
        },
        isValid : context => {
            return (context.state.tempList.name != undefined &&
            context.state.tempList.type != undefined &&
            context.state.tempList.name.length > 1) 
        }
    }
}

export default listsModule
