import React from "react";
import "../styles/components/moreInfo.css";
import infoIcon from "../assets/info-icons/Info.svg";
import arrowIcon from "../assets/info-icons/next-icon.svg";

function MoreInfo({children}) {
    function actionmouseover() {
        const overlay = document.querySelector('.overlay');
        overlay.style.display = 'block';
        overlay.style.visibility = 'visible';
        overlay.style.opacity = '1';

    }

    function actionmouseout() {
        const overlay = document.querySelector('.overlay');
        overlay.style.display = 'none';
        overlay.style.visibility = 'hidden';
        overlay.style.opacity = '0';

    }

    return (
        <div className={'info-container'} onMouseLeave={actionmouseout}>
            <img className='icon-image'
                 onMouseOver={actionmouseover}
                 src={infoIcon}
                 alt="Info Icon"/>
            <div className='overlay'>
                {children}
            </div>

        </div>
    )
}

export default MoreInfo;

