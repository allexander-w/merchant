export default function ({redirect}) {
    if(!localStorage.getItem('token')) {
        return redirect('/signin?message="noAuth"')
    }
}