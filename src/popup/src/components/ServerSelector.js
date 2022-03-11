import axios from "axios";
import React from "react";
import DropdownIcon from '../assets/dropdown-icon-w.png';
import '../styles/ServerSelector.css';

class ServerSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            selectedOption: null,
            options: null,
            setIntervalID: null     // Used for enabling/disabling server searcher
        };
    }

    componentDidMount() {
        var setIntervalID = setInterval(this.updateServerList, 1000);
        this.setState({ setIntervalID: setIntervalID });
    }

    componentWillUnmount() {
        clearInterval(this.state.setIntervalID);
    }

    updateServerList = _ => {
        axios.get('http://localhost:3001/servers')
            .then(res => {
                console.log("Received server list: ", res.data.servers);
                this.setState({ options: res.data.servers });
            })
    }

    selectServer = server => {
        this.props.selectServer(server)
        this.setState({
            show: false,
            selectedOption: server
        })
    }

    toggleSelect = _ => {
        if (this.state.options != null) {
            this.setState({
                show: !this.state.show,
            });
        }
    }


    render() {
        return (
            <div className="serverSelector" style={{ overflow: this.state.show ? "visible" : "hidden" }} onClick={this.toggleSelect}>
                <div className="chosen-option">
                    {
                        this.state.selectedOption != null ?
                            <p>{this.state.selectedOption}</p> :
                            <p>Select server...</p>
                    }
                </div>
                <div className="all-options">
                    {
                        this.state.options != null ?
                            this.state.options.map(option => {
                                return <p className="option" onClick={() => this.selectServer(option)}>{option}</p>
                            })
                            :
                            null
                    }
                </div>
                <img src={DropdownIcon} className="dropdown-icon" alt="dropdown-icon" />
            </div>
        );
    }
}

export default ServerSelector;