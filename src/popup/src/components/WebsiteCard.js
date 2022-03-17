import React from 'react';
import Lock from '../assets/lock.png';
import NoLogo from '../assets/no-logo.png';
import '../styles/WebsiteCard.css';

import { getData, setData } from './Utils';

class WebsiteCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: this.props.active,
            disabled: this.props.disabled,
            logo_data: undefined 
        }
    }


    async componentDidMount() {
        const url = this.props.logo_url;
        var response_status;
        const data = await fetch(url)
            .then( response => {
                response_status = response.status;
                return response.blob();
            } )
            .then( blob => new Promise( callback =>{
                let reader = new FileReader() ;
                reader.onload = function(){ callback(this.result) } ;
                reader.readAsDataURL(blob) ;
            }) ) ;

        if (response_status === 200)
            this.setState({logo_data : data});
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
            on: {
                backgroundColor: "#53A551",
                filter: "grayscale(0%)"
            },
            off: {
                filter: "grayscale(100%)"
            }
        }

        console.log(this.props.logo_url);

        return (
            <div className='websiteCard'
                onClick={this.state.disabled ? null : this.toggle}
                style={
                    this.state.disabled ?
                        style.off :
                        this.state.active ? style.on : style.off}>
                <div className='websiteCardWrapper'>
                    <img className="websiteLogo" src={this.state.disabled ? Lock : this.state.logo_data === undefined ? NoLogo : this.state.logo_data} alt="logo" />
                    <p>{this.props.platform.charAt(0).toUpperCase() + this.props.platform.slice(1)}</p>
                </div>
            </div>
        );
    }
}
export default WebsiteCard;