import React, {useState, useEffect} from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import './Evenements.scss'
import Message from '../../Components/Message/Message'
import FilmList from '../../Components/FilmList/FilmList'

export default function Evenements() {

  const [delay, setDelay] = useState(false)
  const [menu, setMenu] = useState()

  useEffect(() => {
    setTimeout(() => {
      setDelay(true)
    }, 400)
  }, [])

  return (
    <div className='evenements'>
        <Message pageName="evenements"></Message>
        {
          delay &&
          <div>
            <nav className='accueil-nav'>
              <ul>
                <Link to="/evenements" className={menu === undefined ? 'active' : ''}><li onClick={() => setMenu(undefined)}>Évènements</li></Link>
                <Link to="/evenements/seances-speciales" className={menu === "seances-speciales" ? 'active' : ''} ><li onClick={() => setMenu('seances-speciales')}>Séances Spéciales</li></Link>
                
              </ul>
          </nav>
            {/* <FilmList title="Séances évènements"></FilmList> */}
            <Outlet></Outlet>
          </div>
        }
    </div>
  )
}
