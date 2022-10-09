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
        setToggleMenu(false)          
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
    <nav className={toggleMenu || largeur > 900 ? 'navbar' : 'navbar hidden'}>
            <ul>
                <Link onClick={() => sendPageUrl("")} to="/">
                    <li className={pageName === "" ? "active items" : "items"}>Accueil</li>
                </Link>
                <Link onClick={() => sendPageUrl("circuit-itinerant")} to="/circuit-itinerant">
                    <li className={pageName === "circuit-itinerant" ? "active items" : "items"}>Circuit itinérant</li>
                </Link>
                <Link onClick={() => sendPageUrl("le-royal")}  to="/le-royal/a-laffiche">
                    <li className={pageName === "le-royal" ? "active items" : "items"}>Le Royal</li>
                </Link>
                <Link onClick={() => sendPageUrl("mulsanne")} to="/mulsanne/a-laffiche">
                    <li className={pageName === "mulsanne" ? "active items" : "items"}>Mulsanne</li>
                </Link>
                <Link onClick={() => sendPageUrl("evenements")} to="/evenements">
                    <li className={pageName === "evenements" ? "active items" : "items"}>Évènements</li>
                </Link>
            </ul>
        <img onClick={() => toggle()} src={burgerNav} alt="bouton burger" className='btn' />
    </nav>
  )
}
