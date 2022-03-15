import React from 'react';
import Lock from  '../assets/lock.png';
import NoLogo from '../assets/no-logo.png';
import '../styles/WebsiteCard.css';

import { getData, setData } from './Utils';

class WebsiteCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: this.props.active,
            disabled: this.props.disabled
        }
    }


    componentDidUpdate(prev_props) {
        if (this.props !== prev_props) {
            this.setState({
                active: this.props.active,
                disabled: this.props.disabled
            });
        }
    }

    toggle = _ => {
        getData((data) => {
            data.cookies[this.props.platform].enabled = !this.state.active;
            setData(data, () => {
                this.setState({
                    active: !this.state.active
                })
            })
        })
    }

    render() {
        const style = {
            on : {
                backgroundColor : "#53A551",
                filter: "grayscale(0%)"
            },
            off : {
                filter: "grayscale(100%)"
            },
            disabled : {
                filter: "grayscale(100%)"
            }
        }

        return (
            <div className='websiteCard' 
                onClick={this.state.disabled? null : this.toggle} 
                style={ 
                    this.state.disabled ? 
                    style.disabled : 
                    this.state.active ? style.on : style.off}>
                <div className='websiteCardWrapper'>
                    <img className="websiteLogo" src={this.state.disabled? Lock: this.props.logo === undefined? NoLogo :`data:image/jpeg;base64,${this.props.logo}`} alt="logo" />
                    <p>{this.props.platform}</p>
                </div>
            </div>
        );
    }
}
export default WebsiteCard;