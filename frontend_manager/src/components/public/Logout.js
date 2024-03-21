import Login from "./Login";
import './Public.css';

export default function Logout() {

    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('user_id')
    return <Login />
}