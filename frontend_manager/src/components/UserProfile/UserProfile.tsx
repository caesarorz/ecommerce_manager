import { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";


export default function UserProfile() {

    const initialState = {
        id: 0,
        username: "",
        first_name: "",
        last_name: "",
        permissions: [],
        role: {id: 0, permissions: [], name: ''},
        address: "",
    }
    const [user, setUser]  = useState(initialState);
    var [password, setPassword] = useState("")
    var [passwordConfirm, setPasswordConfirm] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token")
            const userId = localStorage.getItem("user_id")

            if(token) {
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await axios.get(
                    `users/${userId}`,
                    config
                )

                console.log(data.data)
                console.log(user)
                setUser({...data.data})
            }
        }
        fetchData()
      }, []);

      const handleValue = (e:any) => {
        e.preventDefault()
        setUser({...user, [e.target.name]: e.target.value})
    }

    const changedUser = async (e:any) => {
        e.preventDefault();
        // const response = await axios.put(`users/${user.id}`,{
        //     first_name: user.first_name,
        //     last_name: user.last_name,
        //     email: user.email,
        //     role_id: user.role.id
        // });

        console.log(user)
        const userFetch = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.username,
            role: 1
        }

        const token = localStorage.getItem("token")
        const userId = localStorage.getItem("user_id")

        if(token) {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axios.put(
                `users/${userId}`,
                userFetch,
                config
            )
            setUser(data.data)
        }
    }

    const changePassword = async (e: any) => {
        e.preventDefault();
        if (password !== passwordConfirm) return;
        // message
        await axios.put('users/password', {
            "password": password,
            "password_confirm": passwordConfirm
        });
    }

    return(
        <Wrapper>
            <h1 className="h3 mb-3 font-weight-normal">User profile</h1>
            <form onSubmit={changedUser}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputName">Name</label>
                        <input type="text" className="form-control" id="inputName"
                            value={user.first_name && user.first_name} name="first_name" onChange={handleValue}/>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputLastName">Last name</label>
                        <input type="text" className="form-control" id="inputLastName"
                            value={user.last_name && user.last_name} name="last_name" onChange={handleValue}/>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail">Email</label>
                        <input type="email" className="form-control" id="inputEmail"
                            value={user.username} name="email" onChange={handleValue}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Address</label>
                    <input type="text" className="form-control" id="inputAddress" name="address"
                        onChange={handleValue} value={user.address}/>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-2">
                        <label htmlFor="inputRole">Role</label>
                        <input type="text" className="form-control" id="inputRole" name="role" disabled/>
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputZip">Permissions</label>
                        <input type="text" className="form-control" id="inputZip"
                            name="permissions" disabled/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="gridCheck"/>
                    <label className="form-check-label" htmlFor="gridCheck">
                        Check me out
                    </label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
            <hr />

            <form onSubmit={changePassword}>
            <h1 className="h3 mb-3 font-weight-normal">Change Password</h1>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputPassword1">Password</label>
                        <input type="password" name="password" className="form-control" id="inputPassword1"
                            onChange={e => setPassword(e.target.value)}  value={password} />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputPassword2">Confirm Password</label>
                        <input type="password" name="confirmPassword" className="form-control" id="inputPassword2"
                            onChange={e => setPasswordConfirm(e.target.value)} value={passwordConfirm}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </Wrapper>
    )
}