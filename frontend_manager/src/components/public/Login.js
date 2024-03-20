import { useState } from "react";
import './Public.css';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

import Message from "../secure/Message";

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
        console.log(e, login)
        e.preventDefault();
        try {
            const response = await axios.post('login', {
                email: login.email,
                username: login.email,
                password: login.password
            })

            console.log(response)

            const { email, first_name, id, last_name, role, token } = response.data
            localStorage.setItem("logged", "true");
            localStorage.setItem("user", JSON.stringify({"email": email, "first_name": first_name, "id": id, "last_name": last_name, "token": token, "role":role}))
            navegate("/")
            return
        } catch (error) {
            if(error.response.data && error.response.data.detail){
                console.log(error.response.data.detail)
                setMesssage(error.response.data.detail + ' or not valid account.');}
            else
                setMesssage('Server error')
        }
    }

    return (
            <form className="form-signin" onSubmit={formSubmit}>
                { (message) ? <Message variant='alert alert-warning' children={message}/> : ''}
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="text" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus
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