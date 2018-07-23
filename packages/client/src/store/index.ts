import Vue from 'vue'
import Vuex from 'vuex'
import { main } from '@/store/modules/mainStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    main,
  }
})
