import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './WeekDateForm.scss'


export default function WeekDateForm(props) {  
  return (
    <form className='week-date-form' action="">
        <p>Semaine du </p>
        <input onChange={(e) => props.setDateDebut(e.target.value)} type="date" id='dateDebut' value={props.dateDebut ? props.dateDebut : ""}/>
        <p> au </p>
        <input onChange={(e) => props.setDateFin(e.target.value)} type="date" id='dateFin' value={props.dateFin ? props.dateFin : ""}/>
        <button onClick={(e) => props.putWeekDate(e)}>Valider</button>
    </form>
  )
}
