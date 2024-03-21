import { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import axios from 'axios';
import { User } from "../../classes/User";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Users() {
    const navegate = useNavigate();
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState([]);

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
                    'users',
                    config
                )
                setUsers(data.data)
            }
        }
        fetchData()
      }, []);

      const deleteUser = async (e:any) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("token")
            if(token) {
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await axios.delete(
                    `users/${e.target.value}`,
                    config
                )
                setUsers(users.filter((user: User) => user.id !== parseInt(e.target.value)));
            }
        } catch(e) {
            console.log(e)
        }
      }

      const editUser = async (userID: number) => {
            navegate(`edit/${userID}/`, {state: { user: users.find((user: User) => user.id === userID) }});
      }

      const pageBack = () => {}
      const pageNext = () => {}

    return (
        <Wrapper>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to={"/users/create"} type="button" className="btn btn-sm btn-outline-primary">Add</Link>
                </div>
            </div>


            {!users ? (<div>No users available for now</div>) : (
                    <div className="table-reponsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                            <th>id</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map(
                                (user: User) => {
                                    return (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.first_name}</td>
                                            <td>{user.last_name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role ? user.role.name : ''}</td>
                                            <td>
                                                <div className="btn-group mr-2">
                                                    <a href="." type="button" className="btn btn-sm btn-outline-secondary"
                                                        onClick={() => editUser(user.id)}>Edit
                                                    </a>
                                                    <button type="button" className="btn btn-sm btn-outline-danger"
                                                        value={user.id} defaultValue={user.id} onClick={deleteUser}>Delete
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
                )

            }


            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <a href="." className="page-link" onClick={pageBack}>Previous</a>
                    </li>
                    <li className="page-item">
                        <a href="." className="page-link" >{page}</a>
                    </li>
                    <li className="page-item">
                        <a href="." className="page-link" onClick={pageNext}>Next</a>
                    </li>
                </ul>
            </nav>
        </Wrapper>
    )
}