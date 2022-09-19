import React from 'react'
import { useState } from 'react';
import "./ConnectionForm.scss"

export default function ConnectionForm(props) {
  
  const sendToLocalStorage = (e) => {
    e.preventDefault();
    props.login();
  }

  return (
    <div className='connection-form'>
        <h2>Connexion administrateur</h2>
        <form>
            <label htmlFor="">Identifiant</label>
            <input onChange={(e) => props.setUserName(e.target.value)} type="text" />
            <label htmlFor="">Mot de passe</label>
            <input onChange={(e) => props.setPassword(e.target.value)} type="password" autoComplete='off'/>
            <button onClick={(e) => sendToLocalStorage(e)}>Se connecter</button>
        </form>
    </div>
  )
}
