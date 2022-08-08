import React, {useState, useEffect} from 'react'
import './Circuit.scss'
import { Link, Outlet, useParams } from 'react-router-dom'
// import FilmList from '../../Components/FilmList/FilmList'
// import Commune from '../../Components/Commune/Commune'
// import Tarif from '../../Components/Tarif/Tarif'
// import {v4 as uuidv4} from 'uuid'

export default function Circuit() {

  useParams();

  const circuitUrl = document.location.href.split('/')[4];

  const [menu, setMenu] = useState(circuitUrl)

  // console.log(document.location.href.split('/')[4]);
  

  const changeMenu = (content) => {
    setMenu(content)
  } 

  useEffect(() => {
    setMenu(circuitUrl)
  }, [circuitUrl])
   

  return (
    <div className='circuit'>
      <nav className='accueil-nav'>
        <ul>
          <Link to="/circuit-itinerant/par-films" ><li onClick={() => changeMenu("par-films")} className={menu === "par-films" ? "active" : ""}>Par films</li></Link>
          <Link to="/circuit-itinerant/par-communes" ><li onClick={() => changeMenu("par-communes")} className={menu === "par-communes" ? "active" : ""}>Par Communes</li></Link>
          <Link to="/circuit-itinerant/tarifs" ><li onClick={() => changeMenu("tarifs")} className={menu === "tarifs" ? "active" : ""}>Tarifs</li></Link>
          <Link to="/circuit-itinerant/seances-speciales" ><li onClick={() => changeMenu("seances-speciales")} className={menu === "seances-speciales" ? "active" : ""}>Spécial</li></Link>
        </ul>
      </nav>

      <Outlet />

      {/* {
        menu === 'films' && 
        <FilmList title="Circuit itinérant" />
      } */}

      {/* {
        menu === 'communes' &&
      <div className="communes">
        <select onChange={(e) => getCommune(e.target.options[e.target.selectedIndex].text)} name="communes">
          <option key={uuidv4()} value="Null">Sélectionner une commune</option>
          {communeList.map(commune => (
            <option key={uuidv4()} value={commune}><Link to="/circuit-itinerant/par-films/communeUrl" >{commune.nom}</Link></option>
            ))}
        </select>
        {commune && 
          <Commune commune={commune} />
        }
      </div>
      } */}

      {/* {
        menu === 'tarifs' &&
        <div className='circuit-tarifs'>
          {
          tarifsCircuit.map(tarif => (
            <Tarif key={uuidv4()} tarif={tarif}/>
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
