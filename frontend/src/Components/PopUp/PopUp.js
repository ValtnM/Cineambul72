import React, { useEffect, useState } from 'react'
import './PopUp.scss'
import ReactPlayer from 'react-player'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'

export default function PopUp(props) {

  
  const [trailerReady, setTrailerReady] = useState(false)
  
  useEffect(() => {
    console.log(trailerReady);
  }, [trailerReady])
    const closePopUp = () => {
        props.setPopUpTrailer(false)
    }

  return (
    <div className='pop-up'> 
        
            
            <ReactPlayer className="pop-up-trailer" style={trailerReady ? {display: "block"} : {display: "none"}} onReady={() => setTrailerReady(true)} url={props.trailerUrl} controls></ReactPlayer>
            <FontAwesomeIcon onClick={() => closePopUp()} className='pop-up-btn' icon={faCircleXmark}></FontAwesomeIcon>        
          
          
          <div className='loader' style={!trailerReady ? {display: "block"} : {display: "none"}} >
            
          </div>
            
          </div>
  )
}
