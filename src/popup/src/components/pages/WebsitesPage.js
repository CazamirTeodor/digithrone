import React from 'react';
import BackButton from '../BackButton';
import '../../styles/WebsitesPage.css';
import WebsiteCard from '../WebsiteCard';

class WebsitesPage extends React.Component{
    render()
    {
        var websites = [
            'Google',
            'Facebook',
            'Academia Tehnica Militara',
            'Digital Ocean',
            'Google',
            'Facebook',
            'Academia Tehnica Militara',
            'Google',
            'Facebook',
            'Academia Tehnica Militara'
        ]
        return (
            <div className='page websitesPage'>
                <BackButton route="/settings" />
                <p className="Title">WEBSITES</p>

                <div className='websitesList'>
                    {websites.map( website => {
                        return <WebsiteCard active={true} logo="https://www.google.com/favicon.ico" name={website}/>
                    })}
                </div>
                <div className='optionsBtns'>
                    <div className="greyBtn"><p>Enable all</p></div>
                    <div className="greyBtn"><p>Disable all</p></div>
                </div>
            </div>
        );
    }
}
export default WebsitesPage;
