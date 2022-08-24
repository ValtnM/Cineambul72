import React from 'react'
import { Link } from 'react-router-dom'
import { useState ,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './FilmList.scss'
import {v4 as uuidv4} from 'uuid'

import MulsanneFilmListReducer from '../../redux/reducers/MulsanneFilmListReducer'
import RoyalFilmListReducer from '../../redux/reducers/RoyalFilmListReducer'
import CircuitFilmListReducer from '../../redux/reducers/CircuitFilmListReducer'
import AllFilmsListReducer from '../../redux/reducers/AllFilmsListReducer'


export default function FilmList(props) {

  
    // const [filmList, setFilmList] = useState();
    // const [circuitFilmList, setCircuitFilmList] = useState();
    // const [royalFilmList, setRoyalFilmList] = useState();
    // const [mulsanneFilmList, setMulsanneFilmList] = useState();
    const mulsanneFilmList = useSelector(state => state.MulsanneFilmListReducer)
    const royalFilmList = useSelector(state => state.RoyalFilmListReducer)
    const circuitFilmList = useSelector(state => state.CircuitFilmListReducer)
    const allFilmsList = useSelector(state => state.AllFilmsListReducer)

    const dispatch = useDispatch();


    let lieu = document.location.href.split("/")[3];
    
    useEffect(() => {
        if(lieu === "circuit-itinerant"){
          lieu = "circuit"
        } else if (lieu === "le-royal"){
          lieu = "royal"
        }
        console.log("ok");
        getAllFilmsList();
        getFilmList(lieu);
    }, [])


    const getAllFilmsList = () => {
      fetch("http://localhost:8080/api/film", {
        headers: {'Content-Type': 'application/json'},
      })
      .then((res) => {return res.json()})
      .then((data) => {
        sendAllData(data);   
      })
      .catch((err) => console.log(err))
    }

    const getFilmList = (lieuFilms) => {
      fetch(`http://localhost:8080/api/film/${lieuFilms}`, {
        headers: {'Content-Type': 'application/json'},
      })
      .then((res) => {return res.json()})
      .then((data) => {
        if(lieuFilms === "circuit"){
          sendCircuitData(data);
        } else if(lieuFilms === "royal"){
          sendRoyalData(data);
        } else if(lieuFilms === "mulsanne"){
          sendMulsanneData(data);
        }
      })
      .catch((err) => console.log(err))
    }

    const sendAllData = (data) => {
      dispatch({
        type: "ADDALLDATA",
        payload: data
      })
    }
    const sendCircuitData = (data) => {
      dispatch({
        type: "ADDCIRCUITDATA",
        payload: data
      })
    }
    const sendRoyalData = (data) => {
      dispatch({
        type: "ADDROYALDATA",
        payload: data
      })
    }
    const sendMulsanneData = (data) => {
      dispatch({
        type: "ADDMULSANNEDATA",
        payload: data
      })
    }
    

    
  return (
    <div key={uuidv4()} className='film-list'>
        <h2>{props.title}</h2>
        {
          circuitFilmList && lieu === "circuit-itinerant" &&
          <ul>
            {circuitFilmList.map((film,index) => (          
              <Link to={`/film/${film.id}/bande-annonce`}><li style={{animationDelay: `${index * 0.2}s`}} ><img src={film.afficheUrl} alt={film.titre} /></li></Link>                
              ))}            
        </ul>
        }
        {
          royalFilmList && lieu === "le-royal" &&
          // royalFilmList1 && 
          <ul>
            {royalFilmList.map((film,index) => (          
              <Link to={`/film/${film.id}/bande-annonce`}><li style={{animationDelay: `${index * 0.2}s`}}><img src={film.afficheUrl} alt={film.titre} /></li></Link>                
              ))}            
        </ul>
        }
        {
          mulsanneFilmList && lieu === "mulsanne" &&
          <ul>
            {mulsanneFilmList.map((film,index) => (          
              <Link to={`/film/${film.id}/bande-annonce`}><li style={{animationDelay: `${index * 0.15}s`}}><img src={film.afficheUrl} alt={film.titre} /></li></Link>                
              ))}            
        </ul>
        }
        {
          allFilmsList && lieu === "liste-films" &&
          <ul>
            {allFilmsList.map((film,index) => (          
              <Link to={`/film/${film.id}/bande-annonce`}><li style={{animationDelay: `${index * 0.15}s`}}><img src={film.afficheUrl} alt={film.titre} /></li></Link>                
              ))}            
          </ul>
        }
    </div>
  )
}
