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
            browsing: {
                active: false,
                interval: null
            },
            downloads: {
                active: false,
                interval: null
            }
        }
    }

    // TODO
    setDownloadsOption = option => {
        this.setState({
            downloads: {
                active: this.state.downloads.active,
                interval: option
            }
        });
    }

    setBrowsingOption = option => {
        this.setState({
            browsing: {
                active: this.state.browsing.active,
                interval: option
            }
        });
    }


    render() {
        var options = {
            'All' : 0,
            'Last day' : 1,
            'Last week' : 7,
            'Last month' : 30,
            'Last year' : 365
        };
        var styles = {
            active: { backgroundColor: "#AFF8CE" },
            inactive: { backgroundColor: "#F8AFAF" }
        }

        console.log(this.state);
        return (
            <div className="page historyPage">
                <BackButton {...this.props} />
                <p className="Title">HISTORY</p>
                <div className="row">
                    <div className="column">
                        <p className="option Title">BROWSING</p>
                        <div className="optionBtn browsing"
                            onClick={() => this.setState({
                                browsing: {
                                    active: !this.state.browsing.active,
                                    interval: this.state.browsing.interval
                                }
                            })}
                            style={this.state.browsing.active ? styles.active : styles.inactive}
                        >
                            <img className="optionBtnIcon" src={BrowsingIcon} alt="optionIcon" />
                        </div>
                        <DropdownList options={options} setOption={this.setBrowsingOption} />
                    </div>
                    <div className="separator"></div>
                    <div className="column">
                        <p className="option Title">DOWNLOADS</p>
                        <div className="optionBtn download"
                            onClick={() => this.setState({
                                downloads: {
                                    active: !this.state.downloads.active,
                                    interval: this.state.downloads.interval
                                }
                            })}
                            style={this.state.downloads.active ? styles.active : styles.inactive}
                        >
                            <img className="optionBtnIcon" src={DownloadIcon} alt="optionIcon" />
                        </div>
                        <DropdownList options={options} setOption={this.setDownloadsOption} />
                    </div>
                </div>
            </div>
        );
    }
}

export default HistoryPage;