import { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


export default function RoleEdit() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const initialStateRole = {id: -1, permissions: [{id: -1, name: ''}], name: ''}
    const [role, setRole] = useState(initialStateRole);
    const [permissions, setPerm] = useState([{id: 0, name: '', isChecked: false}]);
    const [checkedState, setCheckedState] = useState(new Array(permissions.length).fill(false));
    const [statePermissions, setStatePermissions] = useState(Array)

    const setCheckRole = (perm: any) => {
        const arr = new Array(permissions.length).fill(false)
        perm.forEach((item: any, idx: any) => {
            if(item.id === -1) return
            arr[idx] = true
        })
        setCheckedState(arr)
    }

    const setPermissions = (newCheckState: any) => {
        const newPermissions = permissions.map((i, idx) => {
            return {...i, isChecked: newCheckState[idx] === true ? true : false}
        })
        console.log("newPermissions ", newPermissions)
        setPerm(newPermissions)
        const arr = newPermissions.map(item => item.isChecked ? item.id : null).filter((item) => item)
        console.log('arr ', arr, typeof arr)
        setStatePermissions(arr)
    }



    useEffect(() => {
        if (state && state.role) {
          setRole(state.role);
          setCheckRole(state.role.permissions);
          console.log("state.role.permissions ", state.role.permissions)
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
                const { data } = await axios.get(
                    'permissions',
                    config
                )
                setPerm(data.data)
            }
        }
        fetchData()
    }, [state]);

    const handleName = (e:any) => {
        setRole({...role, name: e.target.value})
    }

    const handleCheckboxChange = (e:any) => {
        var position = parseInt(e.target.value)
        console.log('position ', position)
        const newCheckState = checkedState.map((item, index) => index === position-1 ? !item : item)
        setCheckedState(newCheckState)
        setPermissions(newCheckState);
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const val = localStorage.getItem("user")
        console.log(statePermissions)
        console.log(role)
        if(val) {
            const fetchData = {
                name: role.name,
                permissions: statePermissions,
            }

            const userInfo = JSON.parse(val)
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.put(
                `roles/${role.id}`,
                fetchData,
                config
            )
            // setPerm(data.data)
            // setCheckRole(state.role.permissions)
            navigate('/roles')
        }

    }


    return (
        <Wrapper>{ role ? (
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Edit Role</h1>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Role name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1"
                        value={role.name} onChange={handleName}
                    />
                </div>

                <div className="form-group">
                    <h2 className="h4 mb-3 font-weight-normal">Edit Permissions</h2>
                    {permissions.map((p, index) =>
                        <div className="form-check form-check-inline" key={p.id}>
                            <input className="form-check-input" type="checkbox" id="inlineCheckbox1"
                                value={p.id} checked={checkedState[index]}
                                onChange={handleCheckboxChange}/>
                            <label className="form-check-label" htmlFor="inlineCheckbox1" >{p.name}</label>
                        </div>
                    )}

                </div>

                <button className="btn btn-danger" type="submit">Submit</button>
                <button className="btn btn" type="submit" onClick={() => navigate('/roles')}>Cancel</button>
            </form>
        ): (
            <p>Loading...</p>
        )}
        </Wrapper>
    )
}