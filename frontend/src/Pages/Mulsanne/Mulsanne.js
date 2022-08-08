import React, {useState, useEffect} from 'react'
import {Link, Outlet, useParams} from 'react-router-dom'
import FilmList from '../../Components/FilmList/FilmList'
import './Mulsanne.scss'
import {v4 as uuidv4} from 'uuid'
import Salle from '../../Components/Salle/Salle'
import Tarif from '../../Components/Tarif/Tarif'


export default function Mulsanne() {

  useParams();

  const mulsanneUrl = document.location.href.split('/')[4];

  const [menu, setMenu] = useState(mulsanneUrl)  

  const changeMenu = (content) => {
    setMenu(content)
  }
  
  useEffect(() => {
    setMenu(mulsanneUrl)
  }, [mulsanneUrl])


  return (
    <div className='mulsanne'>
      <nav className='accueil-nav'>
        <ul>
          <Link to="/mulsanne/a-laffiche"><li onClick={() => changeMenu("a-laffiche")} className={menu === "a-laffiche" ? "active" : ""}>à l'affiche</li></Link>
          <Link to="/mulsanne/la-salle"><li onClick={() => changeMenu("la-salle")} className={menu === "la-salle" ? "active" : ""}>La salle</li></Link>
          <Link to="/mulsanne/tarifs"><li onClick={() => changeMenu("tarifs")} className={menu === "tarifs" ? "active" : ""}>Tarifs</li></Link>
          <Link to="/mulsanne/seances-speciales"><li onClick={() => changeMenu("seances-speciales")} className={menu === "seances-speciales" ? "active" : ""}>Séances spéciales</li></Link>
        </ul>
      </nav>

      <Outlet />

      {/* {
        menu === "films" &&
        <FilmList title="Mulsanne" />
      }

      {
        menu === "salle" &&
        <Salle photos={photosMulsanne} infos={infosMulsanne} />
      }

      {
        menu === "tarifs" &&
        <div className='mulsanne-tarifs'>
          {
            tarifsMulsanne.map(tarif => (
              <Tarif key={`${uuidv4()}-index`} tarif={tarif} />
            ))
          }
        </div>
      }

      {
        menu === "special" &&
        <FilmList title="Séances spéciales"/>
      } */}
    </div>
  )
}
