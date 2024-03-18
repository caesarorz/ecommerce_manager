import React, { Component } from "react";
import { Navigate } from 'react-router-dom';

export default function RedirectToDashboard() {

    const isLoggedIn = localStorage.getItem('logged')

    return (
        <div>
            {isLoggedIn ?
                <Navigate to="/dashboard" /> :
                <Navigate to="/login" />}
        </div>
    )
}