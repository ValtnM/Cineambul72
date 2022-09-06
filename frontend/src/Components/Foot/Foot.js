import React from 'react'
import './Foot.scss'
import Logo from '../../assets/img/logo-cineambul.png'
import { Link } from 'react-router-dom'

export default function Foot() {

  

  return (
    <div className="foot">
      <Link className='foot-logo' to="/admin" ><img src={Logo} alt="" /></Link>

      {/* <a   href="#">
        
      </a> */}
      <ul className="foot-nav">
          <li><a href="#profile">Mon profil</a></li>
          <li><a href="#skills">Mes compétences</a></li>
          <li><Link to="/nous-contacter">Nous contacter</Link></li>
          {/* <li onClick={() => deleteToLocalStorage()}><a href="#contact">Déconnexion</a></li> */}
      </ul>
      <div className="copyright">
          {/* <font-awesome-icon class="copyright-icon" icon="copyright" /> */}
          <p>2022 Cinéambul 72, Tous droits réservés.</p>
      </div>
  </div>
  )
}
