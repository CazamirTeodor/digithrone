import React from "react";
import ModalWindow from "./ModalWindow";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showModal: false
        }
    }

    login = e => {
        e.preventDefault();

        var correct = true;
        if (correct) {
            this.props.history.push("/dashboard");
        }
        else {
            console.log("Wrong username or password!");
            this.setState({
                email: '',
                password: '',
                showModal: true
            });
            document.getElementById('root').style.setProperty('filter', 'blur(5px)');
            
        }
    }

    inputHandler = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    closeModal = _ => {
        document.getElementById('root').style.removeProperty('filter'); 
        this.setState({
            ...this.state,
            showModal : false
        })
    }

    render() {
        return (
            <form className="loginForm" onSubmit={this.login}>
                <input type="text" value={this.state.email} name="email" placeholder="Email" onChange={this.inputHandler}></input>
                <input type="password" value={this.state.password} name="password" placeholder="Password" onChange={this.inputHandler}></input>
                <button type="submit" className="loginBtn">
                    <p>LOG IN</p>
                </button>
                <ModalWindow message="Wrong email or password!" btn="Sorry :( I'll try again" show={this.state.showModal} onHide={this.closeModal}/>
            </form>
        );
    }
}

export default LoginForm;