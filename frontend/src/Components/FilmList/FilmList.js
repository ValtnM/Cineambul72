import React from 'react'
import { Link } from 'react-router-dom'
import { useState ,useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './FilmList.scss'
import {v4 as uuidv4} from 'uuid'

import MulsanneFilmListReducer from '../../redux/reducers/MulsanneFilmListReducer'
import RoyalFilmListReducer from '../../redux/reducers/RoyalFilmListReducer'
import CircuitFilmListReducer from '../../redux/reducers/CircuitFilmListReducer'


export default function FilmList(props) {

    // const [filmList, setFilmList] = useState();
    // const [circuitFilmList, setCircuitFilmList] = useState();
    // const [royalFilmList, setRoyalFilmList] = useState();
    // const [mulsanneFilmList, setMulsanneFilmList] = useState();
    const mulsanneFilmList = useSelector(state => state.MulsanneFilmListReducer)
    const royalFilmList = useSelector(state => state.RoyalFilmListReducer)
    const circuitFilmList = useSelector(state => state.CircuitFilmListReducer)

    const dispatch = useDispatch();


    let lieu = document.location.href.split("/")[3];
    // useEffect(() => {
    //   console.log(royalFilmList1)
    // }, royalFilmList1)
    
    useEffect(() => {
      // if(circuitFilmList === undefined && royalFilmList === undefined && mulsanneFilmList === undefined){
        if(lieu === "circuit-itinerant"){
          lieu = "circuit"
        } else if (lieu === "le-royal"){
          lieu = "royal"
        }
        // console.log(document.location.href.split("/")[3]);
        console.log("OK");
        // getFilmList("circuit");
        getFilmList(lieu);
        // getFilmList("mulsanne");      
        // console.log(mulsanneFilmList1);
        // }
    }, [])


    const getFilmList = (lieuFilms) => {
      // if(lieu === "circuit-itinerant"){
      //   lieu = "circuit"
      // } else if (lieu === "le-royal"){
      //   lieu = "royal"
      // }
      fetch(`http://localhost:8080/api/film/${lieuFilms}`, {
        headers: {'Content-Type': 'application/json'},
      })
      .then((res) => {return res.json()})
      .then((data) => {
        if(lieuFilms === "circuit"){
          sendCircuitData(data);
        } else if(lieuFilms === "royal"){
          // setRoyalFilmList(data);
          sendRoyalData(data);
        } else if(lieuFilms === "mulsanne"){
          // setMulsanneFilmList(data)
          sendMulsanneData(data);
        }
        // setFilmList(data)      
      })
      .catch((err) => console.log(err))
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

    // const getCircuitFilms = () => {
    //   fetch('http://localhost:8080/api/film/circuit',{
    //     headers: {'Content-Type': 'application/json'}
    //   })
    //   .then(res => res.json())
    //   .then(data => setCircuitFilmList(data))
    //   .catch(err => console.log(err))
    // }

    // const getRoyalFilmList = () => {
    //   fetch('http://localhost:8080/api/film/royal',{
    //     headers: {'Content-Type': 'application/json'}
    //   })
    //   .then(res => res.json())
    //   .then(data => setRoyalFilmList(data))
    //   .catch(err => console.log(err))
    // }

    // const getMulsanneFilmsList = () => {
    //   fetch('http://localhost:8080/api/film/mulsanne',{
    //     headers: {'Content-Type': 'application/json'}
    //   })
    //   .then(res => res.json())
    //   .then(data => setMulsanneFilmList(data))
    //   .catch(err => console.log(err))
    // }
    // const sortFilms = (filmsList) => {
    //   let sortedList = [];
    //   filmsList.forEach(film => {
    //     // let filmId = film.Film.id
    //     if(film.Film === sorted){
    //       console.log('TRUE');
    //     } else {
    //     sortedList.push({
    //       ...film.Film
    //     })
        
    //   });
    
    // if(circuitFilmList === undefined && royalFilmList === undefined && mulsanneFilmList === undefined){
    //   // console.log(document.location.href.split("/")[3]);
    //   console.log("OK");
    //   getFilmList("circuit");
    //   getFilmList("royal");
    //   getFilmList("mulsanne"); 
    //   console.log(royalFilmList);     
    // }
    
  return (
    <div key={uuidv4()} className='film-list'>
        <h2>{props.title}</h2>
        {
          circuitFilmList && lieu === "circuit-itinerant" &&
          <ul>
            {circuitFilmList.map((film,index) => (          
              <Link to={`/film/${film.id}/bande-annonce`}><li style={{animationDelay: `${index * 0.2}s`}} key={uuidv4()}><img src={film.afficheUrl} alt={film.titre} /></li></Link>                
              ))}            
        </ul>
        }
        {
          royalFilmList && lieu === "le-royal" &&
          // royalFilmList1 && 
          <ul>
            {royalFilmList.map((film,index) => (          
              <Link to={`/film/${film.id}/bande-annonce`}><li style={{animationDelay: `${index * 0.2}s`}} key={uuidv4()}><img src={film.afficheUrl} alt={film.titre} /></li></Link>                
              ))}            
        </ul>
        }
        {
          mulsanneFilmList && lieu === "mulsanne" &&
          <ul>
            {mulsanneFilmList.map((film,index) => (          
              <Link to={`/film/${film.id}/bande-annonce`}><li style={{animationDelay: `${index * 0.15}s`}} key={uuidv4()}><img src={film.afficheUrl} alt={film.titre} /></li></Link>                
              ))}            
        </ul>
        }
    </div>
  )
}
