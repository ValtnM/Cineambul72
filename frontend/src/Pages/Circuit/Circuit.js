import React, {useState, useEffect} from 'react'
import './Circuit.scss'
import { Link, Outlet, useParams } from 'react-router-dom'
import Message from '../../Components/Message/Message';
// import FilmList from '../../Components/FilmList/FilmList'
// import Commune from '../../Components/Commune/Commune'
// import Tarif from '../../Components/Tarif/Tarif'
// import {v4 as uuidv4} from 'uuid'

export default function Circuit() {

  useParams();

  const circuitUrl = document.location.href.split('/')[4];

  const [menu, setMenu] = useState()

  // console.log(document.location.href.split('/')[4]);  

  useEffect(() => {
    setMenu(circuitUrl)
  }, [circuitUrl])
   

  return (
    <div className='circuit'>
      <Message pageName='circuit'></Message>
      <nav className='accueil-nav'>
        <ul>
          <Link to="/circuit-itinerant" className={menu === undefined ? 'active' : ''}><li>Par films</li></Link>
          <Link to="/circuit-itinerant/par-communes" className={menu === "par-communes" ? 'active' : ''} ><li >Par Communes</li></Link>
          <Link to="/circuit-itinerant/tarifs" className={menu === "tarifs" ? 'active' : ''}><li >Tarifs</li></Link>
          {/* <NavLink to="/circuit-itinerant/seances-speciales" ><li onClick={() => setMenu("seances-speciales")}  isActiveClassName="active">Spécial</li></NavLink> */}
        </ul>
      </nav>

      <Outlet className="outlet" />

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
