import React from 'react'
import { useState, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid'
import './CommuneList.scss'

export default function CommuneList(props) {

  // const [communeList, setCommuneList] = useState();


  //   useEffect(() => {
  //       // console.log(communeSelected);
  //       getCommunesList()
  //     }, [])

  //     useEffect(() => {
  //       modifyCommuneList(commune)
  //     }, [communeList])

  //   const getCommunesList = () => {
  //       fetch('http://localhost:8080/api/commune')
  //       .then(res => {
  //         return res.json()
  //       })
  //       .then(data => {
  //         setCommuneList(data)
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  //     }

  return (
    <div className="communes">
        <select onChange={(e) => props.getInfosCommune(e.target.options[e.target.selectedIndex].text)} name="communes">
        <option key={uuidv4()} value="Null">Sélectionner une commune</option>
        {props.communeList.map(commune => (
            <option key={uuidv4()} value={commune.nom}>{commune.nom}</option>
            ))}
        </select>        
        
    </div>
  )
}
