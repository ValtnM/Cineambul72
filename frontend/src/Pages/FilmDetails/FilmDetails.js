import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import "./FilmDetails.scss"
import {v4 as uuidv4} from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons'

import SeanceListReducer from '../../redux/reducers/SeanceListReducer';
import RoyalSeanceListReducer from '../../redux/reducers/RoyalSeanceListReducer';
import MulsanneSeanceListReducer from '../../redux/reducers/MulsanneSeanceListReducer';
import CommuneListReducer from '../../redux/reducers/CommuneListReducer';

export default function FilmDetails() {
   
const circuitUrl = document.location.href.split('/')[4];


  const [menu, setMenu] = useState(circuitUrl)
//   const [admin, setAdmin] = useState(true)
  const admin = true; 
  const [lieu, setLieu] = useState("circuit")

  // console.log(document.location.href.split('/')[4]);
  

  const changeMenu = (content) => {
    setMenu(content)
  } 

  useEffect(() => {
    setMenu(circuitUrl)
  }, [circuitUrl])


  const changeLieu = (value) => {
    setLieu(value)
  }


//   useEffect(() => {
//     console.log(lieu);
//   }, [lieu])


  

  const seanceList = SeanceListReducer(undefined, [])
  const royalSeanceList = RoyalSeanceListReducer(undefined, [])
  const mulsanneSeanceList = MulsanneSeanceListReducer(undefined, [])
  const communeList = CommuneListReducer(undefined, []);



  const [communeSelected, setCommuneSelected] = useState();

  const getCommune = (value) => {
    communeList.forEach(element => {
      if(element.nom === value) {
        setCommuneSelected(element);
      }
    });
  }

  const showURL = (e) => {
    e.preventDefault();
    console.log(document.getElementById('trailer').value);
  }




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

            {
                admin && 
                <div className='seance-form'>
                    <h2>Ajouter une séance</h2>
                    <form action="">
                        <div className='lieu'>
                            <label htmlFor="circuit">Circuit</label>
                            <input type="radio" id="circuit" name="lieu" value="circuit" onChange={() => changeLieu('circuit')} checked={lieu === "circuit" ? "checked" : false}/>
                            <label htmlFor="royal">Royal</label>
                            <input type="radio" id="royal" name="lieu" value="royal" onChange={() => changeLieu('royal')}  checked={lieu === "royal" ? "checked" : false}/>
                            <label htmlFor="mulsanne">Mulsanne</label>
                            <input type="radio" id="mulsanne" name="lieu" value="mulsanne" onChange={() => changeLieu('mulsanne')}  checked={lieu === "mulsanne" ? "checked" : false}/>
                        </div>
                        {
                            lieu === "circuit" &&
                            <div className="communes">
                                <select onChange={(e) => getCommune(e.target.options[e.target.selectedIndex].text)} name="communes">
                                    <option key={uuidv4()} value="Null">Sélectionner une commune</option>
                                    {communeList.map(commune => (
                                        <option key={uuidv4()} value={commune}>{commune.nom}</option>
                                    ))}
                                </select>        
                            </div>
                            }
                        <div className="date">
                            <label htmlFor="date">Saisir la date : </label>
                            <input type="date" name="" id="date" />
                            <label htmlFor="heure">Saisir l'heure : </label>
                            <input type="time" name="" id="heure" />
                        </div>

                        <div className="trailer-url">
                            <label htmlFor="trailer">URL bande annonce :</label>
                            <input type="text" id="trailer"/>
                        </div>

                        <button onClick={(e) => showURL(e)}>Valider</button>
                    </form>
                </div>
            }

            {/* {
                admin & special && 

            } */}

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
                    <iframe src="https://www.youtube.com/embed/HN0YsIbHTOs" title="L'ANNÉE DU REQUIN Bande Annonce (Comédie Française, 2022)"></iframe>
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
