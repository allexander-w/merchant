import Vue from 'vue'
import converterPlugin from '~/plugins/converter.plug'
import Vuelidate from 'vuelidate'
import InfiniteLoading from 'vue-infinite-loading'

Vue.use (InfiniteLoading)
Vue.use (converterPlugin)
Vue.use (Vuelidate)

Vue.filter('cash', function (cash) {
  return cash.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ')
})
