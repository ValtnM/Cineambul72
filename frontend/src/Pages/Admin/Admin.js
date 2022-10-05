import React, { useState, useEffect } from 'react'
import './Admin.scss'

import ConnectionForm from '../../Components/ConnectionForm/ConnectionForm'
import FilmList from '../../Components/FilmList/FilmList'
import NewFilmForm from '../../Components/NewFilmForm/NewFilmForm'
import NewMessageForm from '../../Components/NewMessageForm/NewMessageForm'
import NewEventForm from '../../Components/NewEventForm/NewEventForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck} from '@fortawesome/free-solid-svg-icons'
import { faXmark} from '@fortawesome/free-solid-svg-icons'

export default function Admin() {

  const [readyToRender, setReadyToRender] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [form, setForm] = useState('liste-films');
  const [deleteSeanceMode, setDeleteSeanceMode] = useState(false);
  const [failDeleteMessage, setFailDeleteMessage] = useState();
  const [successDeleteMessage, setSuccessDeleteMessage] = useState();

  useEffect(() => {
    checkAdmin();
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    setSuccessDeleteMessage("");
  }, [form])
  useEffect(() => {
    setFailDeleteMessage("");
  }, [deleteSeanceMode])

  // Déconnexion de l'administrateur
  const deleteToLocalStorage = () => {
    localStorage.removeItem("token");
    checkAdmin();
    window.scrollTo(0, 0)
  }
  
  // Connexion de l'administrateur
  const login = () => {
    if(userName && password) {
      fetch(`https://test-cineambul72.fr/api/admin/${userName}/${password}`, {
        method: "GET",
        // headers: {'Content-Type': 'application/json'},
      })
      .then(res => res.json())
      .then(data => {
        setAdmin(data.isAdmin)
        if(data.token) {
          localStorage.setItem("token", data.token)
          setUserName("");
          setPassword("");
        }
      })
      .catch(err => console.log(err))  
    } else {
      setAdmin(false);
    }
  }

  // Vérification du token administrateur
  const checkAdmin = () => {
    const token = localStorage.getItem('token')
    if (token) {     
      fetch(`https://test-cineambul72.fr/api/admin/${token}`, {
        method: "GET",
      })
      .then(res => res.json())
      .then((data) => {
        setAdmin(data.isAdmin);
        setReadyToRender(true);
      })
      .catch(err => console.log(err))
    } else {
      setAdmin(false)
      setReadyToRender(true);
    }
  }

  const deleteOldSeance = () => {
    const token = localStorage.getItem('token');
    fetch("https://test-cineambul72.fr/api/seance", {
      method: "DELETE",
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
     }
    })
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        setDeleteSeanceMode(false)
        setSuccessDeleteMessage(data.message)
      } else if (data.erreur) (
        setFailDeleteMessage(data.erreur)
      )
      
      console.log(data);
    })
    .catch(err => console.log(err))    
  }

  return (
    <div className='admin'>

    {
      readyToRender &&
      <div>
      {
        !admin &&
        <ConnectionForm setUserName={setUserName} setPassword={setPassword} login={login}></ConnectionForm>        
      }
      {
        admin &&
        <nav className='admin-nav'>
          <ul>
            <li className={form === "liste-films" ? "active" : ""} onClick={() => setForm("liste-films")}>Liste des films</li>
            <li className={form === "film" ? "active" : ""} onClick={() => setForm("film")}>Ajouter un film</li>
            <li className={form === "message" ? "active" : ""} onClick={() => setForm("message")}>Ajouter un message</li>
            <li className={form === "evenement" ? "active" : ""} onClick={() => setForm("evenement")}>Ajouter un évènement</li>
          </ul>
        </nav>
      }
      {
        admin && form === "message" &&
        <NewMessageForm></NewMessageForm>
      }
      {
        admin &&  form === "film" &&
        <NewFilmForm></NewFilmForm>
      }
      {
        admin && form === "evenement" &&
        <NewEventForm />
      }
      {
        admin && form === "liste-films" &&
        <div className='command-admin'>
          <div className="btn-admin">
            <button onClick={() => setDeleteSeanceMode(true)}>Supprimer les séances passées</button>
            <button>Supprimer les films sans séance</button>
          </div>
          {
            successDeleteMessage &&
            <div className="succes">{successDeleteMessage}</div>
          }
          {
            deleteSeanceMode &&
            <div className='delete-seance-confirmation-block'>
              <div className="delete-seance-confirmation-content">
                <div className="message">Êtes-vous sûr de vouloir supprimer les séances passées ?</div>
                <div className="btn">
                  <FontAwesomeIcon onClick={() => deleteOldSeance()} className="icone" icon={faCheck}></FontAwesomeIcon>
                  <FontAwesomeIcon onClick={() => setDeleteSeanceMode(false)} className="icone" icon={faXmark}></FontAwesomeIcon>
                </div>
                {
                  failDeleteMessage &&
                  <div className="echec">{failDeleteMessage}</div>
                }
              </div>
            </div>
          }
          <FilmList title="Liste des films" />
        </div>
      }
      {
        admin &&
        <div>
          <button onClick={() => deleteToLocalStorage()} className='deconnexion'>Déconnexion</button>    
        </div>
      }
    </div>
    }
    </div>
  )
}
