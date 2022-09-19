import React, {useState, useEffect} from 'react'
import {Link, Outlet, useParams} from 'react-router-dom'
import './Mulsanne.scss'
import Message from '../../Components/Message/Message';

export default function Mulsanne() {

  useParams();

  const mulsanneUrl = document.location.href.split('/')[4];

  const [menu, setMenu] = useState(mulsanneUrl)  
  
  useEffect(() => {
    setMenu(mulsanneUrl)
  }, [mulsanneUrl])

  return (
    <div className='mulsanne'>
      <Message pageName="mulsanne"></Message>
      <nav className='accueil-nav'>
        <ul>
          <Link className={menu === "a-laffiche" ? "active" : ""} to="/mulsanne/a-laffiche"><li>à l'affiche</li></Link>
          <Link className={menu === "la-salle" ? "active" : ""} to="/mulsanne/la-salle"><li>La salle</li></Link>
          <Link className={menu === "tarifs" ? "active" : ""} to="/mulsanne/tarifs"><li>Tarifs</li></Link>
        </ul>
      </nav>

      <Outlet />      
    </div>
  )
}
