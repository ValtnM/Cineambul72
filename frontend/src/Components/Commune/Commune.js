import React from 'react'
import './Commune.scss'
import Slider from '../Slider/Slider'

export default function Commune(props) {
  return (      
      <div className='commune'>
        <h3>{props.commune.nom}</h3>
        <div className="commune-salle">
          <img src={props.commune.photo} alt={`Salle de ${props.commune.nom}`} />
          <div className="salle-infos">
            <h4>{props.commune.salle.nom}</h4>
            <p>{props.commune.salle.rue}</p>
            <p>{props.commune.salle.commune}</p>
            <p>{props.commune.salle.contact}</p>
          </div>
        </div>
        <Slider dataSlider={props.commune.salle.photos} />
        <div className="commune-seances">
          {/* <hr /> */}
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
  )
}
