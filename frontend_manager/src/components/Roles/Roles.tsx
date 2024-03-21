import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Role } from "../../classes/Role";
import Wrapper from "../Wrapper";

export default function Roles() {
        const navegate = useNavigate();
        const [roles, setRoles]  = useState([]);

        useEffect(() => {
            const fetchData = async () => {
                const token = localStorage.getItem("token")
                if(token) {
                    const config = {
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }
                    const { data } = await axios.get(
                        'roles',
                        config
                    )
                    setRoles(data.data)
                } else {
                    navegate('/logout')
                }
            }
            fetchData()
          }, []);

        const deleteRole = async (e:any) => {
            e.preventDefault()
            try {
                // await axios.delete(`roles/${e.target.value}`)
                // setRoles(roles.filter((role: Role) => role.id !== parseInt(e.target.value)));

                const token = localStorage.getItem("token")
                if(token) {
                    const config = {
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }
                    const { data } = await axios.delete(
                        `roles/${e.target.value}`,
                        config
                    )
                    setRoles(roles.filter((role: Role) => role.id !== parseInt(e.target.value)));
                }


            } catch(e) {
                console.log(e)
            }
        }

        const editRole = async (e:any) => {
            e.preventDefault()
            try {
                navegate(
                        `/roles/edit/${e.target.value}`,
                        {state: { role: roles.find((role: Role) => role.id === parseInt(e.target.value)) }}
                );
            } catch (e) {
                console.log(e)
            }
        }

        return (
            <Wrapper>
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <Link to={"/roles/create"} type="button" className="btn btn-sm btn-outline-primary">Add</Link>
                    </div>
                </div>

                <div className="table-reponsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Permissions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map(
                                (role: Role) => {
                                    return (
                                        <tr key={role.id}>
                                            <td>{role.id}</td>
                                            <td>{role.name}</td>
                                            <td>
                                               {role.permissions.map(p => ` | ${p.name}`)}
                                            </td>
                                            <td>
                                                <div className="btn-group mr-2">
                                                    <button  type="button" className="btn btn-sm btn-outline-secondary"
                                                        value={role.id} defaultValue={role.id}  onClick={editRole}>Edit
                                                    </button>
                                                    <button  type="button" className="btn btn-sm btn-outline-danger"
                                                        value={role.id} defaultValue={role.id} onClick={deleteRole}>Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </Wrapper>
        )
}

function navegate(arg0: string, arg1: { state: { user: any; }; }) {
    throw new Error("Function not implemented.");
}
