import React from 'react';
import '../styles/WebsiteCard.css';

import { getData, setData } from './Utils';

class WebsiteCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: this.props.active
        }
    }


    componentDidUpdate(prev_props) {
        if (this.props !== prev_props) {
            this.setState({
                active: this.props.active
            });
        }
    }

    toggle = event => {
        console.log(event.target);
        getData((data) => {
            console.log("Data is ", data);
            data.cookies[this.props.platform].enabled = !this.state.active;
            setData({ data: data }, () => {
                this.setState({
                    active: !this.state.active
                })
            })
        })
    }

    render() {
        return (
            <div className='websiteCard' onClick={this.toggle} style={{ backgroundColor: this.state.active ? "#53A551" : "#D13023", transition: ".3s" }}>
                <div className='websiteCardWrapper'>
                    <img className="websiteLogo" src={this.props.logo} alt="logo" />
                    <p>{this.props.platform}</p>
                </div>
            </div>
        );
    }
}
export default WebsiteCard;