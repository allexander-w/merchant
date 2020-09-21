import req from '~/plugs/request.plug'
export const actions = {
    async GET_PRODUCTS({}, offset) {
      const url = new URL (`${req.mainUrl}api/merchant/products?merchant_id=${req.merchant.id()}&limit=15&offset=${offset}`)
      const data = await req.request(url, 'GET', req.headers(req.token()), null)
      return data
    }
}