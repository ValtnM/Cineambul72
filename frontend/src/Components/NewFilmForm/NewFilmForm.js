import React from 'react'
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid'
import "./NewFilmForm.scss"

import CommuneListReducer from '../../redux/reducers/CommuneListReducer';


export default function NewFilmForm() {

  const [betaSeriesId, setBetaSeriesId] = useState();
  const [filmDetails, setFilmDetails] = useState();
  const [filmCasting, setFilmCasting] = useState();
  const [special, setSpecial] = useState(false);
  const [lieu, setLieu] = useState("");
  const [notification, setNotification] = useState()
  const [notificationResult, setNotificationResult] = useState();

  const changeSpecial = (value) => {
    setFilmDetails()
    setSpecial(value)
  }
  const changeLieu = (value) => {
    setLieu(value)
  }


  const communeList = CommuneListReducer(undefined, []);
  const [communeSelected, setCommuneSelected] = useState();


  // Modification du casting du film
  const modifyFilmCasting = (value) => {
    setFilmCasting(value)
  }

  // Modification des infos sur le film
  const modifyFilmDetails = (value, info) => {
    setFilmDetails({
      ...filmDetails,
      [info]: value
    })
  }

  // Soumission du formulaire
  const submitForm = (e) => {
    e.preventDefault();
    console.log(special);
    checkCodeBetaSeries();
    setNotification("")
    getDetailsFilm();
    getCasting();    
  }  
  
  // Vérification qu'un code à bien été saisie
  const checkCodeBetaSeries = () => {
    if(!betaSeriesId){
      setFilmDetails("")
    } 
  }

  // Envoi des données du film dans la base de données
  const sendDataFilm = () => {
    fetch('http://localhost:8080/api/film', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ...filmDetails,
        casting: filmCasting
      })
    })
    .then(res => res.json())
    // .then(data => setNotification(data.message))
    .then((data) => {
      console.log(data)
      if(data.message) {
        setNotificationResult('success')
        // messageColor = 'green';
        console.log('true');
        setNotification(data.message)
      } else if(data.erreur) {
        setNotificationResult()
        // messageColor = 'red';
        console.log('false');
        setNotification(data.erreur)
      }
    })
    .catch(err => console.log(err))
  }

  // Récupération du casting du film
  const getCasting = () => {
    fetch(`http://api.betaseries.com/movies/characters?id=${betaSeriesId}&key=fc8d53c1891c`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        let casting = formatCasting(data.characters);   
        setFilmCasting(casting)    
    })
    .catch(() => console.log("ERREUR(image)"))
  }
  
  // Récupération des infos sur le film
  const getDetailsFilm = () => {
    fetch(`http://api.betaseries.com/movies/movie?id=${betaSeriesId}&key=fc8d53c1891c`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
        setBetaSeriesId(data.movie.id)
        const titre = selectTitle(data.movie)
        const filmDate = formatDate(data.movie.release_date)
        const genre = formatGenre(data.movie.genres)
        const filmTime = formatTime(data.movie.length)
        setFilmDetails({
            codeBetaSeries: betaSeriesId,
            titre: titre,
            date: filmDate,
            genre: genre ,
            duree: filmTime,
            synopsis: data.movie.synopsis,
            afficheUrl: data.movie.poster,
            trailerUrl: `https://www.youtube.com/embed/${data.movie.trailer}`,
            realisateur: data.movie.director,
            special: special
        })
    })
    .catch((err) => console.log(err))
}

// Selection du titre du film
const selectTitle = (data) => {
  let titleSelected = "";
  
  if(data.other_title && data.other_title.language === "fr"){
    titleSelected = data.other_title.title;
  } else {
    titleSelected = data.original_title
  }
  return titleSelected;
}

// Formatage de la date de sortie du film
const formatDate = (date) => {
  let newDate = date.split('-').reverse().join('/');
  return newDate;
}

// Formatage des genres du film
const formatGenre = (array) => {
    let genreList = []
    for(let i = 0; i < array.length; i++){
        genreList.push(array[i]);
    }
    return genreList.join(', ');
}

// Formatage de la durée du film
const formatTime = (time) => {
    let newTime = time/60
    let hour = Math.floor(newTime/60)
    let minute = newTime%60;
    newTime = `${hour}h${minute}`
    return newTime;
}

// Formatage de la liste des acteurs
const formatCasting = (castingArray) => {
    let casting = [];
    for(let i = 0; i < 3; i++){
        casting.push(castingArray[i].actor);
    }
    return casting.join(', ')
}

// Récupération de l'ID BetaSeries du film
  const getBetaSeriesId = (e) => {
    setBetaSeriesId(e.target.value)
}


