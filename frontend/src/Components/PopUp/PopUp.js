import React from 'react'
import './PopUp.scss'
import ReactPlayer from 'react-player'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'

export default function PopUp(props) {

    const closePopUp = () => {
        props.setPopUpTrailer(false)
    }

  return (
    <div className='pop-up'>        
        <ReactPlayer className="pop-up-trailer" url={props.trailerUrl} controls></ReactPlayer>
        <FontAwesomeIcon onClick={() => closePopUp()} className='pop-up-btn' icon={faCircleXmark}></FontAwesomeIcon>        
    </div>
  )
}
