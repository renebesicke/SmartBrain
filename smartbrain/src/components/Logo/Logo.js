import React from 'react';
import Tilt from 'react-tilt';
import Yeets from './yeets.png';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{max : 35}} style={{ height: 250, width: 250 }}>
                <div className="Tilt-inner pa3">
                    <img style={{paddingTop: '50px'}} src={Yeets} alt="logo"/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;