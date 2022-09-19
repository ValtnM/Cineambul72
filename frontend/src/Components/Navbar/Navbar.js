import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import "./Navbar.scss"
import {Link} from 'react-router-dom'
import burgerNav from '../../assets/img/bars-solid.svg'

import PageUrlReducer from '../../redux/reducers/PageUrlReducer'

export default function Navbar() {

    const [toggleMenu, setToggleMenu] = useState(false);
    const [largeur, setLargeur] = useState(window.innerWidth);
    const [pageName, setPageName] = useState();

    const pageUrl = useSelector(state => state.PageUrlReducer)

    const dispatch = useDispatch();
    
    // Toggle pour l'apparition et la disparition du menu sur petit écran
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

    // Envoi de l'url de la page
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
                <li className={pageName === "" ? "active items" : "items"}>
                    <Link onClick={() => sendPageUrl("")} to="/">Accueil</Link>
                </li>
                <li className={pageName === "circuit-itinerant" ? "active items" : "items"}>
                    <Link onClick={() => sendPageUrl("circuit-itinerant")} to="/circuit-itinerant">Circuit itinérant</Link>
                </li>
                <li className={pageName === "le-royal" ? "active items" : "items"}>
                    <Link onClick={() => sendPageUrl("le-royal")}  to="/le-royal/a-laffiche">Le Royal</Link>
                </li>
                <li className={pageName === "mulsanne" ? "active items" : "items"}>
                    <Link onClick={() => sendPageUrl("mulsanne")} to="/mulsanne/a-laffiche">Mulsanne</Link>
                </li>
                <li className="items">
                    <a href="https://www.cinemazoom.fr/" target="_blank">Le Zoom</a>
                </li>
                <li className={pageName === "evenements" ? "active items" : "items"}>
                    <Link onClick={() => sendPageUrl("evenements")} to="/evenements">Évènements</Link>
                </li>
            </ul>
        }
        <img onClick={() => toggle()} src={burgerNav} alt="bouton burger" className='btn' />
    </nav>
  )
}
