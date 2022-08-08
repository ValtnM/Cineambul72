import React, {useState, useEffect} from 'react'
import {Link, Outlet, useParams} from 'react-router-dom'
import FilmList from '../../Components/FilmList/FilmList'
import './Royal.scss'
import {v4 as uuidv4} from 'uuid'
import Salle from '../../Components/Salle/Salle'
import Tarif from '../../Components/Tarif/Tarif'

export default function Royal() {

  useParams();

  const royalUrl = document.location.href.split('/')[4];

  const [menu, setMenu] = useState(royalUrl)  

  const changeMenu = (content) => {
    setMenu(content)
  }
  
  useEffect(() => {
    setMenu(royalUrl)
  }, [royalUrl])


  return (
    <div className='royal'>
      <nav className='accueil-nav'>
        <ul>
          <Link to="/le-royal/a-laffiche"><li onClick={() => changeMenu("a-laffiche")} className={menu === "a-laffiche" ? "active" : ""}>à l'affiche</li></Link>
          <Link to="/le-royal/la-salle"><li onClick={() => changeMenu("la-salle")} className={menu === "la-salle" ? "active" : ""}>La salle</li></Link>
          <Link to="/le-royal/tarifs"><li onClick={() => changeMenu("tarifs")} className={menu === "tarifs" ? "active" : ""}>Tarifs</li></Link>
          <Link to="/le-royal/seances-speciales"><li onClick={() => changeMenu("seances-speciales")} className={menu === "seances-speciales" ? "active" : ""}>Séances spéciales</li></Link>
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
