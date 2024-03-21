import { Navigate } from 'react-router-dom';

export default function RedirectToDashboard() {

    const isLoggedIn = localStorage.getItem('user') || undefined

    return (
        <div>
            {isLoggedIn ?
                <Navigate to="/dashboard" /> :
                <Navigate to="/login" />}
        </div>
    )
}