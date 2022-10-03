import React, {useState, useEffect} from 'react'
import './Circuit.scss'
import { Link, Outlet, useParams } from 'react-router-dom'
import Message from '../../Components/Message/Message';

export default function Circuit() {

  useParams();

  const circuitUrl = document.location.href.split('/')[4];

  const [delay, setDelay] = useState(false)
  const [menu, setMenu] = useState()

  useEffect(() => {
    setTimeout(() => {
      setDelay(true)
    }, 400)
  }, [])

  useEffect(() => {
    setMenu(circuitUrl)
  }, [circuitUrl])   

  return (
    <div className='circuit-block'>
      <Message pageName='circuit'></Message>
      {
        delay &&
        <div>
          <nav className='accueil-nav'>
            <ul>
              <Link to="/circuit-itinerant" className={menu === undefined ? 'active' : ''}><li>Par films</li></Link>
              <Link to="/circuit-itinerant/par-communes" className={menu === "par-communes" ? 'active' : ''} ><li >Par Communes</li></Link>
              <Link to="/circuit-itinerant/tarifs" className={menu === "tarifs" ? 'active' : ''}><li >Tarifs</li></Link>
            </ul>
          </nav>

          <Outlet className="outlet" />      
        </div>
      }
    </div>
  )
}
