import React from 'react'
import './Banner.scss'
import Fauteuil from '../../assets/img/auditorium.jpg'
import Logo from '../../assets/img/logo-cineambul.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'

export default function Banner() {
  return (
    <div className='banner'>
        <img src={Fauteuil} alt="Fauteuil de cinéma" />
        <div className='banner-txt'>
            <img src={Logo} alt="" />
            <h1>Cinéambul, le ciné qui circule !</h1>
        </div>
          <a href='https://www.facebook.com/profile.php?id=100063578411290' target='blank' className="facebook">
          <FontAwesomeIcon className='icon' icon={faFacebookF} />
          </a>
    </div>
  )
}
