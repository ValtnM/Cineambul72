import React from 'react'
import { useState } from 'react';
import "./ConnectionForm.scss"

export default function ConnectionForm(props) {

  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  const sendToLocalStorage = (e) => {
    e.preventDefault();
    localStorage.setItem("username", userName);
    localStorage.setItem("password", password);
    props.checkAdmin();
  }

  return (
    <div className='connection-form'>
        <h2>Connexion administrateur</h2>
        <form>
            <label htmlFor="">Identifiant</label>
            <input onChange={(e) => setUserName(e.target.value)} type="text" />
            <label htmlFor="">Mot de passe</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" />
            <button onClick={(e) => sendToLocalStorage(e)}>Se connecter</button>
        </form>
    </div>
  )
}
