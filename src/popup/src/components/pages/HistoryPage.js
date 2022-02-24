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
            download: false,
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
            'All',
            'Last day',
            'Last week',
            'Last month',
            'Last year',
        ];
        return (
            <div className="page historyPage">
                <BackButton {...this.props}/>
                <p className="Title">HISTORY</p>
                <div className="row">
                    <div className="column">
                        <p className="option Title">BROWSING</p>
                        <div className="optionBtn browsing" 
                            onClick={() => this.setState({...this.state, browsing: !this.state.browsing })} 
                            style={{backgroundColor: this.state.browsing?"#AFF8CE":"#F8AFAF"}}
                            >
                            <img className="optionBtnIcon" src={BrowsingIcon} alt="optionIcon" />
                        </div>
                        <DropdownList options={options}/>
                    </div>
                    <div className="separator"></div>
                    <div className="column">
                        <p className="option Title">DOWNLOADS</p>
                        <div className="optionBtn download"
                            onClick={() => this.setState({...this.state, download: !this.state.download })} 
                            style={{backgroundColor: this.state.download?"#AFF8CE":"#F8AFAF"}}
                        >
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