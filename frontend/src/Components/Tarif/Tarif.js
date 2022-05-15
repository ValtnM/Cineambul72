import React from 'react'
import './Tarif.scss'
import {v4 as uuidv4} from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Tarif(props) {
  return (
    <div className='tarif'>
        <FontAwesomeIcon className='icon' icon={props.tarif.icone} />
        <h3>{props.tarif.nom}</h3>
        <h3>{props.tarif.prix}</h3>
        {
          props.tarif.description !== [] &&
          <ul>
            {props.tarif.description.map(item => (
              <li key={uuidv4}>{item}</li>
            ))}
          </ul>
        }
    </div>
  )
}
