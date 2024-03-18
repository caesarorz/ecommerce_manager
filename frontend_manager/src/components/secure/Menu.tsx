import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Menu() {

    const items = [
        {'link': '/dashboard', 'title': 'Dashboard', 'permission': 'all'},
        {'link': '/roles', 'title': 'Roles', 'permission': 'view_roles'},
        {'link': '/products', 'title': 'Products', 'permission': 'view_products'},
        {'link': '/orders', 'title': 'Orders', 'permission': 'view_orders'},
        {'link': '/users', 'title': 'Users', 'permission': 'view_users'},
    ];

  const [userPermissions, setuserPermissions]  = useState([]);

  useEffect(() => {
      const fetchData = async () => {
        // const response = await axios.get('user');
        // setuserPermissions(response.data.data.permissions)
      };
      fetchData();
    }, []);


    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div className="sidebar-sticky pt-3">
            <ul className="nav flex-column">
                {
                    items.map((element, index) => (
                        <li className="nav-item" key={index}>
                            <NavLink to={`${element.link}`} className="nav-link">
                                <span data-feather="file"></span>
                                {element.title}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </div>
    </nav>
    )

}