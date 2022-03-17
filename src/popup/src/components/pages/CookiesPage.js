/*global chrome*/
import React from 'react';
import BackButton from '../BackButton';
import WebsiteCard from '../WebsiteCard';
import '../../styles/CookiesPage.css';
import Loader from '../Loader';
import { getData, setData, parseCookie, getMemoryCookies } from '../Utils';

class CookiesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cloud_cookies: undefined,
            chrome_cookies : undefined,
            searchTerm: ''
        }
    }

    componentDidMount() {
        getData((data) => {
            getMemoryCookies((result) => {
                var chrome_cookies = {};

                result.forEach(cookie => {
                    var cookie_data = parseCookie(cookie);
                    var host = cookie_data.host;
                    var tld = cookie_data.tld;
                    if (host === undefined) return
                    console.log(`http://${host}.${tld}/favicon.ico`);
                    if (!(host in chrome_cookies))
                        chrome_cookies[host] = {
                            enabled: true,
                            logo_url: `http://${host}.${tld}/favicon.ico`
                        };
                })
                
                this.setState({ cloud_cookies: data.cookies, chrome_cookies: chrome_cookies })
            })
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

    inputHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        console.log(this.state.chrome_cookies, this.state.cloud_cookies);
        return (
            <div className='page cookiesPage'>
                <BackButton {...this.props} />
                <p className="Title">WEBSITES</p>
                <input name="searchTerm" type="text" placeholder='Search platform' value={this.state.searchTerm} onChange={this.inputHandler} />
                {
                    ((this.state.cloud_cookies === undefined) && 
                    (this.state.chrome_cookies === undefined)) ?
                        <Loader /> :
                        <div>
                            <div className='websitesList'>
                                {
                                    /*
                                    Object.keys(this.state.cloud_cookies).sort().map((platform) => {
                                        if (platform.toLowerCase().startsWith(this.state.searchTerm.toLowerCase())) {
                                            return <WebsiteCard
                                                key={platform}
                                                active={this.state.cloud_cookies[platform].enabled}
                                                disabled={"force" in this.state.cloud_cookies[platform] ? true : false}
                                                platform={platform}
                                            />
                                        }
                                        else {
                                            return null;
                                        }
                                    })
                                    */
                                    Object.keys(this.state.chrome_cookies).sort().map((platform) => {
                                        if (platform.toLowerCase().startsWith(this.state.searchTerm.toLowerCase())) {
                                            return <WebsiteCard
                                                key={platform}
                                                active={this.state.chrome_cookies[platform].enabled}
                                                disabled={"force" in this.state.chrome_cookies[platform] ? true : false}
                                                logo_url={this.state.chrome_cookies[platform].logo_url}
                                                platform={platform}
                                            />
                                        }
                                        else {
                                            return null;
                                        }
                                    })

                                    //console.log("These are the memory cookies ", chrome_cookies, Object.getOwnPropertyNames(chrome_cookies), Object.getOwnPropertyNames(chrome_cookies).sort())
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
export default CookiesPage;
