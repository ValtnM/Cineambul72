import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import ReactPlayer from "react-player";
import nl2br from "react-nl2br"
import "./FilmDetails.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faCheck} from '@fortawesome/free-solid-svg-icons'
import { faXmark} from '@fortawesome/free-solid-svg-icons'
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons'
import Seances from '../../Components/Seances/Seances';
import SeanceSpeciale from '../../Components/SeanceSpeciale/SeanceSpeciale';
import PopUp from '../../Components/PopUp/PopUp';


export default function FilmDetails() {

    const [admin, setAdmin] = useState(false);
    
    // Verfication du token d'authentification
    const checkAdmin = () => {
        const token = sessionStorage.getItem('token')
        if (token) {     
          fetch(`https://test-cineambul72.fr/api/admin/${token}`, {
            method: "GET",
          })
          .then(res => res.json())
          .then((data) => {
            setAdmin(data.isAdmin);
          })
          .catch(err => console.log(err))
        } else {
          setAdmin(false)
        }
      }
    
    const [modifyMode, setModifyMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false)
    const [messageNotification, setMessageNotification] = useState();
    const [special, setSpecial] = useState();
    const [filmDetails, setFilmDetails] = useState();
    const [popUpTrailer, setPopUpTrailer] = useState(false)

    const {filmId} = useParams()

    useEffect(() => {
        checkAdmin();
        getInfosFilm();
        window.scrollTo(0, 100)
    }, [])      
    
    // Suppression du film
    const deleteFilm = () => {
        const token = sessionStorage.getItem("token");
        fetch(`https://test-cineambul72.fr/api/film/${filmId}`, {
            method: "DELETE",
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then((data) => {
            if(data.message) {
                window.history.back()
            }
        })
        .catch(err => console.log(err))
    }

    // Validation des modifications
    const validModification = (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem("token");
        fetch(`https://test-cineambul72.fr/api/film/${filmId}`, {
            method: "PUT",
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filmDetails)
        })
        .then(res => res.json())
        .then((data) => {
            if(data.erreur) {
                setMessageNotification(data.erreur)
            } else if (data.message) {
                getInfosFilm();
                setModifyMode(false)
                setMessageNotification("")
            } 
        })
        .catch(err => console.log(err))
    }
    
    // Annulation des modifications
    const cancelModification = () => {
        setModifyMode(false)
        getInfosFilm();
        setMessageNotification("")
    }

    // Modification des détails du film
    const modifyFilmDetails = (value, info) => {
        setFilmDetails({
            ...filmDetails,
            [info]: value
        })
    }   
    
    // Récupération des détails du film
    const getInfosFilm = () => {
        fetch(`https://test-cineambul72.fr/api/film/${filmId}`, {
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {       
            if(data.special){
                setSpecial(true)
            } else if (!data.special) {
                setSpecial(false)
            }
            setFilmDetails(data)
        })
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
                    {
                        filmDetails.realisateur &&
                        <div className="realisateur"><span>Par : </span>{filmDetails.realisateur}</div>
                    }
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
                        <button onClick={() => setDeleteMode(true)}><FontAwesomeIcon icon={faTrashCan} /></button>
                    </div>
                }
            </div>
        }
        {
            modifyMode && filmDetails && admin &&
            <div className='modify-form'>
                <h3>Modifier le film</h3>
                <form action="">
                    <label htmlFor="title">Titre</label>
                    <input onChange={(e) => modifyFilmDetails(e.target.value, 'titre')} type="text" id='title' value={filmDetails ? filmDetails.titre : ""}/>
                    <label htmlFor="date">Date</label>
                    <input onChange={(e) => modifyFilmDetails(e.target.value, 'dateSortie')}  type="text" id='date' value={filmDetails ? filmDetails.dateSortie : ""}/>
                    <label htmlFor="genre">Genre(s)</label>
                    <input onChange={(e) => modifyFilmDetails(e.target.value, 'genre')}  type="text" id='genre' value={filmDetails ? filmDetails.genre : ""}/>
                    <label htmlFor="duree">Durée</label>
                    <input onChange={(e) => modifyFilmDetails(e.target.value, 'duree')}  type="text" id='duree' value={filmDetails ? filmDetails.duree : ""}/>
                    <label htmlFor="realisateur">Réalisateur</label>
                    <input onChange={(e) => modifyFilmDetails(e.target.value, 'realisateur')}  type="text" id='realisateur' value={filmDetails ? filmDetails.realisateur : ""}/>
                    <label htmlFor="casting">Casting</label>
                    <input onChange={(e) => modifyFilmDetails(e.target.value, "casting")}  type="text" id='casting' value={filmDetails ? filmDetails.casting : ""}/>
                    <label htmlFor="avertissement">Avertissement</label>
                    <input onChange={(e) => modifyFilmDetails(e.target.value, "avertissement")}  type="text" id='avertissement' value={filmDetails ? filmDetails.avertissement : ""}/>
                    <label htmlFor="synopsis">Synopsis</label>
                    <textarea onChange={(e) => modifyFilmDetails(e.target.value, 'synopsis')}  rows="10" type="text" id='synopsis' value={filmDetails ? filmDetails.synopsis : ""}/>
                    <label htmlFor="affiche">Affiche</label>
                    <input onChange={(e) => modifyFilmDetails(e.target.value, 'afficheUrl')}  type="text" id='affiche' value={filmDetails ? filmDetails.afficheUrl : ""}/>
                    <img src={filmDetails ? filmDetails.afficheUrl : null} alt="" />                   
                    <label htmlFor="trailer">Bande annonce</label>
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
            !special && filmDetails &&
            <Seances key={filmDetails} admin={admin} filmId={filmId} special={special}></Seances>            
        }
        {
            special && filmDetails &&
            <SeanceSpeciale key={filmDetails} filmId={filmId} special={special}></SeanceSpeciale>      
        }
        {
            popUpTrailer && filmDetails &&
            <PopUp trailerUrl={filmDetails.trailerUrl} setPopUpTrailer={setPopUpTrailer}></PopUp>
        }
        {
            deleteMode && admin &&
            <div className="delete-confirmation">
                <div className="delete-confirmation-content">
                    <p>Êtes-vous sûr de vouloir supprimer ce film ?</p>
                    <div className="delete-confirmation-btn">
                        <FontAwesomeIcon onClick={() => deleteFilm()} className='confirm-btn icon' icon={faCheck} />
                        <FontAwesomeIcon onClick={() => setDeleteMode(false)} className='cancel-btn icon' icon={faXmark} />
                    </div>
                </div>
            </div>
        }
    </div>
  )
}
