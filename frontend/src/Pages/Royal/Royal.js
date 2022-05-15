import React, {useState} from 'react'
import FilmList from '../../Components/FilmList/FilmList'
import './Royal.scss'
import {v4 as uuidv4} from 'uuid'
import Salle from '../../Components/Salle/Salle'
import Tarif from '../../Components/Tarif/Tarif'
import { faTicket } from '@fortawesome/free-solid-svg-icons'
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'

export default function Royal() {

  const [menu, setMenu] = useState("tarifs")

  const photosRoyal = ['/royal/le-royal-facade.jpg', '/royal/le-royal-cote.jpg'];
  const infosRoyal = {
    nom: "Cinéma Le Royal",
    rue: "409 avenue Félix Geneslay",
    ville: "72100 LE MANS",
    telephone: "02.43.84.58.62",
  };
  const tarifsRoyal = [
    {
      icone: faTicket,
      nom: "Tarif Plein",
      prix: "5,80 €",
      description: []
    },
    {
      icone: faCircleArrowDown,
      nom: "Tarif Réduit",
      prix: "4,20 €",
      description: ["Demandeurs d'emploi", "Étudiants", "Moins de 12 ans", "Carte MJC", "Carte Cézam"]
    },
    {
      icone: faPeopleGroup,
      nom: "Carnet",
      prix: "42,00 €",
      description: ["11 places", "Non nominatif", "Durée illimitée"]
    }
  ]


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

      {
        menu === "tarifs" &&
        <div className='royal-tarifs'>
          {
            tarifsRoyal.map(tarif => (
              <Tarif key={uuidv4()} tarif={tarif} />
            ))
          }
          {/* <Tarif tarif={tarifsRoyal[0]} /> */}
        </div>
      }
    </div>
  )
}
