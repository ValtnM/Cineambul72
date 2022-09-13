import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Admin.scss'

import ConnectionForm from '../../Components/ConnectionForm/ConnectionForm'
import NewFilmForm from '../../Components/NewFilmForm/NewFilmForm'
import NewMessageForm from '../../Components/NewMessageForm/NewMessageForm'

export default function Admin() {

  const [admin, setAdmin] = useState(false);
  const [form, setForm] = useState('film');

  useEffect(() => {
    checkAdmin();
  }, [])

  // Déconnexion de l'administrateur
  const deleteToLocalStorage = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    checkAdmin();
  }
  
  // Vérification du status de l'utilisateur
  const checkAdmin = () => {
    const adminUserName = localStorage.getItem("username")
    const adminPassword = localStorage.getItem("password")
    fetch(`http://localhost:8080/api/admin/${adminUserName}/${adminPassword}`, {
      method: "GET",
      headers: {'Content-Type': 'application/json'},
    })
    .then(res => res.json())
    .then(data => setAdmin(data))
    .catch(err => console.log(err))    
  }

  return (

    <div className='admin'>
      {
        !admin &&
        <ConnectionForm checkAdmin={checkAdmin}></ConnectionForm>        
      }
      {
        admin &&
        <nav className='admin-nav'>
          <ul>
            <li className={form === "film" ? "active" : ""} onClick={() => setForm("film")}>Ajouter un film</li>
            <li className={form === "message" ? "active" : ""} onClick={() => setForm("message")}>Ajouter un message</li>
          </ul>
        </nav>
      }
      {
        admin && form === "message" &&
        <NewMessageForm></NewMessageForm>
      }
      {
        admin &&  form === "film" &&
        <NewFilmForm checkAdmin={checkAdmin}></NewFilmForm>
      }
      {
        admin &&
        <div>
          {/* <hr /> */}
          <button onClick={() => deleteToLocalStorage()} className='deconnexion'>Déconnexion</button>    
        </div>
      }
    </div>
  )
}
