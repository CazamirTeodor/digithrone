import React from "react";
import BackButton from "../BackButton";
import BrowsingIcon from "../../assets/browsing-icon.png";
import DownloadIcon from "../../assets/download-icon.png";
import '../../styles/HistoryPage.css';
class HistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            browsing: false,
            browsingInterval: 365,
            download: false,
            downloadInterval: 7
        }
    }

    // TODO
    toggle = _ => {
        this.setState({
            ...this.state

        });
    }

    render() {
        return (
            <div className="page historyPage">
                <BackButton route="/settings" />
                <p className="Title">HISTORY</p>
                <div className="row">
                    <div className="column">
                        <div className="optionBtn browsing" style={{backgroundColor: this.state.browsing?"#AFF8CE":"#F8AFAF"}}>
                            <img className="optionBtnIcon" src={BrowsingIcon} alt="optionIcon" />
                        </div>
                        <div className="dropdown"></div>
                    </div>
                    <div className="separator"></div>
                    <div className="column">
                        <div className="optionBtn download" style={{backgroundColor: this.state.download?"#AFF8CE":"#F8AFAF"}}>
                            <img className="optionBtnIcon" src={DownloadIcon} alt="optionIcon" />
                        </div>
                        <div className="dropdown"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HistoryPage;