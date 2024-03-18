import './App.css';

import Dashboard from './components/Dashboard/Dashboard';
import Users from './components/Users/Users';

import {Route, Routes, BrowserRouter as Router, Navigate} from "react-router-dom";
import Login from './components/public/Login';
import Register from './components/public/Register';
import RedirectToDashboard from './components/RedirectToDashboard';
import UsersCreate from './components/Users/UsersCreate';
import UserEdit from './components/Users/UserEdit';
import Roles from './components/Roles/Roles';
import RoleEdit from './components/Roles/RoleEdit';
import RoleCreate from './components/Roles/RoleCreate';
import Products from './components/Products/Products';
import ProductEdit from './components/Products/ProductEdit';
import ProductCreate from './components/Products/ProductCreate';
import Orders from './components/Orders/Orders';
import OrderView from './components/Orders/OrderView';
import UserProfile from './components/UserProfile/UserProfile';


function App() {

  return (
    <Router>
      <div className='App'>
        {
          <Routes>
              <Route path={'/'} element={<RedirectToDashboard />} />
              <Route path={'/dashboard'} element={<Dashboard />} />
              <Route path={'/users/edit/:id'} element={<UserEdit/>}/>
              <Route path={'/users/create'} element={<UsersCreate/>}/>
              <Route path={'/users'} element={<Users/>}/>
              <Route path={'/roles/create'} element={<RoleCreate/>}/>
              <Route path={'/roles'} element={<Roles/>}/>
              <Route path={'/roles/edit/:id'} element={<RoleEdit/>}/>
              <Route path={'/products'} element={<Products/>}/>
              <Route path={'/products/edit/:id'} element={<ProductEdit/>}/>
              <Route path={'/products/create'} element={<ProductCreate/>}/>
              <Route path={'/orders/:id'} element={<OrderView/>}/>
              <Route path={'/orders'} element={<Orders/>}/>
              <Route path={'/profile'} element={<UserProfile/>}/>
              <Route path={'/login'} element={<Login/>}/>
              <Route path={'/register'} element={<Register/>}/>
          </Routes>
        }
      </div>
    </Router>
  );
}

export default App;
