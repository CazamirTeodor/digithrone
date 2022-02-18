import React from "react";
import Logo from '../assets/logo_fill_blue.png';
import '../styles/Loader.css';

class Loader extends React.Component {
    render() {
        return (
            <div className="loader">
                <div className="loader-background"></div>
                <img src={Logo} alt="logo"/>
            </div>
        );
    }
}

export default Loader;