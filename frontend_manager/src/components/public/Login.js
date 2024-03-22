import { useState } from "react";
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Message from "../secure/Message";
import { parseJwt } from '../../utils/generalUtils'
import './Public.css';

export default function Login() {

    const navegate = useNavigate();
    const [login, loginUser]  = useState(
            {
                first_name: "",
                password: "",
                email: ""
            }
        );
    const [message, setMesssage] = useState('');

    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('login/', {
                email: login.email,
                password: login.password
            })

            console.log(response.data)
            if(response.data) {
                const parseToken = parseJwt(response.data.access)
                localStorage.setItem("token", response.data.access)
                localStorage.setItem("user", login.email)
                localStorage.setItem("user_id", parseToken.user_id)
                navegate("/")
                return
            }

        } catch (error) {
            if(error.response.data && error.response.data.detail){
                console.log(error.response.data.detail)
                setMesssage(error.response.data.detail + ' or not valid account.');}
            else
                setMesssage('Server error')
        }
    }

    return (
            <form className="form-signin mt-4" onSubmit={formSubmit}>
                { (message) ? <Message variant='alert alert-warning' children={message}/> : ''}
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus
                    onChange={a => login.email = a.target.value}/>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required
                    onChange={e => login.password = e.target.value}/>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <p>New: <Link to={'/register'}> Register</Link></p>
                <hr></hr>
                <p className="mt-5 mb-3 text-muted">eCommerce 2023</p>
            </form>
        )
}