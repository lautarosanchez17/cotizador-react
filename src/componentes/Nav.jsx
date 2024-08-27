import React from 'react';
import { Link } from 'react-router-dom';


const Nav = () => {
    return (
        <nav>
            <img src="/public/ico/img/cotiza-logo.png" alt="logo" />
            <div>
                <Link to='/'><i className="ti ti-home"></i></Link>
                <Link to='historial'><i className="ti ti-cloud"></i></Link>
            </div>
        </nav>
    );
};

export default Nav;