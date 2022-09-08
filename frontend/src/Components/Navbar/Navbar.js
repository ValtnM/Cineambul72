import React, {useState, useEffect} from 'react'
import "./Navbar.scss"
import {Link} from 'react-router-dom'

import burgerNav from '../../assets/img/bars-solid.svg'

export default function Navbar() {
    let accueilUrl = document.location.href.split('/')[3];

    const [toggleMenu, setToggleMenu] = useState(false);
    const [largeur, setLargeur] = useState(window.innerWidth);
    const [pageUrl, setPageUrl] = useState(accueilUrl);
    
    const toggle = () => {
        setToggleMenu(!toggleMenu);
    }

    useEffect(() => {
        const changeWidth = () => {
            setLargeur(window.innerWidth);
        }

        window.addEventListener('resize', changeWidth);

        return () => {
            window.removeEventListener('resize', changeWidth);
        }
    }, [])

  return (
    <nav className='navbar'>
        {(toggleMenu || largeur > 800) &&
            <ul>
                <li className='items'>
                    <Link onClick={() => setPageUrl("accueil")} className={pageUrl ===  "accueil" ? "active" : ""}  to="/">Accueil</Link>
                </li>
                <li className='items'>
                    <Link onClick={() => setPageUrl("circuit-itinerant")} className={pageUrl === "circuit-itinerant" ? "active" : ""} to="/circuit-itinerant">Circuit itinérant</Link>
                </li>
                <li className='items'>
                    <Link onClick={() => setPageUrl("le-royal")} className={pageUrl === "le-royal" ? "active" : ""} to="/le-royal/a-laffiche">Le Royal</Link>
                </li>
                <li className='items'>
                    <Link onClick={() => setPageUrl("mulsanne")} className={pageUrl === "mulsanne" ? "active" : ""} to="/mulsanne/a-laffiche">Mulsanne</Link>
                </li>
                <li className='items'>
                    <a href="https://www.cinemazoom.fr/" target="_blank">Le Zoom</a>
                </li>
                <li className='items'>
                    <Link onClick={() => setPageUrl("evenements")}  className={pageUrl === "evenements" ? "active" : ""} to="/evenements">Évènements</Link>
                </li>
            </ul>
        }
        <img onClick={toggle} src={burgerNav} alt="bouton burger" className='btn' />
    </nav>
  )
}
