import React, {useState} from 'react'
import FilmList from '../../Components/FilmList/FilmList'
import './Royal.scss'
import Salle from '../../Components/Salle/Salle'

export default function Royal() {

  const [menu, setMenu] = useState("salle")

  const photosRoyal = ['/royal/le-royal-cote.jpg','/royal/le-royal-facade.jpg'];
  const infosRoyal = {
    nom: "Cinéma Le Royal",
    rue: "409 avenue Félix Geneslay",
    ville: "72100 LE MANS",
    telephone: "02.43.84.58.62",
    photo: "/salles/royal/le-royal-facade.jpg"
  };

  const changeMenu = (content) => {
    setMenu(content)
  }

  return (
    <div className='royal'>
      <nav className='accueil-nav'>
        <ul>
          <li onClick={() => changeMenu("films")} className={menu === "films" ? "active" : ""}>à l'affiche</li>
          <li onClick={() => changeMenu("salle")} className={menu === "salle" ? "active" : ""}>La salle</li>
          <li onClick={() => changeMenu("tarifs")} className={menu === "tarifs" ? "active" : ""}>Tarifs</li>
          <li onClick={() => changeMenu("special")} className={menu === "special" ? "active" : ""}>Séances spéciales</li>
        </ul>
      </nav>

      {
        menu === "films" &&
        <FilmList title="Le Royal" />
      }

      {
        menu === "salle" &&
        <Salle photos={photosRoyal} infos={infosRoyal} />
      }
    </div>
  )
}
