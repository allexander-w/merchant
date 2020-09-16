export default function ({redirect}) {
    if (!JSON.parse(localStorage.getItem('merchant')).merchantName) { return redirect('/merchant?message="mustEnterTheMerchant"') }
}