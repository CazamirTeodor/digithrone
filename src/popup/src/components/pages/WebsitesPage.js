import React from 'react';
import BackButton from '../BackButton';
import WebsiteCard from '../WebsiteCard';
import '../../styles/WebsitesPage.css';
import Loader from '../Loader';
import { getData, setData } from '../Utils';

class WebsitesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined
        }
    }

    componentDidMount() {
        getData((data) => {
            if (data)
                this.setState({ data: data })
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
        getData((data) => {
            Object.keys(data.cookies).forEach((platform) => {
                data.cookies[platform].enabled = value;
            });

            setData({ data: data }, () => {
                this.setState({
                    data: data
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
                <BackButton {...this.props} />
                <p className="Title">WEBSITES</p>
                {
                    this.state.data === undefined ?
                        <Loader /> :
                        <div>
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
                        </div>
                }

                {
                    /*
                    <div className='optionsBtns'>
                        <div className="greyBtn" onClick={() => this.setAll(true)}><p>Enable all</p></div>
                        <div className="greyBtn" onClick={() => this.setAll(false)}><p>Disable all</p></div>
                    </div>
                    */
                }

            </div>
        );
    }
}
export default WebsitesPage;
