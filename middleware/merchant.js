export default function ({redirect}) {
    if (!localStorage.getItem('merchantName')) { return redirect('/merchant?message="mustEnterTheMerchant"') }
}