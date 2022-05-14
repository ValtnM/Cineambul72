import React, {useState, useEffect} from 'react'
import "./Navbar.scss"
import {Link} from 'react-router-dom'

import burgerNav from '../../assets/img/bars-solid.svg'

export default function Navbar() {

    const [toggleMenu, setToggleMenu] = useState(false);
    const [largeur, setLargeur] = useState(window.innerWidth)

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
                    <Link to="/">Accueil</Link>
                </li>
                <li className='items'>
                    <Link to="/circuit-itinerant">Circuit itinérant</Link>
                </li>
                <li className='items'>
                    <Link to="/le-royal">Le Royal</Link>
                </li>
                <li className='items'>
                    <Link to="/mulsanne">Mulsanne</Link>
                </li>
                <li className='items'>
                    <a href="https://www.cinemazoom.fr/">Le Zoom</a>
                </li>
                <li className='items'>
                    <Link to="/le-royal">Contact</Link>
                </li>
            </ul>
        }
        <img onClick={toggle} src={burgerNav} alt="bouton burger" className='btn' />
    </nav>
  )
}