import req from '~/plugs/request.plug'
export const state = () => ({
    
})

export const actions = {
    // List of markets, merchant-orders-sources
    async GET_MARKETS ({}) {
        const url = new URL (`${req.mainUrl}api/merchant/markets?merchant_id=${req.merchant.id()}&type=orders`)
        const data = await req.request(url, 'GET', req.headers(req.token()), null)
        return data
    },
    // Save settings of markets merchant-orders-sources-id
    async SAVE_MARKET ({}, settingsData) {
        const url = new URL (`${req.mainUrl}api/merchant/orders/settings`)
        const data = await req.request(url, 'POST', req.headers(req.token()), settingsData)
        return data
    },


}