// Récupération de la commune selectionnée
  const getCommune = (value) => {
    communeList.forEach(element => {
      if(element.nom === value) {
        setCommuneSelected(element);
      }
    });
  }


  return (
    <div className='newfilm-form'>
        <h2>Ajoût d'un nouveau film</h2>
        <hr />
        <form action="">
            <label htmlFor="code">Code TMDB : </label>
            <input type="text" id='code' onChange={(e) => getBetaSeriesId(e)} />
            
            <div className='special'>
              <p>Séance Spéciale ?</p>
              <div>
                <label htmlFor="oui">Oui</label>
                <input type="radio" name='special' id='oui' onChange={() => changeSpecial(true)} checked={special ? "checked" : false} />
                <label htmlFor="non">Non</label>
                <input type="radio" name='special' id='non' onChange={() => changeSpecial(false)} checked={!special ? "checked" : false} />
              </div>
            </div>

            {
              special && 
              <div>
                <div className='date'>
                  <label htmlFor="date">Date : </label>
                  <input type="date" id='date' />
                  <label htmlFor="heure">Heure : </label>
                  <input type="time" id='heure'/>
                </div>

                <div className="precision">
                  <label htmlFor="precision">Info(s) complémentaire(s) : </label>
                  <textarea name="" id="precision" cols="30" rows="5" placeholder='Plein air, intervenant,...'></textarea>
                </div>

                <div className='lieu'>
                  <p>Lieu :</p>
                  <div>
                    <label htmlFor="circuit">Circuit</label>
                    <input type="radio" name='lieu' id='circuit' onChange={() => changeLieu("circuit")} checked={lieu === "circuit" ? "checked" : false} />
                    <label htmlFor="royal">Royal</label>
                    <input type="radio" name='lieu' id='royal' onChange={() => changeLieu("royal")} checked={lieu === "royal" ? "checked" : false} />
                    <label htmlFor="mulsanne">Mulsanne</label>
                    <input type="radio" name='lieu' id='mulsanne' onChange={() => changeLieu("mulsanne")} checked={lieu === "mulsanne" ? "checked" : false} />
                    <label htmlFor="autre">Autre</label>
                    <input type="radio" name='lieu' id='autre' onChange={() => changeLieu("autre")} checked={lieu === "autre" ? "checked" : false} />
                  </div>
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

            {
              (lieu == "circuit" || lieu === "mulsanne" || lieu === "autre" && special) &&
              <div className="lieu-precis">
                <label htmlFor="salle">Lieu précis : </label>
                <textarea name="salle" id="salle" cols="30" rows="5" placeholder='Salle, commune,...'></textarea>
              </div>
            }
            </div>
            }

            <button onClick={(e) => submitForm(e)}>Valider</button>
        </form>
        <div className="infos">
          {
            filmDetails &&
            <div className='details-film'>
              <form action="">
                <label htmlFor="title">Titre</label>
                <input onChange={(e) => modifyFilmDetails(e.target.value, 'titre')} type="text" id='title' value={filmDetails.titre}/>
                <label htmlFor="date">Date</label>
                <input onChange={(e) => modifyFilmDetails(e.target.value, 'date')}  type="text" id='date' value={filmDetails.date}/>
                <label htmlFor="genre">Genre(s)</label>
                <input onChange={(e) => modifyFilmDetails(e.target.value, 'genre')}  type="text" id='genre' value={filmDetails.genre}/>
                <label htmlFor="duree">Durée</label>
                <input onChange={(e) => modifyFilmDetails(e.target.value, 'duree')}  type="text" id='duree' value={filmDetails.duree}/>
                <label htmlFor="realisateur">Réalisateur</label>
                <input onChange={(e) => modifyFilmDetails(e.target.value, 'realisateur')}  type="text" id='realisateur' value={filmDetails.realisateur}/>
                <label htmlFor="casting">Casting</label>
                <input onChange={(e) => modifyFilmCasting(e.target.value)}  type="text" id='casting' value={filmCasting}/>
                <label htmlFor="synopsis">Synopsis</label>
                <textarea onChange={(e) => modifyFilmDetails(e.target.value, 'synopsis')}  rows="10" type="text" id='synopsis' value={filmDetails.synopsis}/>
                <label htmlFor="trailer">Bande annonce</label>
                <input onChange={(e) => modifyFilmDetails(e.target.value, 'trailerUrl')}  type="text" id='trailer' value={filmDetails.trailerUrl}/>
                <iframe src={filmDetails.trailerUrl} ></iframe>
                <label htmlFor="affiche">Affiche</label>
                <input onChange={(e) => modifyFilmDetails(e.target.value, 'afficheUrl')}  type="text" id='affiche' value={filmDetails.afficheUrl}/>
                <img src={filmDetails.afficheUrl} alt="" />
              </form>

              {/* <h2>{filmDetails.titre}</h2>
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
              </div> */}
              <button onClick={() => sendDataFilm()}>Envoyer</button>
                  
                
                {/* <div className='notification' style={notification === "Le film a bien été ajouté !" ? 'color: green' : 'color: red'}>TEST !</div> */}
            </div>
          }
          {
            notification && 
            <div className={notificationResult === 'success' ? 'notification success' : "notification failure"}>{notification}</div>

            
          }          
        </div>
        
    </div>
  )
}
