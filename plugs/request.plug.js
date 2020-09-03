export default {
    mainUrl: "https://merchant.itl.systems/",
    authHeaders: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    request: async (url, method='GET', headers, body = null) => {

        if(method === 'POST') {
            const data = await ( await (fetch(url, {
                method,
                credential: 'include',
                headers,
                body: JSON.stringify(body)
            }))).json()
            
            return data
        }

        const data = await ( await (fetch(url, {
            method,
            headers
        }))).json()
            
        return data
    },
    token: () => {
        const token = localStorage.getItem('token')
        return token
    },
    headers: token => ({
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
    }),
}