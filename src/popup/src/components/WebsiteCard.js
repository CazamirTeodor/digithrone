import React from 'react';
import '../styles/WebsiteCard.css';

class WebsiteCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            active: this.props.active
        }
    }


    componentDidUpdate(prev_props)
    {
        if (this.props !== prev_props)
        {
            this.setState({
                active: this.props.active
            });
        }
    }

    toggle = _ => {
        
        this.setState({
            active: !this.state.active
        })
    }

    render(){
        return (
            <div className='websiteCard' onClick={this.toggle} style={{backgroundColor: this.state.active?"#B5FFB5":"#FFB5B5", transition: ".3s"}}>
                <div className='websiteCardWrapper'>
                    <img className="websiteLogo" src={this.props.logo} alt="logo"/>
                    <p>{this.props.name}</p>
                </div>

            </div>
        );
    }
}
export default WebsiteCard;