import React from 'react'
import './Evenements.scss'
import FilmList from '../../Components/FilmList/FilmList'

export default function Evenements() {
  return (
    <div className='evenements'>
        <FilmList title="Séances évènements"></FilmList>
    </div>
  )
}
