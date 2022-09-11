import React, {useState, useEffect} from 'react'
import {Link, Outlet, useParams} from 'react-router-dom'
import './Royal.scss'
import Message from '../../Components/Message/Message';

export default function Royal() {

  useParams();

  const royalUrl = document.location.href.split('/')[4];

  const [menu, setMenu] = useState(royalUrl)    
  
  useEffect(() => {
    setMenu(royalUrl)
  }, [royalUrl])


  return (
    <div className='royal'>
      <Message pageName="royal"></Message>
      <nav className='accueil-nav'>
        <ul>
          <Link className={menu === "a-laffiche" ? "active" : ""} to="/le-royal/a-laffiche"><li>à l'affiche</li></Link>
          <Link className={menu === "la-salle" ? "active" : ""} to="/le-royal/la-salle"><li>La salle</li></Link>
          <Link className={menu === "tarifs" ? "active" : ""} to="/le-royal/tarifs"><li>Tarifs</li></Link>
        </ul>
      </nav>

      <Outlet />

      {/* {
        menu === "films" &&
        <FilmList title="Le Royal" />
      } */}

      {/* {
        menu === "salle" &&
        <Salle photos={photosRoyal} infos={infosRoyal} />
      } */}

      {/* {
        menu === "tarifs" &&
        <div className='royal-tarifs'>
          {
            tarifsRoyal.map(tarif => (
              <Tarif key={uuidv4()} tarif={tarif} />
            ))
          }
        </div>
      } */}

      {/* {
        menu === "special" &&
        <FilmList title="Séances spéciales"/>
      } */}
    </div>
  )
}
