export const state = () => ({
    change: 1,
    validateArray: []
})
export const actions = {
    SEND_ID({commit}){
        commit('CHANGE_CHANGE')
    }
}
export const mutations = {
    CHANGE_CHANGE(state) { 
        state.change ++
    }
}
export const getters = {
    GET_CHANGE(state){return state.change}
}