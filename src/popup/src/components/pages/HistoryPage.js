import React from "react";
import BackButton from "../BackButton";
import BrowsingIcon from "../../assets/browsing-icon.png";
import DownloadIcon from "../../assets/download-icon.png";
import '../../styles/HistoryPage.css';
import DropdownList from "../DropdownList";
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
        var options = [
            'Last week',
            'Last month',
            'Last year',
            'Last 5Y',
            'Last 10Y',
            'Last 20Y',
            'Last 30Y'
        ];
        return (
            <div className="page historyPage">
                <BackButton route="/settings" />
                <p className="Title">HISTORY</p>
                <div className="row">
                    <div className="column">
                        <p className="option Title">BROWSING</p>
                        <div className="optionBtn browsing" style={{backgroundColor: this.state.browsing?"#AFF8CE":"#F8AFAF"}}>
                            <img className="optionBtnIcon" src={BrowsingIcon} alt="optionIcon" />
                        </div>
                        <DropdownList options={options}/>
                    </div>
                    <div className="separator"></div>
                    <div className="column">
                        <p className="option Title">DOWNLOADS</p>
                        <div className="optionBtn download" style={{backgroundColor: this.state.download?"#AFF8CE":"#F8AFAF"}}>
                            <img className="optionBtnIcon" src={DownloadIcon} alt="optionIcon" />
                        </div>
                        <DropdownList options={options}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default HistoryPage;