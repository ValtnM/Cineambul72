import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import ReactPlayer from "react-player";
import nl2br from "react-nl2br"
import "./FilmDetails.scss"
import {v4 as uuidv4} from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faCheck} from '@fortawesome/free-solid-svg-icons'
import { faXmark} from '@fortawesome/free-solid-svg-icons'
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons'
import Seances from '../../Components/Seances/Seances';
import PopUp from '../../Components/PopUp/PopUp';


export default function FilmDetails() {
    
    const [admin, setAdmin] = useState(false);
    const checkAdmin = () => {
        const adminUserName = localStorage.getItem("username")
        const adminPassword = localStorage.getItem("password")
        fetch(`http://localhost:8080/api/admin/${adminUserName}/${adminPassword}`, {
          method: "GET",
          headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .then(data => {
          setAdmin(data)
        })
        .catch(err => console.log(err))    
      }
    
    const [modifyMode, setModifyMode] = useState(false);
    const [messageNotification, setMessageNotification] = useState();
    const [special, setSpecial] = useState();
    const [infosSeanceSpeciale, setInfosSeanceSpeciale] = useState();
    const [filmDetails, setFilmDetails] = useState();
    const [popUpTrailer, setPopUpTrailer] = useState(false)

    const {filmId} = useParams()

    useEffect(() => {
        checkAdmin();
        getInfosFilm();
        window.scrollTo(0, 100)
    }, [])      
    
    const deleteFilm = () => {
        fetch(`http://localhost:8080/api/film/${filmId}`, {
            method: "DELETE"
        })
        .then((res) => {
            console.log(res)
            window.history.back()
        })
        .catch(err => console.log(err))
    }

    const validModification = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/api/film/${filmId}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(filmDetails)
        })
        .then(res => res.json())
        .then((data) => {
            if(data.erreur) {
                setMessageNotification(data.erreur)
            } else {
                getInfosFilm();
                setModifyMode(false)
                setMessageNotification("")
            }
        })
        .catch(err => console.log(err))
    }
    
    const cancelModification = () => {
        setModifyMode(false)
        getInfosFilm();
        setMessageNotification("")
    }

    const modifyFilmDetails = (value, info) => {
        setFilmDetails({
            ...filmDetails,
            [info]: value
        })
    }



    const formatDate = (value) => {
        let date = new Date(value)
        let jourSemaine = date.getDay();
        let jourNumero = date.getDate();
        let mois = date.getMonth();
        jourSemaine = getDay(jourSemaine)
        mois = getMonth(mois);

        return `${jourSemaine} ${jourNumero} ${mois}`;
    }

    const getDay = (day) => {
    switch (day) {
        case 0:
            return "Dimanche";
            break;
        case 1:
            return "Lundi";
            break;
        case 2:
            return "Mardi";
            break;
        case 3:
            return "Mercredi";
            break;
        case 4:
            return "Jeudi";
            break;
        case 5:
            return "Vendredi";
            break;
        case 6:
            return "Samedi";
            break;        
    }
    }
    const getMonth = (month) => {
    switch (month) {
        case 0:
            return "janvier";
            break;
        case 1:
            return "février";
            break;
        case 2:
            return "mars";
            break;
        case 3:
            return "avril";
            break;
        case 4:
            return "mai";
            break;
        case 5:
            return "juin";
            break;
        case 6:
            return "juillet";
            break;
        case 7:
            return "août";
            break;
        case 8:
            return "septembre";
            break;
        case 9:
            return "octobre";
            break;
        case 10:
            return "novembre";
            break;
        case 11:
            return "décembre";
            break;
    }
    }
    
    

    const getInfosFilm = () => {
        fetch(`http://localhost:8080/api/film/${filmId}`, {
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {       
            if(data.special){
                setSpecial(true)
                getSeanceSpecial();
            } else if (!data.special) {
                setSpecial(false)
            }
            setFilmDetails(data)
        })
        .catch(err => console.log(err))
    }

    const getSeanceSpecial = () => {    
        fetch(`http://localhost:8080/api/seance/${filmId}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}        
        })
        .then(res => res.json())
        .then(data => setInfosSeanceSpeciale(data))
        .catch(err => console.log(err))
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
                    <div>
                        {nl2br(filmDetails.synopsis)}
                    </div>
                </div>
                {
                    filmDetails.avertissement &&
                    <div className="avertissement">{filmDetails.avertissement}</div>
                }

                {
                    filmDetails.trailerUrl &&
                    <div onClick={() => setPopUpTrailer(true)} className="trailer-btn">
                        <FontAwesomeIcon className="icone" icon={faCirclePlay}></FontAwesomeIcon>
                        <h3>Bande annonce</h3>
                    </div>
                }
                
            </div>
            {
                admin &&
                <div className='details-btn'>
                    <button onClick={() => setModifyMode(true)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                    <button onClick={() => deleteFilm()}><FontAwesomeIcon icon={faTrashCan} /></button>
                </div>
            }
        </div>
        }
        {
            modifyMode &&
            <div className='modify-form'>
                <h3>Modifier le film</h3>
                <form action="">
                    <label htmlFor="title">Titre :</label>
                    <input onChange={(e) => modifyFilmDetails(e.target.value, 'titre')} type="text" id='title' value={filmDetails ? filmDetails.titre : ""}/>
                    <label htmlFor="date">Date :</label>
                    <input onChange={(e) => modifyFilmDetails(e.target.value, 'dateSortie')}  type="text" id='date' value={filmDetails ? filmDetails.dateSortie : ""}/>
                    <label htmlFor="genre">Genre(s) :</label>
                    <input onChange={(e) => modifyFilmDetails(e.target.value, 'genre')}  type="text" id='genre' value={filmDetails ? filmDetails.genre : ""}/>
                    <label htmlFor="duree">Durée :</label>
                    <input onChange={(e) => modifyFilmDetails(e.target.value, 'duree')}  type="text" id='duree' value={filmDetails ? filmDetails.duree : ""}/>
                    <label htmlFor="realisateur">Réalisateur :</label>
                    <input onChange={(e) => modifyFilmDetails(e.target.value, 'realisateur')}  type="text" id='realisateur' value={filmDetails ? filmDetails.realisateur : ""}/>
                    <label htmlFor="casting">Casting :</label>
                    <input onChange={(e) => modifyFilmDetails(e.target.value, "casting")}  type="text" id='casting' value={filmDetails ? filmDetails.casting : ""}/>
                    <label htmlFor="avertissement">Avertissement</label>
                    <input onChange={(e) => modifyFilmDetails(e.target.value, "avertissement")}  type="text" id='avertissement' value={filmDetails ? filmDetails.avertissement : ""}/>
                    <label htmlFor="synopsis">Synopsis :</label>
                    <textarea onChange={(e) => modifyFilmDetails(e.target.value, 'synopsis')}  rows="10" type="text" id='synopsis' value={filmDetails ? filmDetails.synopsis : ""}/>
                    <label htmlFor="affiche">Affiche :</label>
                    <input onChange={(e) => modifyFilmDetails(e.target.value, 'afficheUrl')}  type="text" id='affiche' value={filmDetails ? filmDetails.afficheUrl : ""}/>
                    <img src={filmDetails ? filmDetails.afficheUrl : null} alt="" />                   
                    <label htmlFor="trailer">Bande annonce :</label>
                    <input onChange={(e) => modifyFilmDetails(e.target.value, 'trailerUrl')}  type="text" id='trailer' value={filmDetails ? filmDetails.trailerUrl : ""}/>
                    {
                        filmDetails &&
                        <ReactPlayer className="trailer-player" url={filmDetails.trailerUrl} controls></ReactPlayer>
                    }                       
                    
                    <div className="modify-form-btn">
                        <button onClick={(e) => validModification(e)}><FontAwesomeIcon icon={faCheck} /></button>
                        <button onClick={() => cancelModification()}><FontAwesomeIcon icon={faXmark} /></button>
                    </div>
                    {
                        messageNotification &&
                        <div className="message-notification">
                            <h5>{messageNotification}</h5>
                        </div>
                    }
                </form>
            </div>
            }
        
        {
            !special &&
            <Seances admin={admin} filmId={filmId} special={special}></Seances>            
        }
        {
        special && infosSeanceSpeciale &&
        <div className='infos-seance-speciale'>
            <div className="special-lieu">
                <FontAwesomeIcon className='icon' icon={faLocationDot} />
                <h6>{infosSeanceSpeciale.salle}</h6>
                {
                    infosSeanceSpeciale.CommuneId &&
                    <h6>{infosSeanceSpeciale.Commune.salleCommune}</h6>                
                }
                {
                    infosSeanceSpeciale.lieu === "royal" &&
                    <div>
                        <h6>Cinéma Le Royal</h6>   
                        <h6>72100 Le Mans</h6>
                    </div>
                }
                {
                    infosSeanceSpeciale.lieu === "mulsanne" &&
                    <h6>72230 Mulsanne</h6>
                }
            </div>
            <div className="special-date">
                <FontAwesomeIcon className='icon' icon={faCalendarDays} />
                <h6>{formatDate(infosSeanceSpeciale.date)} à {infosSeanceSpeciale.heure}</h6>
                {
                    infosSeanceSpeciale.langue === "VO" &&
                    <p className='langue'>Version Originale Sous-Titrée</p>
                }
                {
                    infosSeanceSpeciale.langue === "VF" &&
                    <p  className='langue'>Version Française</p>
                }
                {
                    infosSeanceSpeciale.infoComplementaire &&
                    <p>{infosSeanceSpeciale.infoComplementaire}</p>
                }
                
            </div>
        </div>
        }
        {
            popUpTrailer && filmDetails &&
            <PopUp trailerUrl={filmDetails.trailerUrl} setPopUpTrailer={setPopUpTrailer}></PopUp>
        }
    </div>
  )
}
