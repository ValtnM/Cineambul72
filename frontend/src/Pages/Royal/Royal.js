import React, {useState, useEffect} from 'react'
import {Link, Outlet, useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './Royal.scss'
import Message from '../../Components/Message/Message';
import PhotoViewer from '../../Components/PhotoViewer/PhotoViewer';

import ViewerModeReducer from '../../redux/reducers/ViewerModeReducer';

export default function Royal() {

  useParams();

  const royalUrl = document.location.href.split('/')[4];

  const [delay, setDelay] = useState(false);
  const [menu, setMenu] = useState(royalUrl)  ;
  const viewerModeState = useSelector(state => state.ViewerModeReducer);

  
  useEffect(() => {
    setTimeout(() => {
      setDelay(true)
    }, 400)
  }, [])

  useEffect(() => {
    console.log(viewerModeState);

  }, [viewerModeState])
  
  useEffect(() => {
    setMenu(royalUrl)
  }, [royalUrl])

  return (
    <div className='royal'>
      <Message pageName="royal"></Message>
      {
        delay &&
        <div>
          <nav className='accueil-nav'>
            <ul>
              <Link className={menu === "a-laffiche" ? "active" : ""} to="/le-royal/a-laffiche"><li>à l'affiche</li></Link>
              <Link className={menu === "la-salle" ? "active" : ""} to="/le-royal/la-salle"><li>La salle</li></Link>
              <Link className={menu === "tarifs" ? "active" : ""} to="/le-royal/tarifs"><li>Tarifs</li></Link>
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
