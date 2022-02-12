import React from "react";
import DropdownIcon from '../assets/dropdown-icon.png';
import '../styles/DropdownList.css';

class DropdownList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            selectedOption: this.props.options[0]
        };
    }

    setOption = option => {
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
                    this.props.options.map((option) => {
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