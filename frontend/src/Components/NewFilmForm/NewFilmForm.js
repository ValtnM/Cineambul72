import React from 'react'
import { useState, useEffect } from 'react';
import "./NewFilmForm.scss"
import CommuneList from '../CommuneList/CommuneList';



export default function NewFilmForm() {

  const [tmdbId, setTmdbId] = useState();
  const [filmDetails, setFilmDetails] = useState();
  const [filmCasting, setFilmCasting] = useState();
  const [trailerUrl, setTrailerUrl] = useState();
  const [special, setSpecial] = useState(false);  
  const [lieu, setLieu] = useState("");
  const [communeList, setCommuneList] = useState(); 
  const [communeSelected, setCommuneSelected] = useState();
  const [notification, setNotification] = useState()
  const [notificationResult, setNotificationResult] = useState();

  // Mise à jour de la liste des communes
  useEffect(() => {
    getCommunesList()
  }, [lieu])

  useEffect(() => {
    console.log(trailerUrl);
  }, [trailerUrl])

    // Récupération de la valeur de "spécial"
  const changeSpecial = (value) => {
    setFilmDetails()
    setSpecial(value)
  }

  // Récupération de la valeur de "lieu"
  const changeLieu = (value) => {
    setLieu(value)
  }

  
  // Modification des infos sur le film
  const modifyFilmDetails = (value, info) => {
    setFilmDetails({
      ...filmDetails,
      [info]: value
    })
  }
  // Modification du casting du film
  const modifyFilmCasting = (value, info) => {
    setFilmCasting({
      ...filmCasting,
      [info]: value
    })
  }

  
  // Soumission du formulaire
  const submitForm = (e) => {
    e.preventDefault();
    checkTmdbCode();
    setNotification("")
    if(tmdbId){
      getFilmDetails();
      getFilmCast();
      getFilmTrailer();  
    }
  }  
  
  // Vérification qu'un code à bien été saisie
  const checkTmdbCode = () => {
    if(!tmdbId){
      setFilmDetails("")
      setFilmCasting("")
      setTrailerUrl("")
    } 
  }

  // Envoi des données du film dans la base de données
  const sendDataFilm = () => {
    console.log(filmDetails);
    fetch('http://localhost:8080/api/film', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ...filmDetails,
        realisateur: filmCasting.realisateur,
        acteurs: filmCasting.acteurs,
        trailerUrl: `https://www.youtube.com/embed/${trailerUrl}`,
        special: special
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


  const getFilmDetails = () => {
    fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=b9f8ef66e3f4c75d18245c0079fc0f37&language=fr`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setFilmDetails({
        codeTMDB: tmdbId,
        titre: data.title,
        date: formatDate(data.release_date),
        genre: formatGenre(data.genres) ,
        duree: formatDuration(data.runtime),
        synopsis: data.overview,
        afficheUrl: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}`,
      })       
    })
    .catch(err => console.log(err))
}   


const formatDate = (date) => {
    let formatedDate = date.split("-").reverse().join("/");
    return formatedDate;
}

const formatGenre = (genres) => {
    let formatedGenres = [];
    genres.forEach(element => {
        formatedGenres.push(element.name)
    });
    return formatedGenres.join(", ");
}

const formatDuration = (duration) => {
    let hour = Math.floor(duration/60)
    let minutes = duration - (hour*60);
    return `${hour}h${minutes}`
}



