import React from 'react'
// import { useState } from 'react'
import './Admin.scss'

import ConnectionForm from '../../Components/ConnectionForm/ConnectionForm'
import NewFilmForm from '../../Components/NewFilmForm/NewFilmForm'

export default function Admin() {

  // const [admin, setAdmin] = useState(true)
  const admin = true

  // const changeState = () => {
  //   setAdmin(!admin)
  // }

  return (

    <div className='admin'>


      {
        !admin &&
        <ConnectionForm></ConnectionForm>
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
        <NewFilmForm></NewFilmForm>
      }

        {/* <button onClick={changeState}>Change</button> */}


    </div>
  )
}
