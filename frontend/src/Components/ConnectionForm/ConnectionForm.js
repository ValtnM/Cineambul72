import React from 'react'
import "./ConnectionForm.scss"

export default function ConnectionForm() {
  return (
    <div className='connection-form'>
        <h2>Connexion administrateur</h2>
        <form action="">
            <label htmlFor="">Identifiant</label>
            <input type="text" />
            <label htmlFor="">Mot de passe</label>
            <input type="password" />
            <button>Se connecter</button>
        </form>
    </div>
  )
}
