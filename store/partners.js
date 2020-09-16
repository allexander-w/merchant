import req from '~/plugs/request.plug'
export const actions = {
    async GET_PARTNERS({}) {
        const url = new URL (`${req.mainUrl}api/partner`)
        const data = await req.request(url, 'GET', req.headers(req.token()), null)
        return data
    },
    async GET_PARTNERS_HISTORY({}) {
        const url = new URL (`${req.mainUrl}api/partner/history`)
        const data = await req.request(url, 'GET', req.headers(req.token()), null)
        return data
    },
    async ADD_CLIENT({}, clientData) {
        const url = new URL (`${req.mainUrl}api/partner/client/add`)
        const data = await req.request(url, 'POST', req.headers(req.token()), clientData)
        return data
    },
}