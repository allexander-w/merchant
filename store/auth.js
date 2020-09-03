import req from '~/plugs/request.plug'

export const state = () => ({
    
})

export const actions = {
    async SIGN_IN ({}, {email, password}){
        const url = new URL ( `${req.mainUrl}api/account/auth` )
        const data = await req.request(url, 'POST', req.authHeaders, {email, password})
        data.status === 'success' ? localStorage.setItem('token', data.data) : console.log ('ERROR', data)
        return data.status
    },

    async SIGN_UP({dispatch}, registerData){
        const url = new URL ( `${req.mainUrl}account/register`)
        const data = await req.request(url, 'POST', req.authHeaders, registerData)
        data.status === 'success' ? dispatch('SIGN_IN', registerData) : console.log('ERROR', data) 
    }
}