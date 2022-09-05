import React from 'react'
import { useState, useEffect } from 'react';
import "./NewFilmForm.scss"
import CommuneList from '../CommuneList/CommuneList';



export default function NewFilmForm(props) {

  const [tmdbId, setTmdbId] = useState();
  const [filmDetails, setFilmDetails] = useState();
  const [filmCasting, setFilmCasting] = useState();
  const [trailerUrl, setTrailerUrl] = useState();
  const [special, setSpecial] = useState(false);
  const [detailsSeance, setDetailsSeance] = useState();
  const [lieu, setLieu] = useState("");
  const [communeList, setCommuneList] = useState(); 
  const [dateSeance, setDateSeance] = useState();
  const [heureSeance, setHeureSeance] = useState();
  const [precision, setPrecision] = useState();
  const [communeSelected, setCommuneSelected] = useState();
  const [lieuPrecis, setLieuPrecis] = useState()
  const [langue, setLangue] = useState();
  const [notification, setNotification] = useState()
  const [notificationResult, setNotificationResult] = useState();

  const deleteToLocalStorage = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    props.checkAdmin();
  }

  // Mise à jour de la liste des communes
  useEffect(() => {
    getCommunesList()
  }, [lieu])
  

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
        trailerUrl: trailerUrl ? `https://www.youtube.com/embed/${trailerUrl}` : "",
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
      }
    })
    .catch(err => console.log(err))
  }
  
  const sendDataSeance = (filmId) => {
    console.log("OK");
    fetch(`http://localhost:8080/api/seance/${filmId}`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        // FilmId: filmId,
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

  const formatHeureSeance = (value) => {
    setHeureSeance(value.split(':').join("h"));
  }

//   const formatDateSeance = (value) => {
//     let date = new Date(value)
//     let jourSemaine = date.getDay();
//     let jourNumero = date.getDate();
//     let mois = date.getMonth();
//     jourSemaine = getDay(jourSemaine)
//     mois = getMonth(mois);

//     setDateSeance(`${jourSemaine} ${jourNumero} ${mois}`)
// }

const getDay = (day) => {
  switch (day) {
      case 0:
          return "Dimanche";
          break;
      case 1:
          return "Lundi";
          break;
      case 2:
          return "Mardi";
          break;
      case 3:
          return "Mercredi";
          break;
      case 4:
          return "Jeudi";
          break;
      case 5:
          return "Vendredi";
          break;
      case 6:
          return "Samedi";
          break;        
  }
}
const getMonth = (month) => {
  switch (month) {
      case 0:
          return "janvier";
          break;
      case 1:
          return "février";
          break;
      case 2:
          return "mars";
          break;
      case 3:
          return "avril";
          break;
      case 4:
          return "mai";
          break;
      case 5:
          return "juin";
          break;
      case 6:
          return "juillet";
          break;
      case 7:
          return "août";
          break;
      case 8:
          return "septembre";
          break;
      case 9:
          return "octobre";
          break;
      case 10:
          return "novembre";
          break;
      case 11:
          return "décembre";
          break;
  }
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
    fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=b9f8ef66e3f4c75d18245c0079fc0f37&append_to_response=release_dates&language=fr`)
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
      // console.log(formatAdvertisement(data.release_dates.results));     
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
    console.log(frenchAdvertisement);
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
    fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=b9f8ef66e3f4c75d18245c0079fc0f37&language=fr`)
    .then(res => res.json())
    .then(data => {
        for(let i = 0; i < data.results.length; i++){          
            if (data.results[i].site === "YouTube") {
                setTrailerUrl(data.results[i].key);
            }
        }     
    })
    .catch(err => console.log(err))
  }   

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
                  <input onChange={(e) => setDateSeance(e.target.value)} type="date" id='date' />
                  <label htmlFor="heure">Heure : </label>
                  <input onChange={(e) => formatHeureSeance(e.target.value)} type="time" id='heure'/>
                </div>

                <div className="langue">
                  <label htmlFor="vo">VO</label>
                  <input onChange={() => setLangue("VO")} type="radio" id='vo' name='langue'/>
                  <label htmlFor="vf">VF</label>
                  <input onChange={() => setLangue('VF')} type="radio" id='vf' name='langue'/>
                  <label htmlFor="null">Non précisée</label>
                  <input onChange={() => setLangue("")} type="radio" id='null' name='langue'/>
                </div>

                <div className="precision">
                  <label htmlFor="precision">Info(s) complémentaire(s) : </label>
                  <textarea onChange={(e) => setPrecision(e.target.value)} name="" id="precision" cols="30" rows="5" placeholder='Plein air, intervenant,...'></textarea>
                </div>

                <div className='lieu'>
                  <p>Lieu :</p>
                  <div>
                    <label htmlFor="circuit">Circuit</label>
                    <input type="radio" name='lieu' id='circuit' onChange={() => setLieu("circuit")} checked={lieu === "circuit" ? "checked" : false} />
                    <label htmlFor="royal">Royal</label>
                    <input type="radio" name='lieu' id='royal' onChange={() => setLieu("royal")} checked={lieu === "royal" ? "checked" : false} />
                    <label htmlFor="mulsanne">Mulsanne</label>
                    <input type="radio" name='lieu' id='mulsanne' onChange={() => setLieu("mulsanne")} checked={lieu === "mulsanne" ? "checked" : false} />
                    <label htmlFor="autre">Autre</label>
                    <input type="radio" name='lieu' id='autre' onChange={() => setLieu("autre")} checked={lieu === "autre" ? "checked" : false} />
                  </div>
                </div>

                {
                  lieu === "circuit" &&
                  <CommuneList communeSelected={communeSelected} communeList={communeList} getInfosCommune={getInfosCommune}></CommuneList>
                }

            {
              ((lieu === "circuit" || lieu === "mulsanne" || lieu === "autre") && special) &&
              <div className="lieu-precis">
                <label htmlFor="salle">Lieu précis : </label>
                <textarea onChange={(e) => setLieuPrecis(e.target.value)} name="salle" id="salle" cols="30" rows="5" placeholder='Salle, commune,...'></textarea>
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
                <label htmlFor="avertissement">Avertissement</label>
                <input onChange={(e) => modifyFilmDetails(e.target.value, "avertissement")}  type="text" id='avertissement' value={filmDetails ? filmDetails.avertissement : ""}/>
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
          <hr />
          <button onClick={() => deleteToLocalStorage()} className='deconnexion'>Déconnexion</button>      
        </div>
        
    </div>
  )
}
