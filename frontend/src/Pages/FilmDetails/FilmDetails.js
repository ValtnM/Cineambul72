import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import ReactPlayer from "react-player";
import "./FilmDetails.scss"
import {v4 as uuidv4} from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faCheck} from '@fortawesome/free-solid-svg-icons'
import { faXmark} from '@fortawesome/free-solid-svg-icons'
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons'
import CommuneList from '../../Components/CommuneList/CommuneList';
import PopUp from '../../Components/PopUp/PopUp';


export default function FilmDetails() {
    
    const circuitUrl = document.location.href.split('/')[5];

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
    
    const [menu, setMenu] = useState(circuitUrl)
    const [modifyMode, setModifyMode] = useState(false);
    const [messageNotification, setMessageNotification] = useState();
    const [special, setSpecial] = useState();
    const [infosSeanceSpeciale, setInfosSeanceSpeciale] = useState();
    const [langue, setLangue] = useState("");
    const [lieu, setLieu] = useState("circuit");
    const [date, setDate] = useState();
    const [heure, setHeure] = useState();
    const [filmDetails, setFilmDetails] = useState();
    const [communeList, setCommuneList] = useState();
    const [communeSelected, setCommuneSelected] = useState();
    const [seancesCircuit, setSeancesCircuit] = useState();
    const [seancesRoyal, setSeancesRoyal] = useState();
    const [seancesMulsanne, setSeancesMulsanne] = useState();
    const [popUpTrailer, setPopUpTrailer] = useState(false)

    const {filmId} = useParams()

    useEffect(() => {
        checkAdmin();
        getInfosFilm();
        // getCommunesList();
        // getCircuitSeances();
        // getRoyalSeances();
        // getMulsanneSeances();
        // console.log(filmDetails);
        window.scrollTo(0, 100)
    }, [])  

    
    const deleteSeance = (seanceId) => {
        console.log(seanceId);
        fetch(`http://localhost:8080/api/seance/${seanceId}`, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => {
            console.log(res)
            getCircuitSeances();
            getMulsanneSeances();
            getRoyalSeances();
        })
        .catch(err => console.log(err))
    }

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

    const submitForm = (e) => {
        e.preventDefault();
        addSeance();
    }

    const addSeance = () => {
        fetch(`http://localhost:8080/api/seance/${filmId}`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                date: date,
                heure: heure,
                commune: communeSelected,
                lieu: lieu,
                langue: langue,
            })
        })
        .then(res => res.json())
        .then(() => {
            getCircuitSeances();
            getRoyalSeances();
            getMulsanneSeances();
        })
        .catch(err => console.log(err))
    }

    const getMulsanneSeances = () => {
        fetch(`http://localhost:8080/api/seance/mulsanne/${filmId}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            setSeancesMulsanne(data)
        })
        .catch(err => console.log(err))
    }

    const getRoyalSeances = () => {
        fetch(`http://localhost:8080/api/seance/royal/${filmId}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            setSeancesRoyal(data)
        })
        .catch(err => console.log(err))
    }

    const getCircuitSeances = () => {
        fetch(`http://localhost:8080/api/seance/circuit/${filmId}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            setSeancesCircuit(data)
        })
        .catch(err => console.log(err))
    }
  

  const changeMenu = (content) => {
    setMenu(content)
  } 

  useEffect(() => {
    setMenu(circuitUrl)
  }, [circuitUrl]) 


  const changeHour = (e) => {
    const formatedHour = formatHour(e.target.value);
    setHeure(formatedHour)
  }

  const formatHour = (value) => {
    return value.split(':').join("h");
  }

  const changeDate = (e) => {  
    setDate(e.target.value)
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


  const changeLieu = (value) => {
      setLieu(value)
    }

  const changeLangue = (value) => {
      setLangue(value)
    }
    
    
    

const getInfosFilm = () => {
    fetch(`http://localhost:8080/api/film/${filmId}`, {
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {        
        // getSeanceDay()
        if(data.special){
            setSpecial(true)
            getSeanceSpecial();
        } else if (!data.special) {
            getCommunesList();
            getCircuitSeances();
            getRoyalSeances();
            getMulsanneSeances();
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
    .then(data => {
        console.log(data);
        setInfosSeanceSpeciale(data)
    })
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
        setCommuneList(data)
    })
    .catch(err => {
        console.log(err)
    })
}
  

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
                            <CommuneList communeSelected={communeSelected} communeList={communeList} getInfosCommune={getInfosCommune}></CommuneList>
                        }
                        <div className="date">
                            <label htmlFor="date">Saisir la date : </label>
                            <input onChange={(e) => changeDate(e)} type="date" name="" id="date" />
                            <label htmlFor="heure">Saisir l'heure : </label>
                            <input onChange={(e) => changeHour(e)} type="time" name="" id="heure" />
                        </div>

                        <div className="langue">
                            <label htmlFor="vo">VO</label>
                            <input onChange={() => changeLangue("VO")} type="radio" id='vo' name='langue'/>
                            <label htmlFor="vf">VF</label>
                            <input onChange={() => changeLangue('VF')} type="radio" id='vf' name='langue'/>
                            <label htmlFor="null">Non précisée</label>
                            <input onChange={() => changeLangue("")} type="radio" id='null' name='langue'/>
                        </div>

                        {/* <div className="trailer-url">
                            <label htmlFor="trailer">URL bande annonce :</label>
                            <input onChange={(e) => changeTrailer(e)} type="text" id="trailer"/>
                        </div> */}

                        <button onClick={(e) => submitForm(e)}>Valider</button>
                    </form>
                </div>
            }            

            <nav className='film-nav'>
                <ul>
                    <Link to={`/film/${filmId}/circuit-itinerant`} ><li onClick={() => changeMenu("circuit-itinerant")} className={menu === "circuit-itinerant" ? "active" : ""}>Circuit itinérant</li></Link>
                    <Link to={`/film/${filmId}/cinema-le-royal`} ><li onClick={() => changeMenu("cinema-le-royal")} className={menu === "cinema-le-royal" ? "active" : ""}>Le Royal</li></Link>
                    <Link to={`/film/${filmId}/cinema-mulsanne`} ><li onClick={() => changeMenu("cinema-mulsanne")} className={menu === "cinema-mulsanne" ? "active" : ""}>Mulsanne</li></Link>                    
                </ul>
            </nav>
            
            {
                menu === "circuit-itinerant" && seancesCircuit &&
                <div className='circuit'>
                    {
                        seancesCircuit.length > 0 ?
                        <ul>
                        {
                            seancesCircuit.map(seance => (
                                <li key={uuidv4()}>
                                    <div className="seance-title">
                                        <FontAwesomeIcon className='icon' icon={faCircle} />
                                        <h4>{seance.Commune.nom}</h4>
                                        {
                                            seance.langue &&
                                            <p>{seance.langue}</p> 
                                        }
                                        {
                                            admin && 
                                            <FontAwesomeIcon onClick={() => deleteSeance(seance.id)} className='delete-btn' icon={faTrashCan} />
                                        }         
                                    </div>
                                    <div className="seance-details">
                                        <div className="seance-location">
                                            <FontAwesomeIcon className='icon' icon={faLocationDot} />
                                            <p>{seance.Commune.salleNom}</p>
                                        </div>
                                        <div className="seance-date">
                                            <FontAwesomeIcon className='icon' icon={faCalendarDays} />
                                            <p>{formatDate(seance.date)} à {seance.heure}</p>
                                        </div>
                                    </div>
                                    
                                </li>
                            ))
                        }                        
                    </ul>
                    :
                    <h5>Pas de séance prévue</h5>                    
                    }
                </div>
            }

            {
                menu === "cinema-le-royal" && seancesRoyal &&
                <div className='salle-fixe'>
                    {
                        seancesRoyal.length > 0 ?
                        <ul>
                        {
                            seancesRoyal.map(seance => (
                                <li key={uuidv4()}>
                                    <FontAwesomeIcon className='icon' icon={faCircleChevronRight} />
                                    <h4>{formatDate(seance.date)} à {seance.heure}</h4>
                                    {
                                        seance.langue &&
                                        <p>{seance.langue}</p>
                                    }
                                    {
                                        admin && 
                                        <FontAwesomeIcon onClick={() => deleteSeance(seance.id)} className='delete-btn' icon={faTrashCan} />
                                    }
                                </li>
                            ))
                        }                        
                    </ul>
                    :
                    <h5>Pas de séance prévue</h5>
                    }
                </div>                
            }

            {
                menu === "cinema-mulsanne" && seancesMulsanne &&
                <div className='salle-fixe'>
                    {
                        seancesMulsanne.length > 0 ?
                        <ul>
                        {
                            seancesMulsanne.map(seance => (
                                <li key={uuidv4()}>
                                    <FontAwesomeIcon className='icon' icon={faCircleChevronRight} />
                                    <h4>{formatDate(seance.date)} à {seance.heure}</h4>
                                    {
                                        seance.langue &&
                                        <p>{seance.langue}</p>
                                    }
                                    {
                                        admin && 
                                        <FontAwesomeIcon onClick={() => deleteSeance(seance.id)} className='delete-btn' icon={faTrashCan} />
                                    }
                                </li>
                            ))
                        }                        
                        </ul>
                        :
                        <h5>Pas de séance prévue</h5>
                    }
                </div>                
            }
        </div>
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
