import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import './FilmList.scss'
import {v4 as uuidv4} from 'uuid'
import FilmListReducer from '../../redux/reducers/FilmListReducer'


export default function FilmList(props) {

    const filmList = FilmListReducer(undefined, [])

    
  return (
    <div className='film-list'>
        <h2>{props.title}</h2>
        <ul>
            {filmList.map(film => (          
              <Link to="/film/bande-annonce"><li key={uuidv4()}><img src={film.img} alt={film.title} /></li></Link>                
            ))}            
        </ul>
    </div>
  )
}
