import React from 'react'
import './WeekDateForm.scss'

export default function WeekDateForm(props) {
  return (
    <form className='week-date-form' action="">
        {/* <label htmlFor="dateDebut">Date de début :</label> */}
        <p>Semaine du </p>
        <input onChange={(e) => props.setDateDebut(e.target.value)} type="date" id='dateDebut' value={props.dateDebut}/>
        {/* <label htmlFor="dateFin">Date de fin :</label> */}
        <p> au </p>
        <input onChange={(e) => props.setDateFin(e.target.value)} type="date" id='dateFin' value={props.dateFin}/>
        <button onClick={(e) => props.putWeekDate(e)}>Valider</button>
    </form>
  )
}
