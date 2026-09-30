import React from "react";
import './header.component.css';

const Navbar = (props) => {
    return (
        <div className="Navbar">
            <ul className='Navbar_list'>
                <li className='Navbar_item'>
                    <a href="/home">Home</a>
                </li>
                <li className='Navbar_item'>
                    <a href="/about">About</a>
                </li>
                <li className='Navbar_item'>
                    <a href="/contact">Contact Us</a>
                </li>
                <li className='Navbar_item'>
                    <a href="/login">Login</a>
                </li>
            </ul>
        </div>
    )
}
export default Navbar