import React from 'react'
import { Link } from 'react-router-dom'
import { useState ,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './FilmList.scss'
import '../../assets/animations.scss'
import {v4 as uuidv4} from 'uuid'

import MulsanneFilmListReducer from '../../redux/reducers/MulsanneFilmListReducer'
import RoyalFilmListReducer from '../../redux/reducers/RoyalFilmListReducer'
import CircuitFilmListReducer from '../../redux/reducers/CircuitFilmListReducer'
import AllFilmsListReducer from '../../redux/reducers/AllFilmsListReducer'
import SpecialFilmListReducer from '../../redux/reducers/SpecialFilmListReducer'
import DatesSemaineReducer from '../../redux/reducers/DatesSemaineReducer'
import EventListReducer from '../../redux/reducers/EventListReducer'


export default function FilmList(props) {

    const [weekFilmList, setWeekFilmList] = useState();
    const [communeFilmList, setCommuneFilmList] = useState();
    const [byCommune, setByCommune] = useState(false)
  
    const mulsanneFilmList = useSelector(state => state.MulsanneFilmListReducer)
    const royalFilmList = useSelector(state => state.RoyalFilmListReducer)
    const circuitFilmList = useSelector(state => state.CircuitFilmListReducer)
    const allFilmsList = useSelector(state => state.AllFilmsListReducer)
    const specialFilmList = useSelector(state => state.SpecialFilmListReducer)
    const eventList = useSelector(state => state.EventListReducer)
    
    const datesSemaine = useSelector(state => state.DatesSemaineReducer)

    const dispatch = useDispatch();

    let lieu = document.location.href.split("/")[3];
    let typeEvenement = document.location.href.split("/")[4];
    
    
    useEffect(() => {    
        formatLieu();    
        checkByCommune();
        getAllFilmsList();
        getFilmList(lieu);
        getSpecialFilms();
        getAllEvent();
        getFilmWeek();
        if (props.communeSelected) {
          getFilmCommune(props.communeSelected.id)          
        }
      }, [])
      
    useEffect(() => {
      getFilmWeek();
    }, [datesSemaine])    

      
    // Récupération des films d'une commune
    const getFilmCommune = (communeId) => {
      setCommuneFilmList("");
      fetch(`https://cineambul72.fr/api/film/commune/${communeId}`, {
        method: "GET",
        headers: {'Content-Type': 'application/json'},      
      })
      .then(res => res.json())
      .then(data => setCommuneFilmList(data))
      .catch(err => console.log(err))
    }

    // Vérification de l'URL
    const checkByCommune = () => {
      if(document.location.href.split("/")[4] === "par-communes"){
        setByCommune(true)
      } else {
        setByCommune(false)
      }
    }

    // Formatage du lieu
    const formatLieu = () => {
      if(lieu === "circuit-itinerant"){
        lieu = "circuit"
      } else if (lieu === "le-royal"){
        lieu = "royal"
      }
    }

    // Récupération de la liste des films de la semaine en cours
    const getFilmWeek = () => {
      fetch(`https://cineambul72.fr/api/film/semaine`, {
        method: "GET",
        headers: {'Content-Type': 'application/json'},      
      })
      .then(res => res.json())
      .then(data => setWeekFilmList(data))
      .catch(err => console.log(err))
    }

    // Récupération de la liste de tous les films dans la BDD
    const getAllFilmsList = () => {
      fetch("https://cineambul72.fr/api/film", {
        headers: {'Content-Type': 'application/json'},
      })
      .then((res) => {return res.json()})
      .then((data) => sendAllData(data))
      .catch((err) => console.log(err))
    }

    // Récupération de la liste des films selon le lieu
    const getFilmList = (lieuFilms) => {
      fetch(`https://cineambul72.fr/api/film/${lieuFilms}`, {
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

    // Récupération de la liste des films spéciaux dans la BDD
    const getSpecialFilms = () => {
      fetch('https://cineambul72.fr/api/film/special', {
        method: "GET",
        headers: {'Content-Type': 'application/json'},
      })
      .then(res => res.json())
      .then(data => sendSpecialData(data))
      .catch(err => console.log(err))
    }

    // Récupération des tous les évènements
    const getAllEvent = () => {
      fetch('https://cineambul72.fr/api/evenement', {
        method: "GET",
        headers: {'Content-Type': 'application/json'},
      })
      .then(res => res.json())
      .then(data => sendEventData(data))
      .catch(err => console.log(err))
    }

    // Modification du state contenant la liste de tous les films
    const sendAllData = (data) => {
      dispatch({
        type: "ADDALLDATA",
        payload: data
      })
    }

    // Modification du state contenant la liste des films du circuit
    const sendCircuitData = (data) => {
      dispatch({
        type: "ADDCIRCUITDATA",
        payload: data
      })
    }

    // Modification du state contenant la liste des films du Royal
    const sendRoyalData = (data) => {
      dispatch({
        type: "ADDROYALDATA",
        payload: data
      })
    }
  
  // Modification du state contenant la liste des films de Mulsanne
  const sendMulsanneData = (data) => {
    dispatch({
      type: "ADDMULSANNEDATA",
      payload: data
    })
  }

  // Modification du state contenant la liste des films spéciaux
  const sendSpecialData = (data) => {
    dispatch({
      type: "ADDSPECIALDATA",
      payload: data
    })
  }

  // Modification du state contenant la liste des films spéciaux
  const sendEventData = (data) => {
    dispatch({
      type: "ADDEVENTDATA",
      payload: data
    })
  }
    

    
  return (
    <div key={document.location.href} className='film-list'>
        {
          props.title &&
          <h2>{props.title}</h2>
        }
        {
          circuitFilmList && lieu === "circuit-itinerant" && !byCommune &&
          <div>
            {
              circuitFilmList.length > 0 ?
              <ul>
                {circuitFilmList.map((film,index) => (          
                  <Link to={`/film/${film.id}/circuit-itinerant`} key={uuidv4()}><li style={{animationDelay: `${index * 0.1}s`}} ><img src={film.afficheUrl} alt={film.titre} /></li></Link>                
                  ))}            
              </ul>
              :
              <div className='not-film'>Aucun film programmé actuellement</div>
            }
          </div>  
        }
        {
          royalFilmList && lieu === "le-royal" &&
          <div>
            {
              royalFilmList.length > 0 ?
              <ul>
                {royalFilmList.map((film,index) => (          
                  <Link to={`/film/${film.id}/circuit-itinerant`} key={uuidv4()}><li style={{animationDelay: `${index * 0.1}s`}} ><img src={film.afficheUrl} alt={film.titre} /></li></Link>                
                  ))}            
              </ul>
              :
              <div className='not-film'>Aucun film programmé actuellement</div>
            }
          </div>  
        }
        {
          mulsanneFilmList && lieu === "mulsanne" &&
          <div>
            {
              mulsanneFilmList.length > 0 ?
              <ul>
                {mulsanneFilmList.map((film,index) => (          
                  <Link to={`/film/${film.id}/circuit-itinerant`} key={uuidv4()}><li style={{animationDelay: `${index * 0.1}s`}} ><img src={film.afficheUrl} alt={film.titre} /></li></Link>                
                  ))}            
              </ul>
              :
              <div className='not-film'>Aucun film programmé actuellement</div>
            }
          </div>  
        }
        {
          allFilmsList && lieu === "admin" &&
          <div>
            {
              allFilmsList.length > 0 ?
              <ul>
                {allFilmsList.map((film,index) => (          
                  <Link to={`/film/${film.id}/circuit-itinerant`} key={uuidv4()}><li style={{animationDelay: `${index * 0.1}s`}} ><img src={film.afficheUrl} alt={film.titre} /></li></Link>                
                  ))}            
              </ul>
              :
              <div className='not-film'>Aucun film programmé actuellement</div>
            }
          </div>  
        }
        {
          eventList && lieu === "evenements" && typeEvenement !== "seances-speciales" &&
          <div>
            {/* <ul>
              <Link to="/evenement/1"><li><img src="https://www.alentoor.fr/photos/classifieds/ea/24/ea2423b1dfe2749fdb2f883eefd087bd8dd686a73f30c72ea40ed37f85a709c4-large.jpg" alt="" /></li></Link>
            </ul> */}
            {
              eventList.length > 0 ?
              <ul>
                {eventList.map((event,index) => (          
                  <Link to={`/evenement/${event.id}`} key={uuidv4()}><li style={{animationDelay: `${index * 0.1}s`}} ><img src={event.affiche} alt={event.titre} /></li></Link>                
                  ))}            
              </ul>
              :
              <div className='not-film'>Aucun film programmé actuellement</div>
            }
          </div>  
        }
        {
          specialFilmList && lieu === "evenements" && typeEvenement === "seances-speciales" &&
          <div>
            {
              specialFilmList.length > 0 ?
              <ul>
                {specialFilmList.map((film,index) => (          
                  <Link to={`/film/${film.id}`} key={uuidv4()}><li style={{animationDelay: `${index * 0.1}s`}} ><img src={film.afficheUrl} alt={film.titre} /></li></Link>                
                  ))}            
              </ul>
              :
              <div className='not-film'>Aucun film programmé actuellement</div>
            }
          </div>  
        }
        {
          weekFilmList && lieu.length === 0 &&
          <div>
            {
              weekFilmList.length > 0 ?
              <ul>
                {weekFilmList.map((film,index) => (          
                  <Link to={`/film/${film.id}/circuit-itinerant`} key={uuidv4()}><li style={{animationDelay: `${index * 0.1}s`}} ><img src={film.afficheUrl} alt={film.titre} /></li></Link>                
                  ))}            
              </ul>
              :
              <div className='not-film'>Aucun film programmé actuellement</div>
            }
          </div>  
        }
        {
          communeFilmList && lieu === "circuit-itinerant" &&
          <div>
            {
              communeFilmList.length > 0 ?
              <ul>
                {communeFilmList.map((film,index) => (          
                  <Link to={`/film/${film.id}/circuit-itinerant`} key={uuidv4()}><li style={{animationDelay: `${index * 0.1}s`}} ><img src={film.afficheUrl} alt={film.titre} /></li></Link>                
                  ))}            
              </ul>
              :
              <div className='not-film'>Aucun film programmé actuellement</div>
            }
          </div>  
        }  
    </div>
  )
}
