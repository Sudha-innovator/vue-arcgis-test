/*jshint esversion: 6 */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    addLayer: false,
    name: 'Test'
  },
  getters: {
    getAddLayer(state){
      return state.addLayer;
    },

    getName(state) {
      return state.name;

    }

  },
  mutations: {   //syncronous
    setName(state, payload){
      state.name = payload;
    },
    setTag(state, tag){
      state.addLayer = tag;
    }
  },
  actions: {   //asyncronous
     setName(context, payload) {
      context.commit('setName', payload);
    }, 
    //setName()
    setTag(context, tag)
    {
      context.commit('setTag', tag);
    }
  },
  modules: {
  }
});
