import React, {useState} from 'react'
import './Circuit.scss'
import FilmList from '../../Components/FilmList/FilmList'

export default function Circuit() {

  const [menu, setMenu] = useState("films")

  const changeMenu = (content) => {
    setMenu(content)
  }

  return (
    <div className='circuit'>
      <nav className='accueil-nav'>
        <ul>
          <li onClick={() => changeMenu("films")} className={menu === "films" && "active"}>Par films</li>
          <li onClick={() => changeMenu("communes")} className={menu === "communes" && "active"}>Par communes</li>
          <li onClick={() => changeMenu("tarifs")} className={menu === "tarifs" && "active"}>Tarifs</li>
          <li onClick={() => changeMenu("special")} className={menu === "special" && "active"}>Séances spéciales</li>
        </ul>
      </nav>
      {
        menu === 'films' && 
        <FilmList title="Circuit itinérant" />
      }
    </div>
  )
}
