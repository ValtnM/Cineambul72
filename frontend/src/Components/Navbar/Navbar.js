import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import "./Navbar.scss"
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'

import burgerNav from '../../assets/img/bars-solid.svg'

import PageUrlReducer from '../../redux/reducers/PageUrlReducer'

export default function Navbar() {

    const [toggleMenu, setToggleMenu] = useState(false);
    const [largeur, setLargeur] = useState(window.innerWidth);
    const [pageName, setPageName] = useState();

    const pageUrl = useSelector(state => state.PageUrlReducer)


    const dispatch = useDispatch();

    
    const toggle = () => {
        setToggleMenu(!toggleMenu);
    }

    useEffect(() => {
        setPageName(pageUrl)            
    }, [pageUrl])
    
    useEffect(() => {
        setPageName(document.location.href.split('/')[3])
        const changeWidth = () => {
            setLargeur(window.innerWidth);
        }

        window.addEventListener('resize', changeWidth);

        return () => {
            window.removeEventListener('resize', changeWidth);
        }
    }, [])

    const sendPageUrl = (data) => {
        dispatch({
          type: "CHANGEURL",
          payload: data
        })
      }

  return (
    <nav className='navbar'>
        {(toggleMenu || largeur > 800) &&
            <ul>
                <li className='items'>
                    <Link onClick={() => sendPageUrl("")} className={pageName ===  "" ? "active" : ""}  to="/">Accueil</Link>
                </li>
                <li className='items'>
                    <Link onClick={() => sendPageUrl("circuit-itinerant")} className={pageName === "circuit-itinerant" ? "active" : ""} to="/circuit-itinerant">Circuit itinérant</Link>
                </li>
                <li className='items'>
                    <Link onClick={() => sendPageUrl("le-royal")} className={pageName === "le-royal" ? "active" : ""} to="/le-royal/a-laffiche">Le Royal</Link>
                </li>
                <li className='items'>
                    <Link onClick={() => sendPageUrl("mulsanne")} className={pageName === "mulsanne" ? "active" : ""} to="/mulsanne/a-laffiche">Mulsanne</Link>
                </li>
                <li className='items'>
                    <a href="https://www.cinemazoom.fr/" target="_blank">Le Zoom</a>
                </li>
                <li className='items'>
                    <Link onClick={() => sendPageUrl("evenements")}  className={pageName === "evenements" ? "active" : ""} to="/evenements">Évènements</Link>
                </li>
            </ul>
        }
        <img onClick={toggle} src={burgerNav} alt="bouton burger" className='btn' />
    </nav>
  )
}
