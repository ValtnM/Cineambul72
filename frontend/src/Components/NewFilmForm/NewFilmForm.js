import React from 'react'
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player'
import "./NewFilmForm.scss"
import '../../assets/animations.scss'
import CommuneList from '../CommuneList/CommuneList';

export default function NewFilmForm(props) {

  const [tmdbId, setTmdbId] = useState();
  const [filmDetails, setFilmDetails] = useState();
  const [filmCasting, setFilmCasting] = useState();
  const [trailerUrl, setTrailerUrl] = useState();
  const [special, setSpecial] = useState(false);
  const [lieu, setLieu] = useState("");
  const [communeList, setCommuneList] = useState(); 
  const [dateSeance, setDateSeance] = useState();
  const [heureSeance, setHeureSeance] = useState();
  const [precision, setPrecision] = useState();
  const [communeSelected, setCommuneSelected] = useState();
  const [lieuPrecis, setLieuPrecis] = useState()
  const [langue, setLangue] = useState("null");
  const [notification, setNotification] = useState()
  const [notificationResult, setNotificationResult] = useState();


  // Mise à jour de la liste des communes
  useEffect(() => {
    getCommunesList()
  }, [lieu])  

  // Envoi des données du film dans la base de données
  const sendDataFilm = () => {
    console.log(filmCasting);
    const token = sessionStorage.getItem('token');
    fetch('https://test-cineambul72.fr/api/film', {
      method: 'POST',
      headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...filmDetails,
        realisateur: filmCasting.realisateur,
        acteurs: filmCasting.acteurs,
        trailerUrl: trailerUrl,
        special: special
      })
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      if(data.message) {
        setNotificationResult('success')
        setNotification(data.message)
        if(special) {
          sendDataSeance(data.id)
        }
      } else if(data.erreur) {
        setNotificationResult()
        setNotification(data.erreur)
      } else if(data.error) {
        setNotificationResult()
        setNotification("Échec lors de la création du film !")
      }
    })
    .catch(err => console.log(err))
  }
  
  // Envoi des données de la séances dans la base de données
  const sendDataSeance = (filmId) => {
    const token = sessionStorage.getItem('token');
    fetch(`https://test-cineambul72.fr/api/seance/${filmId}`, {
      method: "POST",
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
     },
      body: JSON.stringify({
        commune: communeSelected,
        date: dateSeance,
        heure: heureSeance,
        special: special,
        salle: lieuPrecis,
        infoComplementaire: precision,
        lieu: lieu,
        langue: langue
      })
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }  

  // Formatage de l'heure de la séance spéciale
  const formatHeureSeance = (value) => {
    setHeureSeance(value.split(':').join("h"));
  }

// Soumission du formulaire
const submitForm = (e) => {
  e.preventDefault();
  checkTmdbCode();
  setNotification("")
  setFilmDetails("")
  setFilmCasting("")
  setTrailerUrl("")
  if(tmdbId){
    getFilmDetails();
    getFilmCast();
    getFilmTrailer();  
  }
}  

  // Récupération de la valeur de "spécial"
  const changeSpecial = (value) => {
    setFilmDetails()
    setSpecial(value)
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
  
  // Vérification qu'un code à bien été saisie
  const checkTmdbCode = () => {
    if(!tmdbId){
      setFilmDetails("")
      setFilmCasting("")
      setTrailerUrl("")
    } 
  }

  // Récupération des détails du film
  const getFilmDetails = () => {
    fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=release_dates&language=fr`)
    .then(res => res.json())
    .then(data => {
      setFilmDetails({
        codeTMDB: tmdbId,
        titre: data.title,
        date: formatDateFilm(data.release_date),
        genre: formatGenre(data.genres) ,
        duree: formatDuration(data.runtime),
        synopsis: data.overview,
        afficheUrl: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}`,
        avertissement: data.release_dates ? formatAdvertisement(data.release_dates.results) : ""
      })
    })
    .catch(err => console.log(err))
  }   

  // Formatage de la date de sortie
  const formatDateFilm = (date) => {
      let formatedDate = date.split("-").reverse().join("/");
      return formatedDate;
  }

  // Formatage de la liste des genres
  const formatGenre = (genres) => {
      let formatedGenres = [];
      genres.forEach(element => {
          formatedGenres.push(element.name)
      });
      return formatedGenres.join(", ");
  }

  // Formatage de la durée
  const formatDuration = (duration) => {
      let hour = Math.floor(duration/60)
      let minutes = duration - (hour*60);
      return `${hour}h${minutes}`
  }

  // Formatage de l'avertissement
  const formatAdvertisement = (dataArray) => {
    let frenchAdvertisement = []
    dataArray.forEach(thing => {
      if(thing.iso_3166_1 === "FR"){
        thing.release_dates.forEach(element => {
          if(element.type === 3){
            frenchAdvertisement.push(element.certification)            
          }
        })
      }
    });
    switch (frenchAdvertisement[0].toString()) {
      case "12":
        return "Interdit aux moins de 12 ans"
        break;
      case "16":
        return "Interdit aux moins de 16 ans"
        break;
      case "18":
        return "Interdit aux moins de 18 ans"
        break;
      default:
        return ""
        break;
    }
  }

  // Récupération de la liste des acteurs
  const getFilmCast = () => {
      fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setFilmCasting({
          realisateur: formatDirector(data.crew),
          acteurs: formatCast(data.cast)
        })        
      })
      .catch(err => console.log(err))
  };

  // Formatage de la liste des acteurs
  const formatCast = (castArray) => {
      let formatedCast = [];
      for(let i = 0; i < 3; i++){
          formatedCast.push(castArray[i].name);
      }
      
      return formatedCast.join(", ");
  }

  // Formatage de la liste des réalisateurs
  const formatDirector = (crewArray) => {
      let formatedDirector = [];
      let sortedCrew = crewArray.filter(person => person.job === "Director");
      sortedCrew.forEach(director => {
          formatedDirector.push(director.name)
      })

      return formatedDirector.join(", ");
  }

  // Récupération de la bande annonce
  const getFilmTrailer = () => {
    fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr`)
    .then(res => res.json())
    .then(data => {
        for(let i = 0; i < data.results.length; i++){          
            if (data.results[i].site === "YouTube") {
                setTrailerUrl(`https://www.youtube.com/watch?v=${data.results[i].key}`);
            }
        }     
    })
    .catch(err => console.log(err))
  }   

  // Récupération de l'ID BetaSeries du film
    const getTmdbId = (e) => {
      setTmdbId(e.target.value)
  }

  // Récupération des infos de la commune sélectionnée
  const getInfosCommune = (value) => {
    if(value.target.value === "undefined") {
      setCommuneSelected("")
    } else {
      communeList.forEach(element => {
        if(element.nom === value.target.options[value.target.selectedIndex].text) {
          setCommuneSelected(element);
        }
      });
    }
  }


  // Récupération de la liste des communes
  const getCommunesList = () => {
    fetch('https://test-cineambul72.fr/api/commune')
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
        <h2>Ajouter un nouveau film</h2>
        <hr />
        <form>
            <div className='code-tmdb'>
              <label htmlFor="code">Code TMDB*</label>
              <input type="text" id='code' onChange={(e) => getTmdbId(e)} value={tmdbId}/>
            </div>
            
            <div className='special'>
              <p>Séance Spéciale ?</p>
              <div className='special-radio'>
                <div className="special-yes">
                  <label htmlFor="oui">Oui</label>
                  <input type="radio" name='special' id='oui' onChange={() => changeSpecial(true)} checked={special ? "checked" : false} />
                </div>
                <div className="special-no">
                  <label htmlFor="non">Non</label>
                  <input type="radio" name='special' id='non' onChange={() => changeSpecial(false)} checked={!special ? "checked" : false} />
                </div>
              </div>
            </div>

            {
              special && 
              <div>
                <div className='date-heure'>
                  <div className="date">
                    <label htmlFor="date">Date* : </label>
                    <input onChange={(e) => setDateSeance(e.target.value)} type="date" id='date' />
                  </div>
                  <div className="heure">
                    <label htmlFor="heure">Heure* : </label>
                    <input onChange={(e) => formatHeureSeance(e.target.value)} type="time" id='heure'/>
                  </div>
                </div>

                <div className="langue">
                  <div className="vo">
                    <label htmlFor="vo">VO</label>
                    <input onChange={() => setLangue("VO")} type="radio" id='vo' name='langue' checked={langue === "VO" ? "checked" : false}/>
                  </div>
                  <div className="vf">
                    <label htmlFor="vf">VF</label>
                    <input onChange={() => setLangue('VF')} type="radio" id='vf' name='langue' checked={langue === "VF" ? "checked" : false}/>
                  </div>
                  <div className="undefined">
                    <label htmlFor="null">Non précisée</label>
                    <input onChange={() => setLangue("null")} type="radio" id='null' name='langue' checked={langue === "null" ? "checked" : false}/>
                  </div>
                </div>

                <div className="precision">
                  <label htmlFor="precision">Info(s) complémentaire(s)</label>
                  <textarea onChange={(e) => setPrecision(e.target.value)} name="" id="precision" cols="30" rows="5" placeholder='Plein air, intervenant,...'></textarea>
                </div>

                <div className='lieu'>
                  <p>Lieu* :</p>
                  <div className='lieu-list'>
                    <div>
                      <label htmlFor="circuit">Circuit</label>
                      <input type="radio" name='lieu' id='circuit' onChange={() => setLieu("circuit")} checked={lieu === "circuit" ? "checked" : false} />
                    </div>
                    <div>
                      <label htmlFor="royal">Royal</label>
                      <input type="radio" name='lieu' id='royal' onChange={() => setLieu("royal")} checked={lieu === "royal" ? "checked" : false} />
                    </div>
                    <div>
                      <label htmlFor="mulsanne">Mulsanne</label>
                      <input type="radio" name='lieu' id='mulsanne' onChange={() => setLieu("mulsanne")} checked={lieu === "mulsanne" ? "checked" : false} />
                    </div>
                    <div>
                      <label htmlFor="autre">Autre</label>
                      <input type="radio" name='lieu' id='autre' onChange={() => setLieu("autre")} checked={lieu === "autre" ? "checked" : false} />
                    </div>
                  </div>
                </div>

                {
                  lieu === "circuit" &&
                  <CommuneList communeSelected={communeSelected} communeList={communeList} getInfosCommune={getInfosCommune}></CommuneList>
                }

            {
              ((lieu === "circuit" || lieu === "mulsanne" || lieu === "autre") && special) &&
              <div className="lieu-precis">
                <label htmlFor="salle">Lieu précis</label>
                <textarea onChange={(e) => setLieuPrecis(e.target.value)} name="salle" id="salle" cols="30" rows="5" placeholder='Salle, commune,...'></textarea>
              </div>
            }              
            </div>
            }

            <button onClick={(e) => submitForm(e)}>Valider</button>
            <hr />
        </form>
        <div className="infos">          
            <div className='details-film'>
              <form action="">
                <label htmlFor="title">Titre*</label>
                <input onChange={(e) => modifyFilmDetails(e.target.value, 'titre')} type="text" id='title' value={filmDetails ? filmDetails.titre : ""}/>
                <label htmlFor="date">Date*</label>
                <input onChange={(e) => modifyFilmDetails(e.target.value, 'date')}  type="text" id='date' value={filmDetails ? filmDetails.date : ""}/>
                <label htmlFor="genre">Genre(s)*</label>
                <input onChange={(e) => modifyFilmDetails(e.target.value, 'genre')}  type="text" id='genre' value={filmDetails ? filmDetails.genre : ""}/>
                <label htmlFor="duree">Durée*</label>
                <input onChange={(e) => modifyFilmDetails(e.target.value, 'duree')}  type="text" id='duree' value={filmDetails ? filmDetails.duree : ""}/>
                <label htmlFor="realisateur">Réalisateur</label>
                <input onChange={(e) => modifyFilmCasting(e.target.value, 'realisateur')}  type="text" id='realisateur' value={filmCasting ? filmCasting.realisateur : ""}/>
                <label htmlFor="casting">Casting</label>
                <input onChange={(e) => modifyFilmCasting(e.target.value, "acteurs")}  type="text" id='casting' value={filmCasting ? filmCasting.acteurs : ""}/>
                <label htmlFor="avertissement">Avertissement</label>
                <input onChange={(e) => modifyFilmDetails(e.target.value, "avertissement")}  type="text" id='avertissement' value={filmDetails ? filmDetails.avertissement : ""}/>
                <label htmlFor="synopsis">Synopsis*</label>
                <textarea onChange={(e) => modifyFilmDetails(e.target.value, 'synopsis')}  rows="10" type="text" id='synopsis' value={filmDetails ? filmDetails.synopsis : ""}/>
                <label htmlFor="affiche">Affiche*</label>
                <input onChange={(e) => modifyFilmDetails(e.target.value, 'afficheUrl')}  type="text" id='affiche' value={filmDetails ? filmDetails.afficheUrl : ""}/>
                <img src={filmDetails ? filmDetails.afficheUrl : null} alt="" />                
                  <div className='trailer'>
                    <label htmlFor="trailer">Bande annonce</label>
                    <input onChange={(e) => setTrailerUrl(e.target.value, 'trailerUrl')}  type="text" id='trailer' value={trailerUrl ? trailerUrl : ""}/>
                    {
                      trailerUrl &&
                      <ReactPlayer className="trailer-player" url={trailerUrl} controls></ReactPlayer>
                    }
                  </div>
              </form>
              <div className='btn-film-form'>
                <button onClick={() => window.scrollTo(0, 0)}>Revenir en haut</button>
                {
                  filmCasting && filmDetails &&
                  <button onClick={() => sendDataFilm()}>Envoyer</button>
                }
                </div>
            </div>          
          {
            notification && 
            <div className={notificationResult === 'success' ? 'notification success' : "notification failure"}>{notification}</div>           
          }
        </div>
        
    </div>
  )
}
