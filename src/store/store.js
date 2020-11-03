import listsModule from './listsModule'
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    modules: {
        listsModule,
    },
})