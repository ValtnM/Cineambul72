import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import "./FilmDetails.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'

import SeanceListReducer from '../../redux/reducers/SeanceListReducer';
import RoyalSeanceListReducer from '../../redux/reducers/RoyalSeanceListReducer';
import MulsanneSeanceListReducer from '../../redux/reducers/MulsanneSeanceListReducer';

export default function FilmDetails() {
   
    const circuitUrl = document.location.href.split('/')[4];

  const [menu, setMenu] = useState(circuitUrl)

  // console.log(document.location.href.split('/')[4]);
  

  const changeMenu = (content) => {
    setMenu(content)
  } 

  useEffect(() => {
    setMenu(circuitUrl)
  }, [circuitUrl])

  const seanceList = SeanceListReducer(undefined, [])
  const royalSeanceList = RoyalSeanceListReducer(undefined, [])
  const mulsanneSeanceList = MulsanneSeanceListReducer(undefined, [])



  return (
    <div className='film-details'>
        <div className="details">
            <img src="/affiches/bruno-reidal.jpg" alt="" />
            <div className="infos">
                <h2>L'Année du requin</h2>
                <div className='infos-technique'>
                    <p className='date'>03/08/2022</p>
                    <p className='genre'>Action</p>
                    <p className='duree'>1h27</p>
                </div>
                <div className="realisateur"><span>Par : </span>Zoran Boukherma, Ludovic Boukherma</div>
                <div className="casting"><span>Avec : </span>Marina Foïs, Kad Merad, Jean-Pascal Zadi</div>
                <div className="synopsis">
                    <h3>Synopsis</h3>
                    <p>
                        Maja, gendarme maritime dans les landes, voit se réaliser son pire cauchemar : prendre sa retraite anticipée ! Thierry, son mari, a déjà prévu la place de camping et le mobil home. Mais la disparition d’un vacancier met toute la côte en alerte : un requin rôde dans la baie ! Aidée de ses jeunes collègues Eugénie et Blaise, elle saute sur l’occasion pour s’offrir une dernière mission.
                    </p>
                </div>
            </div>
        </div>
        <div className="seances">

            <nav className='film-nav'>
                <ul>
                    <Link to="/film/bande-annonce" ><li onClick={() => changeMenu("bande-annonce")} className={menu === "bande-annonce" ? "active" : ""}>Bande annonce</li></Link>
                    <Link to="/film/circuit-itinerant" ><li onClick={() => changeMenu("circuit-itinerant")} className={menu === "circuit-itinerant" ? "active" : ""}>Circuit itinérant</li></Link>
                    <Link to="/film/cinema-le-royal" ><li onClick={() => changeMenu("cinema-le-royal")} className={menu === "cinema-le-royal" ? "active" : ""}>Le Royal</li></Link>
                    <Link to="/film/cinema-mulsanne" ><li onClick={() => changeMenu("cinema-mulsanne")} className={menu === "cinema-mulsanne" ? "active" : ""}>Mulsanne</li></Link>
                </ul>
            </nav>

            {
                menu === "bande-annonce" &&
                <div className='trailer'>
                    <iframe src="https://www.youtube.com/embed/HN0YsIbHTOs" title="L'ANNÉE DU REQUIN Bande Annonce (Comédie Française, 2022)" frameborder="0"></iframe>
                </div>
            }

            {
                menu === "circuit-itinerant" &&
                <div className='circuit'>
                    <ul>
                        {
                            seanceList.map(seance => (
                                <li>
                                    <div className="seance-title">
                                        <FontAwesomeIcon className='icon' icon={faCircle} />
                                        <h4>{seance.commune}</h4>                      
                                    </div>
                                    <div className="seance-details">
                                        <div className="seance-location">
                                            <FontAwesomeIcon className='icon' icon={faLocationDot} />
                                            <p>{seance.salle}</p>
                                        </div>
                                        <div className="seance-date">
                                            <FontAwesomeIcon className='icon' icon={faCalendarDays} />
                                            <p>{seance.date}</p>
                                        </div>
                                    </div>
                                    
                                </li>
                            ))
                        }                        
                    </ul>
                </div>
            }

            {
                menu === "cinema-le-royal" && 
                <div className='salle-fixe'>
                    <ul>
                        {
                            royalSeanceList.map(seance => (
                                <li>
                                    <FontAwesomeIcon className='icon' icon={faCircleChevronRight} />
                                    <h4>{seance.date}</h4>
                                    <p>{seance.version}</p>
                                </li>
                            ))
                        }                        
                    </ul>
                </div>
            }

            {
                menu === "cinema-mulsanne" && 
                <div className='salle-fixe'>
                    <ul>
                        {
                            mulsanneSeanceList.map(seance => (
                                <li>
                                    <FontAwesomeIcon className='icon' icon={faCircleChevronRight} />
                                    <h4>{seance.date}</h4>
                                    <p>{seance.version}</p>
                                </li>
                            ))
                        }                        
                    </ul>
                </div>
            }
        </div>
    </div>
  )
}