const getFilmCast = () => {
    fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/credits?api_key=b9f8ef66e3f4c75d18245c0079fc0f37`)
    .then(res => res.json())
    .then(data => {
      setFilmCasting({
        realisateur: formatDirector(data.crew),
        acteurs: formatCast(data.cast)
      })        
    })
    .catch(err => console.log(err))
};


const formatCast = (castArray) => {
    let formatedCast = [];
    for(let i = 0; i < 3; i++){
        formatedCast.push(castArray[i].name);
    }
    
    return formatedCast.join(", ");
}

const formatDirector = (crewArray) => {
    let formatedDirector = [];
    let sortedCrew = crewArray.filter(person => person.job === "Director");
    sortedCrew.forEach(director => {
        formatedDirector.push(director.name)
    })
    console.log(formatedDirector.join(", "));

    return formatedDirector.join(", ");
}



const getFilmTrailer = () => {
  fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=b9f8ef66e3f4c75d18245c0079fc0f37&language=fr`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
      for(let i = 0; i < data.results.length; i++){
        
          if (data.results[i].site === "YouTube") {
              setTrailerUrl(data.results[i].key);
          }
      }     
  })
  .catch(err => console.log(err))
}   



//   // Récupération du casting du film
//   const getCasting = () => {
//     console.log(betaSeriesId);
//     // fetch(`https://api.thecatapi.com/v1/images/search`, {
//     fetch(`https://api.themoviedb.org/3/movie/${betaSeriesId}/credits?api_key=b9f8ef66e3f4c75d18245c0079fc0f37`,{
//       method: "GET",
//       headers: {'Content-Type': 'application/json'},
//     })
//     .then(res => res.json())
//     .then((data) => {
//       setFilmCasting({
//         acteur: formatCast(data.cast),
//         realisateur: formatDirector(data.crew)
//       })
//         // let casting = formatCasting(data.characters);   
//         // setFilmCasting(casting)    
//     })
//     .catch((err) => console.log(err))
//   }
  
//   // Récupération des infos sur le film
//   const getDetailsFilm = () => {
//     fetch(`http://api.betaseries.com/movies/movie?id=${betaSeriesId}&key=fc8d53c1891c`,{
//       // mode: 'no-cors',
//       method: "GET",
//       // headers: {'Content-Type': 'application/json'},
//     })
//     .then(res => res.json())
//     .then((data) => {
//       console.log(data);
//         setBetaSeriesId(data.movie.id)
//         const titre = selectTitle(data.movie)
//         const filmDate = formatDate(data.movie.release_date)
//         const genre = formatGenre(data.movie.genres)
//         const filmTime = formatTime(data.movie.length)
//         setFilmDetails({
//             codeBetaSeries: betaSeriesId,
//             titre: titre,
//             date: filmDate,
//             genre: genre ,
//             duree: filmTime,
//             synopsis: data.movie.synopsis,
//             afficheUrl: data.movie.poster,
//             trailerUrl: `https://www.youtube.com/embed/${data.movie.trailer}`,
//             realisateur: data.movie.director,
//             special: special
//         })
//     })
//     .catch((err) => console.log(err))
// }

// // Selection du titre du film
// const selectTitle = (data) => {
//   let titleSelected = "";
  
//   if(data.other_title && data.other_title.language === "fr"){
//     titleSelected = data.other_title.title;
//   } else {
//     titleSelected = data.original_title
//   }
//   return titleSelected;
// }

// // Formatage de la date de sortie du film
// const formatDate = (date) => {
//   let newDate = date.split('-').reverse().join('/');
//   return newDate;
// }

// // Formatage des genres du film
// const formatGenre = (array) => {
//     let genreList = []
//     for(let i = 0; i < array.length; i++){
//         genreList.push(array[i]);
//     }
//     return genreList.join(', ');
// }

// // Formatage de la durée du film
// const formatTime = (time) => {
//     let newTime = time/60
//     let hour = Math.floor(newTime/60)
//     let minute = newTime%60;
//     newTime = `${hour}h${minute}`
//     return newTime;
// }

// // Formatage de la liste des acteurs
// const formatCast = (castArray) => {
//     let formatedCast = [];
//     for(let i = 0; i < 3; i++){
//         formatedCast.push(castArray[i].name);
//     }
    
//     return formatedCast.join(", ");
// }

// const formatDirector = (crewArray) => {
//   let formatedDirector = [];
//   let sortedCrew = crewArray.filter(person => person.job === "Director");
//   sortedCrew.forEach(director => {
//       formatedDirector.push(director.name)
//   })
  
