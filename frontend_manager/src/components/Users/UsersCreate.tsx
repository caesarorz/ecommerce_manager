import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Role } from "../../classes/Role";
import Wrapper from "../Wrapper";


export default function UsersCreate() {
    const navigate = useNavigate();
    const [user, setUser] = useState({first_name: '', last_name: '', email: '', role: 3})
    const [roles, setRoles] = useState([{id: 3, permissions: [], name: ''}])

    useEffect(() => {
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
                console.log(userInfo.token)
                const { data } = await axios.get('roles', config)
                console.log(data.data)
                setRoles(data.data);
            }
        };
        fetchData();
      }, [setRoles]);

    // useEffect(() => {
    //     axios.get('roles')
    //       .then(response => {
    //         setRoles(response.data.data);
    //     })
    //       .catch(error => console.log(error));
    //   }, []);

    const handleValue = async (e:any) => {
        e.preventDefault()
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSelectChange = (e: any) => {
        const value = roles.filter(role => role.id === parseInt(e.target.value))
        const [{id}] = [...value]
        setUser({...user, role: id});
    }

    // const handleSubmit = async (e:any) => {
    //     e.preventDefault();
    //     await axios.post('users', {
    //         first_name: user.first_name,
    //         last_name: user.last_name,
    //         email: user.email,
    //         role_id: user.role
    //     });
    //     navigate('/users')
    // }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const fetchData = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role
        }
        const val = localStorage.getItem("user")
        if(val) {
            const userInfo = JSON.parse(val)
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.post(
                'users',
                fetchData,
                config
            )
        }
        navigate('/users')
    }

    return (
            <Wrapper>
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">Create User</h1>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="first_name">First name</label>
                            <input type="text" className="form-control" id="first_name" required
                                name="first_name" value={user.first_name} onChange={handleValue}/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="last_name">Last name</label>
                            <input type="text" className="form-control" id="last_name" required
                                name="last_name" value={user.last_name} onChange={handleValue}/>

                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" id="email" required
                                name="email" value={user.email} onChange={handleValue}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-3 mb-3">
                            <label htmlFor="validationServer04">Choose Role</label>
                            <select className="custom-select" id="validationServer04" aria-describedby="validationServer04Feedback"
                                 onChange={handleSelectChange}>
                                {roles.map(
                                    (role: Role) => {
                                        return (
                                            <option key={role.id} value={role.id}>{role.name}</option>
                                        )
                                    }
                                )}
                            </select>
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit">Create</button>
                    <button className="btn btn" type="submit"
                            onClick={() => navigate('/users')}>Cancel
                </button>
                </form>
            </Wrapper>
        )
}