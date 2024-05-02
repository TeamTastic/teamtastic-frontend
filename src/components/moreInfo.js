import React from "react";
import "../styles/moreInfo.css";
import infoIcon from "../assets/info-icons/Info.svg";


function MoreInfo({children}) {
    function actionmouseover() {
        const overlay = document.querySelector('.overlay');
        overlay.style.display = 'block';
        overlay.style.visibility = 'visible';
        overlay.style.opacity = '1';

    }

    function actionmouseout() {
        const overlay = document.querySelector('.overlay');
        overlay.style.opacity = '0';
        overlay.style.display = 'none';
        overlay.style.visibility = 'hidden';

    }

    return (
        <>
            <img className='icon-image'
                 onMouseLeave={actionmouseout}
                 onMouseOver={actionmouseover}
                 src={infoIcon}
                 alt="Info Icon"/>
            <div className='overlay'>
                {children}
            </div>
        </>
    )
}

export default MoreInfo;