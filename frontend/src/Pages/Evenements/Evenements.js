import React from 'react'
import './Evenements.scss'
import Message from '../../Components/Message/Message'
import FilmList from '../../Components/FilmList/FilmList'

export default function Evenements() {
  return (
    <div className='evenements'>
        <Message pageName="evenements"></Message>
        <FilmList title="Séances évènements"></FilmList>
    </div>
  )
}
