import React, { useState, useEffect } from 'react'
import './Admin.scss'

import ConnectionForm from '../../Components/ConnectionForm/ConnectionForm'
import NewFilmForm from '../../Components/NewFilmForm/NewFilmForm'
import NewMessageForm from '../../Components/NewMessageForm/NewMessageForm'
import NewEventForm from '../../Components/NewEventForm/NewEventForm'

export default function Admin() {

  const [readyToRender, setReadyToRender] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [form, setForm] = useState('film');

  useEffect(() => {
    checkAdmin();
    window.scrollTo(0, 0)
  }, [])

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
