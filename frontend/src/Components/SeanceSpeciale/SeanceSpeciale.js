import React, {useState, useEffect} from 'react'
import './SeanceSpeciale.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'

export default function SeanceSpeciale(props) {

    const [infosSeanceSpeciale, setInfosSeanceSpeciale] = useState();

    useEffect(() => {
        getSeanceSpecial();
    }, [])

    // Récupération des infos de la séance
    const getSeanceSpecial = () => {    
        fetch(`http://localhost:8080/api/seance/${props.filmId}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}        
        })
        .then(res => res.json())
        .then(data => setInfosSeanceSpeciale(data))
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

    // Formatage du jour
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

    // Formatage du mois
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

  return (
    <div>
        {
            infosSeanceSpeciale &&
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
     </div>
    )
}
