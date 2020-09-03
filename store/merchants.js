import req from '~/plugs/request.plug'
export const actions = {
    async GET_MERCHANTS({}){
        const url = new URL ( `${req.mainUrl}api/account` )
        const data = await req.request(url, 'GET', req.headers(req.token()), null)
        return data
    }
}