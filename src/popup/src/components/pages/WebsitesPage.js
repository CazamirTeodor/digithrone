import React from 'react';
import BackButton from '../BackButton';
import WebsiteCard from '../WebsiteCard';
import '../../styles/WebsitesPage.css';

class WebsitesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'Google': true,
            'Facebook': false,
            'Digital Ocean': false,
            'Github': true,
            'Bing': true,
            'Youtube': false,
        }
    }

    disableAll = _ => {
        var newState = this.state;
        Object.entries(newState).forEach(([name]) => {
            newState[name] = false;
        })
        this.setState(newState);
    }
    
    enableAll = _ => {
        var newState = this.state;
        Object.entries(newState).forEach(([name]) => {
            newState[name] = true;
        })
        this.setState(newState);
    }

    render() {
        return (
            <div className='page websitesPage'>
                <BackButton {...this.props}/>
                <p className="Title">WEBSITES</p>

                <div className='websitesList'>
                    {
                        Object.keys(this.state).map((name) => {
                            return <WebsiteCard key={name} active={this.state[name]} logo="https://www.google.com/favicon.ico" name={name} />
                        })
                    }
                </div>
                <div className='optionsBtns'>
                    <div className="greyBtn" onClick={this.enableAll}><p>Enable all</p></div>
                    <div className="greyBtn" onClick={this.disableAll}><p>Disable all</p></div>
                </div>
            </div>
        );
    }
}
export default WebsitesPage;
