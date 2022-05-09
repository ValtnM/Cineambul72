import React from 'react'
import './Banner.scss'
import Fauteuil from '../../assets/img/auditorium.jpg'
import Logo from '../../assets/img/logo-cineambul.png'

export default function Banner() {
  return (
    <div className='banner'>
        <img src={Fauteuil} alt="Fauteuil de cinéma" />
        <div className='banner-txt'>
            <img src={Logo} alt="" />
            <h1>Cinéambul, le ciné qui circule !</h1>
        </div>
    </div>
  )
}
