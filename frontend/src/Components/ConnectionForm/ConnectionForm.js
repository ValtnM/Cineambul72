import React, {useState} from 'react'
import "./ConnectionForm.scss"

export default function ConnectionForm(props) {

  const [showPassword, setShowPassword] = useState(false);  
  
  // Envoi des identifiants de connexion
  const submitConnectionData = (e) => {
    e.preventDefault();
    props.login();
  }

  return (
    <div className='connection-form'>
        <h2>Connexion administrateur</h2>
        <form>
            <label htmlFor="username">Identifiant</label>
            <input onChange={(e) => props.setUserName(e.target.value)} type="text" id='username' />
            <label htmlFor="password">Mot de passe</label>
            {
              showPassword ?
              <input onChange={(e) => props.setPassword(e.target.value)} type="text" id='password' autoComplete='off'/>
              :
              <input onChange={(e) => props.setPassword(e.target.value)} type="password" autoComplete='off' id='password'/>
            }
            <div className="password-checkbox">
              <label htmlFor="display-password">Afficher le mot de passe</label>
              <input onChange={(e) => setShowPassword(e.target.checked)} type="checkbox" id="display-password"/>
            </div>
            <button onClick={(e) => submitConnectionData(e)}>Se connecter</button>
        </form>
    </div>
  )
}
