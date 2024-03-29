import React from 'react'
import {v4 as uuidv4} from 'uuid'
import './CommuneList.scss'

export default function CommuneList(props) {

  return (
    <div className="communes">
        <select onChange={(e) => props.getInfosCommune(e)} name="communes" value={props.communeSelected ? props.communeSelected.nom : "Sélectionnez une commune"}>
        <option key={uuidv4()} value="undefined">Sélectionner une commune</option>
        {props.communeList.map(commune => (
            <option key={uuidv4()} value={commune.nom}>{commune.nom}</option>
            ))}
        </select>        
        
    </div>
  )
}
