import './Public.css';
import axios from 'axios';
import { useEffect, useState } from "react";
import {Link, Navigate} from 'react-router-dom';

import Message from "../secure/Message";
import Wrapper from '../Wrapper';


export default function Register() {

    const [user, setUser] = useState({first_name:'',
                                        last_name:'',
                                        email:'',
                                        password:'',
                                        password_confirm:''});
    const [redirect, setRedirect] = useState(false);
    const [message, setMesssage] = useState('');

    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('register', {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: user.password,
                password_confirm: user.password_confirm,
                role: 3
            });
            setRedirect(true)
        } catch (error) {
            setMesssage(error.response.data.detail)
        }
    }

    return (
        <div>
            {redirect ? (<Navigate to="/login" />)
                :
            (   <form className="form-signin" onSubmit={formSubmit}>
                    { (message)? <Message variant='alert alert-warning' children={message}/> : ''}
                    <h1 className="h3 mb-3 font-weight-normal">Please register</h1>

                    <label htmlFor="firstName" className="sr-only">First Name</label>
                    <input type="text" id="firstName" className="form-control" placeholder="First Name" required
                            onChange={e => user.first_name = e.target.value}
                    />

                    <label htmlFor="lastName" className="sr-only">Last Name</label>
                    <input type="text" id="lastName" className="form-control" placeholder="Last Name" required
                        onChange={e => user.last_name = e.target.value}
                    />

                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required
                        onChange={e => user.email = e.target.value}
                    />

                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                        onChange={e => user.password = e.target.value}
                        required/>

                    <label htmlFor="passwordConfirm" className="sr-only">Password Confirm</label>
                    <input type="password" id="passwordConfirm" className="form-control" placeholder="Password Confirm"
                        onChange={e => user.password_confirm = e.target.value}
                        required/>

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
                    <p>Already have an account: <Link to={'/login'}> Login</Link></p>
                    <hr></hr>
                    <p className="mt-5 mb-3 text-muted">eCommerce 2023</p>
                </form> )
            }
        </div>
    )

}

                // if (redirect) {
                //     return <Navigate to="/login" />}
        //         redirect ?
        //             (<Navigate to="/login" />)
        //             :
        //         (
