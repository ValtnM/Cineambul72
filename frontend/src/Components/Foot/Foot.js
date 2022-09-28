import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Foot.scss'
import Logo from '../../assets/img/logo-cineambul.png'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-regular-svg-icons'

import PageUrlReducer from '../../redux/reducers/PageUrlReducer'

export default function Foot(props) {
  
  const pageUrl = useSelector(state => state.PageUrlReducer)

  const dispatch = useDispatch();

  // Envoi de l'url de la page
  const sendPageUrl = (data) => {
    dispatch({
      type: "CHANGEURL",
      payload: data
    })
  }

  return (
    <div className="foot">
      <Link  onClick={() => sendPageUrl("admin")} className='foot-logo' to="/admin" ><img src={Logo} alt="" /></Link>
      
      <ul className="foot-nav">
          {/* <li><a href="#profile">Mon profil</a></li> */}
          <li><Link onClick={() => sendPageUrl("contact")} to="/mentions-legales">Mentions Légales</Link></li>
          <li><Link onClick={() => sendPageUrl("contact")} to="/nous-contacter">Nous contacter</Link></li>
      </ul>
      <div className="copyright">
          <FontAwesomeIcon className="copyright-icon" icon={faCopyright}></FontAwesomeIcon>
          <p>2022 Cinéambul 72, Tous droits réservés.</p>
      </div>
  </div>
  )
}
