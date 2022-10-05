import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import './Seances.scss';
import {v4 as uuidv4} from 'uuid'
import CommuneList from '../../Components/CommuneList/CommuneList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'


export default function (props) {

    const pageName = document.location.href.split('/')[5];

    const [menu, setMenu] = useState(pageName)
    const [langue, setLangue] = useState("");
    const [lieu, setLieu] = useState("circuit");
    const [date, setDate] = useState();
    const [heure, setHeure] = useState();
    const [communeList, setCommuneList] = useState();
    const [communeSelected, setCommuneSelected] = useState();
    const [seancesCircuit, setSeancesCircuit] = useState();
    const [seancesRoyal, setSeancesRoyal] = useState();
    const [seancesMulsanne, setSeancesMulsanne] = useState();
    const [notificationMessage, setNotificationMessage] = useState();

    useEffect(() => {
        getCommunesList();
        getCircuitSeances();
        getRoyalSeances();
        getMulsanneSeances();
    },[])

    useEffect(() => {
        setMenu(pageName)
    }, [pageName]) 

    // Soumission du formulaire
    const submitForm = (e) => {
        e.preventDefault();
        addSeance();
    }

    // Ajout d'une séance dans la base de données
    const addSeance = () => {
        const token = sessionStorage.getItem("token");
        fetch(`https://test-cineambul72.fr/api/seance/${props.filmId}`, {
            method: "POST",
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: date,
                heure: heure,
                commune: communeSelected,
                lieu: lieu,
                langue: langue,
            })
        })
        .then(res => res.json())
        .then((data) => {
            setNotificationMessage(data)
            getCircuitSeances();
            getRoyalSeances();
            getMulsanneSeances();
        })
        .catch(err => console.log(err))
    }

    // Suppression d'une séance
    const deleteSeance = (seanceId) => {
        const token = sessionStorage.getItem("token");
        fetch(`https://test-cineambul72.fr/api/seance/${seanceId}`, {
            method: "DELETE",
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        .then(() => {
            getCircuitSeances();
            getMulsanneSeances();
            getRoyalSeances();
        })
        .catch(err => console.log(err))
    }

    // Formatage de la date
    const formatDate = (value) => {
        let date = new Date(value)
        let jourSemaine = date.getDay();
        let jourNumero = date.getDate();
        let mois = date.getMonth();
        jourSemaine = getDay(jourSemaine)
        mois = getMonth(mois);
    
        return `${jourSemaine} ${jourNumero} ${mois}`;
    }

    // Récupération du jour
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

    // Récupération du mois
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

    // Modification de l'heure
    const changeHour = (e) => {
        const formatedHour = formatHour(e.target.value);
        setHeure(formatedHour)
    }

    // Formatage de l'heure
    const formatHour = (value) => {
        return value.split(':').join("h");
    }
  
    // Récupération des séances de Mulsanne
    const getMulsanneSeances = () => {
        fetch(`https://test-cineambul72.fr/api/seance/mulsanne/${props.filmId}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            setSeancesMulsanne(data)
        })
        .catch(err => console.log(err))
    }

    // Récupération des séances du Royal
    const getRoyalSeances = () => {
        fetch(`https://test-cineambul72.fr/api/seance/royal/${props.filmId}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            setSeancesRoyal(data)
        })
        .catch(err => console.log(err))
    }

    // Récupération des séances du circuit
    const getCircuitSeances = () => {
        fetch(`https://test-cineambul72.fr/api/seance/circuit/${props.filmId}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            setSeancesCircuit(data)
        })
        .catch(err => console.log(err))
    }

    // Récupération de la liste des communes du circuit
    const getCommunesList = () => {
        fetch('https://test-cineambul72.fr/api/commune')
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

    // Récupération des infos des communes
    const getInfosCommune = (value) => {
        communeList.forEach(element => {
            if(element.nom === value.target.options[value.target.selectedIndex].text) {
            setCommuneSelected(element);
            }
        });
    }    

  return (
    <div className="seances">
        {
            props.admin && 
            <div className='seance-form'>
                <h2>Ajouter une séance</h2>
                <form>
                    <div className='lieu'>
                        <div>
                            <label htmlFor="circuit">Circuit</label>
                            <input type="radio" id="circuit" name="lieu" value="circuit" onChange={() => setLieu('circuit')} checked={lieu === "circuit" ? "checked" : false}/>
                        </div>
                        <div>
                            <label htmlFor="royal">Royal</label>
                            <input type="radio" id="royal" name="lieu" value="royal" onChange={() => setLieu('royal')}  checked={lieu === "royal" ? "checked" : false}/>
                        </div>
                        <div>
                            <label htmlFor="mulsanne">Mulsanne</label>
                            <input type="radio" id="mulsanne" name="lieu" value="mulsanne" onChange={() => setLieu('mulsanne')}  checked={lieu === "mulsanne" ? "checked" : false}/>
                        </div>
                    </div>
                    {
                        lieu === "circuit" && communeList &&
                        <CommuneList communeSelected={communeSelected} communeList={communeList} getInfosCommune={getInfosCommune}></CommuneList>
                    }
                    <div className="date">
                        <div>
                            <label htmlFor="date">Saisir la date : </label>
                            <input onChange={(e) => setDate(e.target.value)} type="date" name="" id="date" />
                        </div>
                        <div>
                            <label htmlFor="heure">Saisir l'heure : </label>
                            <input onChange={(e) => changeHour(e)} type="time" name="" id="heure" />
                        </div>
                    </div>

                    <div className="langue">
                        <div>
                            <label htmlFor="vo">VO</label>
                            <input onChange={() => setLangue("VO")} type="radio" id='vo' name='langue'/>
                        </div>
                        <div>
                            <label htmlFor="vf">VF</label>
                            <input onChange={() => setLangue('VF')} type="radio" id='vf' name='langue'/>
                        </div>
                        <div>
                            <label htmlFor="null">Non précisée</label>
                            <input onChange={() => setLangue("")} type="radio" id='null' name='langue' checked={langue === "" ? true : false}/>
                        </div>
                    </div>                

                    <button onClick={(e) => submitForm(e)}>Valider</button>
                    {
                        notificationMessage && 
                        <div className='notification'>
                            {
                                notificationMessage.message &&
                                <p style={{color: "green"}}>{notificationMessage.message}</p>
                            }
                            {
                                notificationMessage.erreur &&
                                <p style={{color: "red"}}>{notificationMessage.erreur}</p>
                            }
                        </div>
                    }
                </form>
            </div>
        }            

        <nav className='film-nav'>
            <ul>
                <Link to={`/film/${props.filmId}/circuit-itinerant`} ><li onClick={() => setMenu("circuit-itinerant")} className={menu === "circuit-itinerant" ? "active" : ""}>Circuit itinérant</li></Link>
                <Link to={`/film/${props.filmId}/cinema-le-royal`} ><li onClick={() => setMenu("cinema-le-royal")} className={menu === "cinema-le-royal" ? "active" : ""}>Le Royal</li></Link>
                <Link to={`/film/${props.filmId}/cinema-mulsanne`} ><li onClick={() => setMenu("cinema-mulsanne")} className={menu === "cinema-mulsanne" ? "active" : ""}>Mulsanne</li></Link>                    
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
                                        props.admin && 
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
                                    props.admin && 
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
                                    props.admin && 
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
  )
}
