import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Nav() {
    const navegate = useNavigate();
    const [user, setUser]  = useState({email: ""});

    useEffect(() => {
        const fetchData = async () => {
            const user = localStorage.getItem("user")
            if(user) {
                setUser({email: user})
            }
        };
        fetchData();
      }, []);

    const handleSignOut = async () => {
        // const val = localStorage.getItem("user")
        // if(val) {
        //     const userInfo = JSON.parse(val)

        //     const config = {
        //         headers: {
        //             'Content-type': 'application/json',
        //             Authorization: `Bearer ${userInfo.token}`
        //         }
        //     }
        //     console.log(config)
        //     const { data } = await axios.post(
        //         'logout',
        //         config
        //     )
        //     console.log('data: ', data)
        //     localStorage.setItem("logged", "false");
        //     localStorage.setItem("user", "")
        //     setUser({first_name: "", last_name: "", email: ""})
        // }

        // await axios.post('logout');
        console.log("*****handleSignOut******")
        navegate('/logout')
    }

    const isLoggedIn = localStorage.getItem('logged')

    return (
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a href="/dashboard" className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" >eCommerce Manager</a>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* <input className="form-control form-control-dark w-100 col-6" type="text" placeholder="Search" aria-label="Search" /> */}

                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <Link className="nav-link" to={'/profile'}>{ user.email ? user.email: '' }</Link>
                    </li>
                    {!isLoggedIn &&
                        (
                            <li className="nav-item">
                                <Link className="nav-link" to='/logout'>Sign out</Link>
                            </li>
                        )
                    }
                </ul>
            </nav>
    )

}