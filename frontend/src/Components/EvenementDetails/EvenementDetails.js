import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import nl2br from "react-nl2br"
import './EvenementDetails.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

export default function EvenementDetails() {

  const {evenementId} = useParams()

  const [admin, setAdmin] = useState(false);
  const [infosEvent, setInfosEvent] = useState();
  console.log(evenementId);

  useEffect(() => {
    getInfosEvent();
    checkAdmin();
  }, [])

  const checkAdmin = () => {
    const token = sessionStorage.getItem('token');
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

  const getInfosEvent = () => {
    fetch(`https://test-cineambul72.fr/api/evenement/${evenementId}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => setInfosEvent(data)
    .catch(err => console.log(err)))
  }

  const deleteEvent = () => {
    const token = sessionStorage.getItem('token');
    fetch(`https://test-cineambul72.fr/api/evenement/${evenementId}`, {
      method: 'DELETE',
      headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(data => {
      if(data.message) {
        window.history.back();
      }
    })
    .catch(err => console.log(err))
  }


  return (
    <div className='evenement-details-block'>
      {
        infosEvent &&
        <div className='evenement-details-content'>
          <img src={infosEvent.affiche} alt="" />
          <div className="infos">
              <h2>{infosEvent.nom}</h2>
              <hr />
              <p>{nl2br(infosEvent.texte)}</p>
              <a href={infosEvent.lien} target="blank"><div className='evenement-btn'>En savoir plus...</div></a>
          </div>
          {
            admin &&
            <FontAwesomeIcon onClick={() => deleteEvent()} className='event-delete-btn' icon={faTrashCan}></FontAwesomeIcon>
          }
        </div>
        }
    </div>
  )
}
