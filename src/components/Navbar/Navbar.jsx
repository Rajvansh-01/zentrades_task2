import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Component, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from '../../pages/Home/Home'
import "./navbar.css";
import logo from "../../images/smartserv-logo.png"

export default function Navbar() { 
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    return (
        <div>
            <nav className="navigation">
                <a href="/" className="brand-name">
                    <img src={logo} alt="logo" className="logo" />
                </a>

            </nav>
            <Routes>
              <Route exact path='/' component={Home} />
         
          </Routes>
        </div>
    );
}