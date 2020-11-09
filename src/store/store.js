import listsModule from './listsModule'
import usersModule from './usersModule'
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    modules: {
        listsModule,
        usersModule,
    },
    state : {
        isLoading : false,
    },
    mutations : {
        setIsLoading : (state, value) => {
            state.isLoading = value
        },
    },
    getters : {
        getIsLoading : state => {
            return state.isLoading
        },  
    }
})