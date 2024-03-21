import { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function RoleCreate() {
    const navigate = useNavigate();
    const initialStateRole = {name: "", permissions: [] as Number[]}
    const [perm, setPerm] = useState([{id: 0, name: ''}])
    const initialStateChecked = new Array(perm.length).fill(false)
    const [role_, setRole] = useState(initialStateRole)
    const [checkedState, setCheckedState] = useState(initialStateChecked);

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
                    'permissions',
                    config
                )
                setPerm(data.data);
            }
        }
        fetchData()
    }, []);

    const handleName = (e:any) => {
        setRole({...role_, name: e.target.value})
    }

    const handleCheckboxChange = (e:any) => {
        var position = parseInt(e.target.value)
        setCheckedState(checkedState.map((item, index) => index === position-1 ? !item : item))
        if (e.target.checked)
            setRole({ ...role_, permissions: [...role_.permissions, position] });
        else
            setRole({ ...role_, permissions: role_.permissions.filter(p => p !== position) });
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        // await axios.post('roles', {
        //     name: role_.name,
        //     permissions: role_.permissions,
        // });
        const fetchData = {
                name: role_.name,
                permissions: role_.permissions}

        const token = localStorage.getItem("token")
        if(token) {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axios.post(
                'roles',
                fetchData,
                config
            )
            setPerm(data.data);
        }
        navigate('/roles')
    }

    return (
        <Wrapper>
            <form onSubmit={handleSubmit} className="mt-4">
                <h1 className="h3 mb-3 font-weight-normal">Create Role</h1>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Name role"
                        value={role_.name} onChange={handleName}/>
                </div>
                <div className="form-group">
                    <h2 className="h4 mb-3 font-weight-normal">Edit Permissions</h2>
                    {perm.map((p, index) =>
                        <div className="form-check form-check-inline" key={p.id}>
                            <input className="form-check-input" type="checkbox" id={`inlineCheckbox${p.id}`}
                                value={p.id} checked={checkedState[index]} onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label" htmlFor={`inlineCheckbox${p.id}`} >{p.name}</label>
                        </div>
                    )}
                </div>

                <button className="btn btn-primary" type="submit">Create</button>
                <button className="btn btn" type="submit"
                            onClick={() => navigate('/roles')}>Cancel
                </button>
            </form>
        </Wrapper>
    )
}