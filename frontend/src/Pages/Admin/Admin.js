import React, { useState, useEffect } from 'react'
import './Admin.scss'

import ConnectionForm from '../../Components/ConnectionForm/ConnectionForm'
import NewFilmForm from '../../Components/NewFilmForm/NewFilmForm'

export default function Admin() {

  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, [])
  

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
        // <div className='connection-form'>
        //     <h2>Connexion administrateur</h2>
        //     <form action="">
        //         <label htmlFor="">Identifiant</label>
        //         <input type="text" />
        //         <label htmlFor="">Mot de passe</label>
        //         <input type="password" />
        //         <button>Se connecter</button>
        //     </form>
        // </div>
      }

      {
        admin && 
        <NewFilmForm checkAdmin={checkAdmin}></NewFilmForm>
      }

        {/* <button onClick={changeState}>Change</button> */}


    </div>
  )
}
