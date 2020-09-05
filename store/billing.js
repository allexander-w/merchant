import req from '~/plugs/request.plug'

export const actions = {
    // Billing object
    async BILLING ({}) {
        const url = new URL (`${req.mainUrl}api/merchant/billing?merchant_id=${req.merchant.id()}`)
        const data = await req.request(url, 'GET', req.headers(req.token()), null)
        return data
    },
    // Billing plans - current tarifs
    async BILLING_PLANS ({}) {
        const url = new URL (`${req.mainUrl}api/merchant/plans?merchant_id=${req.merchant.id()}`)
        const data = await req.request(url, 'GET', req.headers(req.token()), null)
        return data
    },
    // Change plan
    async CHANGE_PLAN ({}, planData) {
        const url = new URL (`${req.mainUrl}api/merchant/plan/change`)
        const data = await req.request(url, 'POST', req.headers(req.token()), planData)
        return data
    },
}