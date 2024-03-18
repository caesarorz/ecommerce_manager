import React, { Component, ReactNode } from 'react'
import Menu from './secure/Menu'
import Nav from './secure/Nav'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

type Props = {
  children: ReactNode
}

export default class Wrapper extends Component<Props> {

  state = {
    redirect: false
  }

  // componentDidMount = async () => {
  //   const response = await axios.get('user');
  //   this.setState({
  //     redirect: response.status === 200 ? false : true
  //   })
  // }

  render() {
    if(this.state.redirect) {
      return <Navigate to="/login" />
    }

    return (
      <>
        <Nav />
        <div className="container-fluid">
          <div className="row">
            <Menu />
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                {this.props.children}
            </main>
          </div>
        </div>
      </>
    )
  }
}
