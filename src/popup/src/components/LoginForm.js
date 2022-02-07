import React from "react";

class LoginForm extends React.Component{
    render(){
        return (
            <form className="loginForm">
                <input type="text" id="username" placeholder="Username"></input>
                <input type="text" id="password" placeholder="Password"></input>
                <div className="loginBtn">
                    <p>LOG IN</p>
                </div>
            </form>
        );
    }
}

export default LoginForm;