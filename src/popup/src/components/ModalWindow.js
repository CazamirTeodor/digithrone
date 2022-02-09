import React from 'react';
import { Modal } from 'react-bootstrap';
import '../styles/ModalWindow.css';
import Bruh from '../assets/bruh.png';

class ModalWindow extends React.Component {
    render() {
        return (
                <Modal
                    {...this.props}
                    className="modalWindow"
                    closeOnOverlayClick={false}
                >
                    <Modal.Body className='modalBody'>
                        <section className='top'>
                            <img className="modalIcon" src={Bruh} alt="Bruh"/>
                            <p className='bruh'>BRUH</p>
                            <p>{this.props.message}</p>
                        </section>
                        <div className="modalWindowCloseBtn" onClick={this.props.onHide} >
                            <p>Sorry :( I'll try again</p>
                        </div>
                    </Modal.Body>
                </Modal>
        );
    }
}

export default ModalWindow;