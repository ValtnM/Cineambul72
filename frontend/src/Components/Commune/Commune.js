import React, {useState} from 'react'
import './Commune.scss'
import { Link, Outlet, useParams } from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import CommuneListReducer from '../../redux/reducers/CommuneListReducer'
import Slider from '../Slider/Slider'

export default function Commune() {  


  const [communeSelected, setCommuneSelected] = useState();

  const getCommune = (value) => {
    communeList.forEach(element => {
      if(element.nom === value) {
        setCommuneSelected(element);
      }
    });
  }

  const communeList = CommuneListReducer(undefined, []);

  


  return (  
    <div>
      <div className="communes">
        <select onChange={(e) => getCommune(e.target.options[e.target.selectedIndex].text)} name="communes">
          <option key={uuidv4()} value="Null">Sélectionner une commune</option>
          {communeList.map(commune => (
            <option key={uuidv4()} value={commune}>{commune.nom}</option>
            ))}
        </select>        
        
      </div>
    {
      communeSelected &&
      <div className='commune'>
      <h3>{communeSelected.nom}</h3>
        <div className="commune-salle">
            <h4>{communeSelected.salle.nom}</h4>
            <p>{communeSelected.salle.rue}</p>
            <p>{communeSelected.salle.commune}</p>
            <p>{communeSelected.salle.contact}</p>
        </div>
        <Slider dataSlider={communeSelected.salle.photos} />
        <div className="commune-seances">
          <h4>Films à l'affiche</h4>
          <div className='commune-seances__films'>
            <img src="/affiches/bruno-reidal.jpg" alt="" />
            <img src="/affiches/bruno-reidal.jpg" alt="" />
            <img src="/affiches/bruno-reidal.jpg" alt="" />
            <img src="/affiches/bruno-reidal.jpg" alt="" />
            <img src="/affiches/bruno-reidal.jpg" alt="" />
          </div>
        </div>
        </div>   
      }    
    </div>
  )
}
