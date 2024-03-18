import axios from "axios";
import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";

import Wrapper from "../Wrapper";
import {useNavigate} from 'react-router-dom';


export default function UserEdit() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState({id: 0, first_name: '', last_name: '', email: '' , role: {id: 0, permissions: [{id: 0, name: ""}], name: ''}, role_id: 0});
    const [roles, setRole] = useState([{id: 1, permissions: [{id: 0, name: ""}], name: ''}]);

    useEffect(() => {
        if (state && state.user) {
            if (state.user.role) {
                setUser({...state.user, role_id: state.user.role.id });
            } else {
                setUser({...state.user, role_id: 0 });
            }
        }
        const fetchData = async () => {
            const val = localStorage.getItem("user")
            if(val) {
                const userInfo = JSON.parse(val)
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
                const { data } = await axios.get('roles',config)
                setRole(data.data)
            }
        }
        fetchData()
    }, [state]);

    const handleChange = (e:any) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSelectChange = async (e:any) => {
        const value = roles.filter(role => role.id === parseInt(e.target.value))
        const [{id}] = [...value]
        setUser({...user, role_id: id})
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const userUpdate = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role_id}

        const val = localStorage.getItem("user")
        if(val) {
            const userInfo = JSON.parse(val)
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.put(`users/${user.id}`, userUpdate, config)
            setUser(data.data)
        }
        navigate('/users')
    }

    return (
        <Wrapper>
                {user && user ? (
                    <form onSubmit={handleSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Edit User</h1>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="validationServer01">First name</label>
                                <input type="text" className="form-control" id="validationServer01" required
                                    name="first_name" defaultValue={user.first_name} onChange={handleChange}/>
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="validationServer02">Last name</label>
                                <input type="text" className="form-control" id="validationServer02" required
                                    name="last_name" defaultValue={user.last_name} onChange={handleChange}/>
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="validationServer03">Email</label>
                                <input type="text" className="form-control" id="validationServer02" required
                                    name="email" defaultValue={user.email} onChange={handleChange}/>
                                <div className="valid-feedback">
                                    Looks good!
                                </div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-4 mb-3">
                                <label htmlFor="validationServer04">Role: {user.role ? user.role.name : 'No assigned yet'}</label>
                                <select className="custom-select" id="validationServer04" aria-describedby="validationServer04Feedback"
                                    defaultValue='role' onChange={handleSelectChange} required >
                                    <option selected>Change role</option>
                                    {roles.map((role) =>
                                        <option value={role.id} key={role.id}>{role.name}</option>
                                    )}

                                </select>
                            </div>
                        </div>
                        <button disabled={user.role_id === 0 ? true : false} className="btn btn-danger" type="submit">Submit</button>
                        <button className="btn btn" type="submit"
                            onClick={() => navigate('/users')}>Cancel
                        </button>
                </form>
                ) : (
                    <p>Loading...</p>
                )}
        </Wrapper>
    )
}