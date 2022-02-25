/*global chrome*/
import React from 'react';
import BackButton from '../BackButton';
import WebsiteCard from '../WebsiteCard';
import '../../styles/WebsitesPage.css';
import Loader from '../Loader';

class WebsitesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined
        }
    }

    componentDidMount() {
        chrome.storage.local.get(['data'], (result) => {
            if (result.data)
                this.setState({ data: result.data })
        });
    }

    disableAll = _ => {
        var newState = this.state;
        Object.entries(newState).forEach(([name]) => {
            newState[name] = false;
        })
        this.setState(newState);
    }

    setAll = (value) => {
        chrome.storage.local.get(['data'], (result) => {
            Object.keys(result.data.cookies).forEach( (platform) => {
                result.data.cookies[platform].enabled = value;
            });

            chrome.storage.local.set({data : result.data}, () => {
                this.setState({
                    data: result.data
                })
            })
        })
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
                {this.state.data === undefined ?
                    <Loader /> :
                    <div>
                        <BackButton {...this.props} />
                        <p className="Title">WEBSITES</p>

                        <div className='websitesList'>
                            {
                                Object.keys(this.state.data.cookies).map((platform) => {
                                    console.log(platform);
                                    return <WebsiteCard
                                        key={platform}
                                        active={this.state.data.cookies[platform].enabled}
                                        logo={this.state.data.cookies[platform].logo}
                                        platform={platform}

                                    />
                                })
                            }
                        </div>
                        <div className='optionsBtns'>
                            <div className="greyBtn" onClick={() => this.setAll(true)}><p>Enable all</p></div>
                            <div className="greyBtn" onClick={() => this.setAll(false)}><p>Disable all</p></div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
export default WebsitesPage;
