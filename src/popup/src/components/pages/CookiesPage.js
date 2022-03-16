import React from 'react';
import BackButton from '../BackButton';
import WebsiteCard from '../WebsiteCard';
import '../../styles/CookiesPage.css';
import Loader from '../Loader';
import { getData, setData } from '../Utils';

class CookiesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cookies: undefined,
            searchTerm: ''
        }
    }

    componentDidMount() {
        getData((data) => {
            if (data){

            }
                this.setState({ cookies: data.cookies })
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
        return (
            <div className='page cookiesPage'>
                <BackButton {...this.props} />
                <p className="Title">WEBSITES</p>
                <input name="searchTerm" type="text" placeholder='Search platform' value={this.state.searchTerm} onChange={this.inputHandler} />
                {
                    this.state.cookies === undefined ?
                        <Loader /> :
                        <div>
                            <div className='websitesList'>
                                {
                                    Object.keys(this.state.cookies).sort().map((platform) => {
                                        if (platform.toLowerCase().startsWith(this.state.searchTerm.toLowerCase())) {
                                            return <WebsiteCard
                                                key={platform}
                                                active={this.state.cookies[platform].enabled}
                                                disabled={"force" in this.state.cookies[platform] ? true : false}
                                                logo={this.state.cookies[platform].logo}
                                                platform={platform}
                                            />
                                        }
                                        else{
                                            return null;
                                        }
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
export default CookiesPage;
