import React, {useState} from 'react'
import './Circuit.scss'
import FilmList from '../../Components/FilmList/FilmList'
import CommuneListReducer from '../../redux/reducers/CommuneListReducer'
import Commune from '../../Components/Commune/Commune'
import {v4 as uuidv4} from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicket } from '@fortawesome/free-solid-svg-icons'
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'

export default function Circuit() {

  const [menu, setMenu] = useState("films")

  const [commune, setCommune] = useState();

  const changeMenu = (content) => {
    setMenu(content)
  }

  const communeList = CommuneListReducer(undefined, []);

  const getCommune = (value) => {
    communeList.forEach(element => {
      if(element.nom === value) {
        setCommune(element);
      }
    });
  }
   

  return (
    <div className='circuit'>
      <nav className='accueil-nav'>
        <ul>
          <li onClick={() => changeMenu("films")} className={menu === "films" ? "active" : ""}>Par films</li>
          <li onClick={() => changeMenu("communes")} className={menu === "communes" ? "active" : ""}>Par communes</li>
          <li onClick={() => changeMenu("tarifs")} className={menu === "tarifs" ? "active" : ""}>Tarifs</li>
          <li onClick={() => changeMenu("special")} className={menu === "special" ? "active" : ""}>Séances spéciales</li>
        </ul>
      </nav>

      {
        menu === 'films' && 
        <FilmList title="Circuit itinérant" />
      }

      {
        menu === 'communes' &&
      <div className="communes">
        <select onChange={(e) => getCommune(e.target.options[e.target.selectedIndex].text)} name="communes">
          <option key={uuidv4()} value="Null">Sélectionner une commune</option>
          {communeList.map(commune => (
            <option key={uuidv4()} value={commune}>{commune.nom}</option>
            ))}
        </select>
        {commune && 
          <Commune commune={commune} />
        }
      </div>
      }

      {
        menu === 'tarifs' &&
        <div className='circuit-tarifs'>
          {/* <h2>Tarifs</h2> */}
          {/* <div className='circuit-tarifs-block'> */}
          <div className="circuit-tarifs-plein">
            <FontAwesomeIcon className='icon' icon={faTicket} />
            <h5>Tarif plein</h5>
            <p>4,50 €</p>
          </div>
          <div className="circuit-tarifs-groupe">
            <FontAwesomeIcon className='icon' icon={faPeopleGroup} />
            <h5>Tarif de groupe</h5>
            <p>3,50 €</p>
          </div>
        </div>
        // </div>
      }
    </div>
  )
}
