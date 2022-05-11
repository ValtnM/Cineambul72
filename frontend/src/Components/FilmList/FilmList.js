import React from 'react'
import './FilmList.scss'
import FilmListReducer from '../../redux/reducers/FilmListReducer'


export default function FilmList(props) {

    const filmList = FilmListReducer(undefined, [])

  return (
    <div className='film-list'>
        <h2>{props.title}</h2>
        <ul>
            {filmList.map(film => (
                <li><img src={film.img} /></li>
            ))}            
        </ul>
    </div>
  )
}
