import React from "react";
import DropdownIcon from '../assets/dropdown-icon-b.png';
import '../styles/DropdownList.css';

class DropdownList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            selectedOption: Object.keys(this.props.options)[0]
        };
    }

    setOption = option => {
        this.props.setOption(this.props.options[option])
        this.setState({
            show: false,
            selectedOption : option
        })
    }

    toggleSelect = _ => {
        this.setState({
            show: !this.state.show,
        });
    }


    render() {
        return (
            <div className="dropdown" style={{overflow: this.state.show?"visible":"hidden"}} onClick={this.toggleSelect}>
                <div className="chosen-option">
                    <p>{this.state.selectedOption}</p>
                </div>
                <div className="all-options">
                {
                    Object.keys(this.props.options).map(option => {
                        return <p className="option" onClick={ () => this.setOption(option)}>{option}</p>
                    })
                }
                </div>
                <img src={DropdownIcon} className="dropdown-icon"  alt="dropdown-icon" />
            </div>
        );
    }
}

export default DropdownList;