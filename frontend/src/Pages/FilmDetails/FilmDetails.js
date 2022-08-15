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
  const [filmDetails, setFilmDetails] = useState()
  const [filmImage, setFilmImage] = useState();
  const [filmCasting, setFilmCasting] = useState();

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
    
    
    useEffect(() => {
        // getImg();
        getDetailsFilm();
        getCasting()
        // getMovies()
  }, [])
   
//   const getMovies = () => {
//     fetch('http://api.betaseries.com/movies/movie?id=105936&key=fc8d53c1891c')
//     .then((res) => {
//         return res.json();
//     })
//     .then((data) => {
//         console.log(data);
//         const image = data.file_path;
//         setFilmDetails({
//             ...filmDetails,
//             image: image
//         })
//     })
//     .catch(() => console.log("ERREUR(image)"))
//   }



  const getCasting = () => {
    fetch('http://api.betaseries.com/movies/characters?tmdb_id=833384&id=105936&key=fc8d53c1891c')
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        let casting = formatCasting(data.characters);   
        setFilmCasting(casting)    
    })
    .catch(() => console.log("ERREUR(image)"))
  }

//   const getImg = () => {
//     fetch('https://api.themoviedb.org/3/movie/833384/images?api_key=b9f8ef66e3f4c75d18245c0079fc0f37&language=fr')
//     .then((res) => {
//         return res.json();
//     })
//     .then((data) => {
//         const image = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.posters[0].file_path}`;
//         setFilmImage({
//             image: image
//         })
//     })
//     .catch(() => console.log("ERREUR(image)"))
//   }

  const getDetailsFilm = () => {
    fetch('http://api.betaseries.com/movies/movie?tmdb_id=833384&id=105936&key=fc8d53c1891c')
    .then((res) => {
      return res.json()
    })
    .then((data) => {
        console.log(data.movie);
        const filmDate = formatDate(data.movie.release_date)
        const genre = formatGenre(data.movie.genres)
        const filmTime = formatTime(data.movie.length)
        setFilmDetails({
            titre: data.movie.title,
            date: filmDate,
            genre: genre ,
            duree: filmTime,
            synopsis: data.movie.synopsis,
            affiche: data.movie.poster,
            trailer: data.movie.trailer,
            realisateur: data.movie.director
        })
    })
    .catch(() => console.log('EEREIR'))
    console.log(filmDetails);
}

  
  const formatDate = (date) => {
      let newDate = date.split('-').reverse().join('/');
      return newDate;
    }

    const formatGenre = (array) => {
        let genreList = []
        for(let i = 0; i < array.length; i++){
            genreList.push(array[i]);
        }
        console.log(genreList);
        return genreList.join(', ');
    }

    const formatTime = (time) => {
        let newTime = time/60
        let hour = Math.floor(newTime/60)
        let minute = newTime%60;
        newTime = `${hour}h${minute}`
        return newTime;
    }

    const formatCasting = (castingArray) => {
        let casting = [];
        for(let i = 0; i < 3; i++){
            casting.push(castingArray[i].actor);
        }
        return casting.join(', ')
    }



  

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
  }




  return (
    <div className='film-details'>
        {
            filmDetails && 
        <div className="details">           
            <img src={filmDetails.affiche} alt="" />            
            <div className="infos">
                <h2>{filmDetails.titre}</h2>
                <div className='infos-technique'>
                    <p className='date'>{filmDetails.date}</p>
                    <p className='genre'>{filmDetails.genre}</p>
                    <p className='duree'>{filmDetails.duree}</p>
                </div>
                <div className="realisateur"><span>Par : </span>{filmDetails.realisateur}</div>
                {
                    filmCasting &&
                    <div className="casting"><span>Avec : </span>{filmCasting}</div>
                }
                <div className="synopsis">
                    <h3>Synopsis</h3>
                    <p>{filmDetails.synopsis}</p>
                </div>
                
            </div>
        </div>
        }
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
                    {
                        // console.log(filmDetails.trailer)
                        filmDetails &&                       
                             
                            <iframe src={`https://www.youtube.com/embed/${filmDetails.trailer}`} title="L'ANNÉE DU REQUIN Bande Annonce (Comédie Française, 2022)"></iframe>
                            // <iframe width="1189" height="669" src="https://www.youtube.com/embed/HN0YsIbHTOs" title="L'ANNÉE DU REQUIN Bande Annonce (Comédie Française, 2022)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        
                    }
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
