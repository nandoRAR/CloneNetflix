import React from "react";
import './Header.css'

function Header({black}) {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="netflix"></img>
                </a>
            </div>

            <div className="header--user">
                <a href="/">
                <img src="https://i.pinimg.com/564x/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.jpg" alt="user"></img>
                </a>
            </div>

        </header>
    )
}

export default Header