//   return formatedDirector.join(", ");
// }

// Récupération de l'ID BetaSeries du film
  const getTmdbId = (e) => {
    setTmdbId(e.target.value)
}

// Récupération des informations de la commune selectionnée
const getInfosCommune = (value) => {
  communeList.forEach(element => {
    if(element.nom === value) {
      setCommuneSelected(element);
    }
  });
}

// Récupération de la liste des communes
const getCommunesList = () => {
  fetch('http://localhost:8080/api/commune')
  .then(res => {
    return res.json()
  })
  .then(data => {
    setCommuneList(data)
  })
  .catch(err => {
    console.log(err)
  })
}


  return (
    <div className='newfilm-form'>
        <h2>Ajoût d'un nouveau film</h2>
        <hr />
        <form action="">
            <label htmlFor="code">Code TMDB : </label>
            <input type="text" id='code' onChange={(e) => getTmdbId(e)} value={tmdbId}/>
            
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
                  <CommuneList communeList={communeList} getInfosCommune={getInfosCommune}></CommuneList>
                }

            {
              ((lieu === "circuit" || lieu === "mulsanne" || lieu === "autre") && special) &&
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
          {/* {
            filmDetails && filmCasting && */}
            <div className='details-film'>
              <form action="">
                <label htmlFor="title">Titre</label>
                <input onChange={(e) => modifyFilmDetails(e.target.value, 'titre')} type="text" id='title' value={filmDetails ? filmDetails.titre : ""}/>
                <label htmlFor="date">Date</label>
                <input onChange={(e) => modifyFilmDetails(e.target.value, 'date')}  type="text" id='date' value={filmDetails ? filmDetails.date : ""}/>
                <label htmlFor="genre">Genre(s)</label>
                <input onChange={(e) => modifyFilmDetails(e.target.value, 'genre')}  type="text" id='genre' value={filmDetails ? filmDetails.genre : ""}/>
                <label htmlFor="duree">Durée</label>
                <input onChange={(e) => modifyFilmDetails(e.target.value, 'duree')}  type="text" id='duree' value={filmDetails ? filmDetails.duree : ""}/>
                <label htmlFor="realisateur">Réalisateur</label>
                <input onChange={(e) => modifyFilmCasting(e.target.value, 'realisateur')}  type="text" id='realisateur' value={filmCasting ? filmCasting.realisateur : ""}/>
                <label htmlFor="casting">Casting</label>
                <input onChange={(e) => modifyFilmCasting(e.target.value, "acteurs")}  type="text" id='casting' value={filmCasting ? filmCasting.acteurs : ""}/>
                <label htmlFor="synopsis">Synopsis</label>
                <textarea onChange={(e) => modifyFilmDetails(e.target.value, 'synopsis')}  rows="10" type="text" id='synopsis' value={filmDetails ? filmDetails.synopsis : ""}/>
                <label htmlFor="affiche">Affiche</label>
                <input onChange={(e) => modifyFilmDetails(e.target.value, 'afficheUrl')}  type="text" id='affiche' value={filmDetails ? filmDetails.afficheUrl : ""}/>
                <img src={filmDetails ? filmDetails.afficheUrl : null} alt="" />
                {/* {
                  trailerUrl && */}
                  <div className='trailer'>
                    <label htmlFor="trailer">Bande annonce</label>
                    <input onChange={(e) => setTrailerUrl(e.target.value, 'trailerUrl')}  type="text" id='trailer' value={trailerUrl ? trailerUrl : ""}/>
                    {
                      trailerUrl &&
                      <iframe src={`https://www.youtube.com/embed/${trailerUrl}`}></iframe>
                    }
                  </div>
                {/* } */}
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
          {/* } */}
          {
            notification && 
            <div className={notificationResult === 'success' ? 'notification success' : "notification failure"}>{notification}</div>

            
          }          
        </div>
        
    </div>
  )
}
