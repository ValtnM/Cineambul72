import React from 'react'
import './Tarif.scss'
import {v4 as uuidv4} from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Tarif({tarif}) {


  return (

    <div className='circuit-tarifs'>
      {
      tarif.map(tarif => (
        // <Tarif key={uuidv4()} tarif={tarif}/>
    
      <div key={uuidv4()} className='tarif'>
          <FontAwesomeIcon className='icon' icon={tarif.icone} />
          <h3>{tarif.nom}</h3>
          <h3>{tarif.prix}</h3>
          {
            tarif.description !== [] &&
            <ul>
              {tarif.description.map(item => (
                <li key={uuidv4()}>{item}</li>
              ))}
            </ul>
          }
      </div>
      ))
      }          
    </div>   
  )
}
