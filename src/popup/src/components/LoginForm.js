/*global chrome*/
import React from "react";
import ModalWindow from "./ModalWindow";
import Loader from "./Loader";
import axios from 'axios';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showModal: false,
            loading: false
        }
    }

    login = e => {
        e.preventDefault();
        this.setState({ loading: true });

        const { email, password } = this.state;
        const data = {
            email,
            password
        };


        axios.post('http://localhost:3001/login', data)
            .then((res) => {
                if (res.data.message === "Success!") {
                    var updated = res.data.data;
                    updated.logged_in = true; // User is marked as logged in
                    updated.active = false; // Extension is not active by default
                    chrome.storage.local.set({ data: updated }, () => {
                        this.props.history.push({
                            pathname: '/dashboard',
                            state: {
                                active: false,
                                name: res.data.data.name
                            }
                        });
                    });
                }
                else {
                    console.log("Wrong username or password!");
                    this.setState({
                        email: '',
                        password: '',
                        showModal: true,
                        loading: false
                    });
                    document.getElementById('root').style.setProperty('filter', 'blur(5px)');

                }
            })
            .catch(err => {
                console.error(err);
            });
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
            showModal: false
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
                <ModalWindow message="Wrong email or password!" btn="Sorry :( I'll try again" show={this.state.showModal} onHide={this.closeModal} />
                {
                    this.state.loading ? <Loader /> : null
                }
            </form>
        );
    }
}

export default LoginForm;