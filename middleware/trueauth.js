export default function ({redirect}) {
    if(localStorage.getItem('token')) {
        return redirect('/merchant?message="auth"')
    }
}