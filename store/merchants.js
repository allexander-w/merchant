import req from '~/plugs/request.plug'
export const actions = {
    // All merchants  -merchant
    async GET_MERCHANTS({}){
        const url = new URL ( `${req.mainUrl}api/account` )
        const data = await req.request(url, 'GET', req.headers(req.token()), null)
        return data
    }, 
    // Merchant id data -MerchantHeader 
    async MERCHANT({}){
        const url = new URL ( `${req.mainUrl}api/merchant?merchant_id=${req.merchant.id()}` )
        const data = await req.request(url, 'GET', req.headers(req.token()), null)
        return data
    },
    // Create new merchant merchants-add
    async CREATE_MERCHANT({}, merchData){
        const url = new URL (`${req.mainUrl}api/merchant/create`)
        const data = await req.request(url, 'POST', req.headers(req.token()), merchData)
        return data
    },
    // Get merchant status merchant-orders-sources-id
    async MERCHANT_STATUSES({}){
        const url = new URL (`${req.mainUrl}api/merchant/statuses?merchant_id=${req.merchant.id()}`)
        const data = await req.request(url, 'GET', req.headers(req.token()), null)
        return data
    },
}