import React, {useState, useEffect} from 'react'
import {Link, Outlet, useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './Mulsanne.scss'
import Message from '../../Components/Message/Message';
import PhotoViewer from '../../Components/PhotoViewer/PhotoViewer';

import ViewerModeReducer from '../../redux/reducers/ViewerModeReducer';


export default function Mulsanne() {

  useParams();

  const mulsanneUrl = document.location.href.split('/')[4];

  const [delay, setDelay] = useState(false)
  const [menu, setMenu] = useState(mulsanneUrl)
  const viewerModeState = useSelector(state => state.ViewerModeReducer);

  useEffect(() => {
    setTimeout(() => {
      setDelay(true)
    }, 400)
  }, [])
  
  useEffect(() => {
    setMenu(mulsanneUrl)
  }, [mulsanneUrl])

  return (
    <div className='mulsanne'>
      <Message pageName="mulsanne"></Message>
      {
        delay &&
        <div>
          <nav className='accueil-nav'>
            <ul>
              <Link className={menu === "a-laffiche" ? "active" : ""} to="/mulsanne/a-laffiche"><li>à l'affiche</li></Link>
              <Link className={menu === "la-salle" ? "active" : ""} to="/mulsanne/la-salle"><li>La salle</li></Link>
              <Link className={menu === "tarifs" ? "active" : ""} to="/mulsanne/tarifs"><li>Tarifs</li></Link>
            </ul>
          </nav>
          <Outlet />  
          {
            viewerModeState.toggle &&
            <PhotoViewer />
          }    
        </div>
      }
    </div>
  )
}
