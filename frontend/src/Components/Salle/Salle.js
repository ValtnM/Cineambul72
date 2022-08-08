import React from 'react'
import './Salle.scss'
import Slider from '../Slider/Slider'

export default function Salle(props) {
  return (
    <div className='salle'>
        <div className="salle-infos">
            <h3>{props.infos.nom}</h3>
            <p>{props.infos.rue}</p>
            <p>{props.infos.ville}</p>
            <p>{props.infos.telephone}</p>
        </div>
        <Slider className="salle-slider" dataSlider={props.infos.photos} />
    </div>
  )
}
