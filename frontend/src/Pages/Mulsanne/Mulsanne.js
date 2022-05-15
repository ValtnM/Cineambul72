import React, {useState} from 'react'
import FilmList from '../../Components/FilmList/FilmList'
import './Mulsanne.scss'
import {v4 as uuidv4} from 'uuid'
import Salle from '../../Components/Salle/Salle'
import Tarif from '../../Components/Tarif/Tarif'
import { faTicket } from '@fortawesome/free-solid-svg-icons'
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { faChild } from '@fortawesome/free-solid-svg-icons'

export default function Mulsanne() {

  const [menu, setMenu] = useState("films")

  const photosMulsanne = ['/mulsanne/mulsanne-entree.jpg', '/mulsanne/mulsanne-interieur.jpg'];
  const infosMulsanne = {
    nom: "Centre Socio-Culturel Simone Signoret",
    rue: "Avenue de Bönen",
    ville: "72230 Mulsanne",
    telephone: "02.43.42.20.25",
  };
  const tarifsMulsanne = [
    {
      icone: faTicket,
      nom: "Tarif Plein",
      prix: "5,80 €",
      description: []
    },
    {
      icone: faCircleArrowDown,
      nom: "Tarif Réduit",
      prix: "4,80 €",
      description: ["Demandeurs d'emploi", "Étudiants", "Plus de 70 ans"]
    },
    {
      icone: faChild,
      nom: "Tarif Enfant",
      prix: "4,00 €",
      description: ["Moins de 14 ans"]
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
    <div className='mulsanne'>
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
      }
    </div>
  )
}
