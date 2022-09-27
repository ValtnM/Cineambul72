import React, { useState, useEffect } from 'react'
import './Admin.scss'

import ConnectionForm from '../../Components/ConnectionForm/ConnectionForm'
import NewFilmForm from '../../Components/NewFilmForm/NewFilmForm'
import NewMessageForm from '../../Components/NewMessageForm/NewMessageForm'

export default function Admin() {

  const [admin, setAdmin] = useState(false);
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [form, setForm] = useState('film');

  useEffect(() => {
    checkAdmin();
  }, [])

  // Déconnexion de l'administrateur
  const deleteToLocalStorage = () => {
    localStorage.removeItem("token");
    checkAdmin();
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
      })
      .catch(err => console.log(err))
    } else {
      setAdmin(false)
    }
  }

  return (

    <div className='admin'>
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
        admin &&
        <div>
          <button onClick={() => deleteToLocalStorage()} className='deconnexion'>Déconnexion</button>    
        </div>
      }
    </div>
  )
}
