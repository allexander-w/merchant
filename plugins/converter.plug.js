export default {
    install(Vue, options) {
        Vue.prototype.$convert = source => {
            return `${source.slice(0, 10)} ${source.slice (11, 19)}`
        }
    }
}