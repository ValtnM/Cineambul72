import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import "./FilmDetails.scss"
import {v4 as uuidv4} from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'
import CommuneList from '../../Components/CommuneList/CommuneList';

import SeanceListReducer from '../../redux/reducers/SeanceListReducer';
import RoyalSeanceListReducer from '../../redux/reducers/RoyalSeanceListReducer';
import MulsanneSeanceListReducer from '../../redux/reducers/MulsanneSeanceListReducer';

export default function FilmDetails() {
    
    const circuitUrl = document.location.href.split('/')[5];
    
    
    const [menu, setMenu] = useState(circuitUrl)
    //   const [admin, setAdmin] = useState(true)
    const admin = true; 
    const [lieu, setLieu] = useState("circuit")
    const [filmDetails, setFilmDetails] = useState()
    const [communeList, setCommuneList] = useState();
    const [communeSelected, setCommuneSelected] = useState();

    const {filmId} = useParams()
  

  const changeMenu = (content) => {
    setMenu(content)
  } 

  useEffect(() => {
    setMenu(circuitUrl)
  }, [circuitUrl])

  
  const changeLieu = (value) => {
      setLieu(value)
    }
    
    
    useEffect(() => {
        getInfosFilm();
        getCommunesList();
        console.log(circuitUrl);
        // getDetailsFilm();
        // getCasting()
  }, [])  

    const getInfosFilm = () => {
        fetch(`http://localhost:8080/api/film/${filmId}`, {
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => setFilmDetails(data))
        .catch(err => console.log(err))
    }


// Récupération des informations de la commune selectionnée
const getInfosCommune = (value) => {
    communeList.forEach(element => {
        if(element.nom === value) {
        setCommuneSelected(element);
        }
    });
}
  
// Récupération de la liste des communes
const getCommunesList = () => {
    fetch('http://localhost:8080/api/commune')
    .then(res => {
        return res.json()
    })
    .then(data => {
        console.log(data);
        setCommuneList(data)
    })
    .catch(err => {
        console.log(err)
    })
}
  

  const seanceList = SeanceListReducer(undefined, [])
  const royalSeanceList = RoyalSeanceListReducer(undefined, [])
  const mulsanneSeanceList = MulsanneSeanceListReducer(undefined, [])




//   const getCommune = (value) => {
//     communeList.forEach(element => {
//       if(element.nom === value) {
//         setCommuneSelected(element);
//       }
//     });
//   }

  const showURL = (e) => {
    e.preventDefault();
  }




  return (
    <div className='film-details'>
        {
            filmDetails && 
        <div className="details">           
            <img src={filmDetails.afficheUrl} alt="" />            
            <div className="infos">
                <h2>{filmDetails.titre}</h2>
                <div className='infos-technique'>
                    <p className='date'>{filmDetails.dateSortie}</p>
                    <p className='genre'>{filmDetails.genre}</p>
                    <p className='duree'>{filmDetails.duree}</p>
                </div>
                <div className="realisateur"><span>Par : </span>{filmDetails.realisateur}</div>
                {
                    filmDetails.casting &&
                    <div className="casting"><span>Avec : </span>{filmDetails.casting}</div>
                }
                <div className="synopsis">
                    <h3>Synopsis</h3>
                    <p>{filmDetails.synopsis}</p>
                </div>
                
            </div>
        </div>
        }
        <div className="seances">

            {
                admin && 
                <div className='seance-form'>
                    <h2>Ajouter une séance</h2>
                    <form action="">
                        <div className='lieu'>
                            <label htmlFor="circuit">Circuit</label>
                            <input type="radio" id="circuit" name="lieu" value="circuit" onChange={() => changeLieu('circuit')} checked={lieu === "circuit" ? "checked" : false}/>
                            <label htmlFor="royal">Royal</label>
                            <input type="radio" id="royal" name="lieu" value="royal" onChange={() => changeLieu('royal')}  checked={lieu === "royal" ? "checked" : false}/>
                            <label htmlFor="mulsanne">Mulsanne</label>
                            <input type="radio" id="mulsanne" name="lieu" value="mulsanne" onChange={() => changeLieu('mulsanne')}  checked={lieu === "mulsanne" ? "checked" : false}/>
                        </div>
                        {
                            lieu === "circuit" && communeList &&
                            <CommuneList communeList={communeList} getInfosCommune={getInfosCommune}></CommuneList>
                        }
                        <div className="date">
                            <label htmlFor="date">Saisir la date : </label>
                            <input type="date" name="" id="date" />
                            <label htmlFor="heure">Saisir l'heure : </label>
                            <input type="time" name="" id="heure" />
                        </div>

                        <div className="trailer-url">
                            <label htmlFor="trailer">URL bande annonce :</label>
                            <input type="text" id="trailer"/>
                        </div>

                        <button onClick={(e) => showURL(e)}>Valider</button>
                    </form>
                </div>
            }

            {/* {
                admin & special && 

            } */}

            <nav className='film-nav'>
                <ul>
                    <Link to={`/film/${filmId}/bande-annonce`} ><li onClick={() => changeMenu("bande-annonce")} className={menu === "bande-annonce" ? "active" : ""}>Bande annonce</li></Link>
                    <Link to={`/film/${filmId}/circuit-itinerant`} ><li onClick={() => changeMenu("circuit-itinerant")} className={menu === "circuit-itinerant" ? "active" : ""}>Circuit itinérant</li></Link>
                    <Link to={`/film/${filmId}/cinema-le-royal`} ><li onClick={() => changeMenu("cinema-le-royal")} className={menu === "cinema-le-royal" ? "active" : ""}>Le Royal</li></Link>
                    <Link to={`/film/${filmId}/cinema-mulsanne`} ><li onClick={() => changeMenu("cinema-mulsanne")} className={menu === "cinema-mulsanne" ? "active" : ""}>Mulsanne</li></Link>
                </ul>
            </nav>

            {
                menu === "bande-annonce" &&
                <div className='trailer'>
                    {
                        filmDetails && 
                            <iframe src={filmDetails.trailerUrl} title={`Bande annonce ${filmDetails.titre}`}></iframe>                            
                    }
                </div>
            }

            {
                menu === "circuit-itinerant" &&
                <div className='circuit'>
                    <ul>
                        {
                            seanceList.map(seance => (
                                <li>
                                    <div className="seance-title">
                                        <FontAwesomeIcon className='icon' icon={faCircle} />
                                        <h4>{seance.commune}</h4>                      
                                    </div>
                                    <div className="seance-details">
                                        <div className="seance-location">
                                            <FontAwesomeIcon className='icon' icon={faLocationDot} />
                                            <p>{seance.salle}</p>
                                        </div>
                                        <div className="seance-date">
                                            <FontAwesomeIcon className='icon' icon={faCalendarDays} />
                                            <p>{seance.date}</p>
                                        </div>
                                    </div>
                                    
                                </li>
                            ))
                        }                        
                    </ul>
                </div>
            }

            {
                menu === "cinema-le-royal" && 
                <div className='salle-fixe'>
                    <ul>
                        {
                            royalSeanceList.map(seance => (
                                <li>
                                    <FontAwesomeIcon className='icon' icon={faCircleChevronRight} />
                                    <h4>{seance.date}</h4>
                                    <p>{seance.version}</p>
                                </li>
                            ))
                        }                        
                    </ul>
                </div>
            }

            {
                menu === "cinema-mulsanne" && 
                <div className='salle-fixe'>
                    <ul>
                        {
                            mulsanneSeanceList.map(seance => (
                                <li>
                                    <FontAwesomeIcon className='icon' icon={faCircleChevronRight} />
                                    <h4>{seance.date}</h4>
                                    <p>{seance.version}</p>
                                </li>
                            ))
                        }                        
                    </ul>
                </div>
            }
        </div>
    </div>
  )
}
