import React, {useState, useEffect, useRef} from 'react'
import './Commune.scss'
import { Link, Outlet, useParams } from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import Slider from '../Slider/Slider'
import CommuneList from '../CommuneList/CommuneList'
import FilmList from '../FilmList/FilmList'
// import { getAllCommune } from '../../../../backend/controllers/commune'

export default function Commune(props) { 
  
  const [admin, setAdmin] = useState(false);
  const checkAdmin = () => {
    const adminUserName = localStorage.getItem("username")
    const adminPassword = localStorage.getItem("password")
    fetch(`http://localhost:8080/api/admin/${adminUserName}/${adminPassword}`, {
      method: "GET",
      headers: {'Content-Type': 'application/json'},
    })
    .then(res => res.json())
    .then(data => {
      setAdmin(data)
    })
    .catch(err => console.log(err))    
  }


  const [communeSelected, setCommuneSelected] = useState();
  const [communeList, setCommuneList] = useState();
  const [communePhotos, setCommunePhotos] = useState([]);
  const [cheminPhoto, setCheminPhoto] = useState()
  const [communeInfos, setCommuneInfos] = useState({
    nom: "",
    salleNom: "",
    salleRue: "",
    salleCommune: "",
    salleContact: ""
  })
  const [communeMessage, setCommuneMessage] = useState();

  useEffect(() => {
    getCommunesList();
    checkAdmin();
  }, [])

  
  useEffect(() => {
    getPhotoCommune()
    // console.log(communeSelected);
  }, [communeSelected])

  
  const addPhotoCommune = (e) => {
    e.preventDefault();
    console.log(cheminPhoto);
    if(cheminPhoto) {
      fetch(`http://localhost:8080/api/commune/${communeSelected.id}`, {

        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          nom: cheminPhoto
        })
      })
      .then((res) => {
        console.log(res)
        getPhotoCommune()
      })
      .catch(err => console.log(err))
    } else {
      console.log("ECHEC");
    }
    setCheminPhoto("")
  }
  
  const getPhotoCommune = () => {
    if(communeSelected) {
      fetch(`http://localhost:8080/api/commune/${communeSelected.id}`)
      .then(res => {return res.json()})
      .then(data => {
        let photosArray = [];
        if(data.length === 0){
          photosArray.push("/salles/photo_indispo.png")
        }
        else {
          data.map(photos => (
          photosArray.push(photos.nom)
          ))
        }        
        setCommunePhotos(photosArray)
      })
      .catch(err => console.log(err))
    }
  }

  const changeChemin = (e) => {
    console.log(e.target.value);
    setCheminPhoto(e.target.value)
  }

  const submitCommuneForm = (e) => {
    e.preventDefault();
    let communeUpdated = false;
    for(let i = 0; i < communeList.length; i++){
      if (communeSelected && (communeList[i].id === communeSelected.id)) {
        console.log(communeSelected)
        updateCommune(communeList[i].id)
        communeUpdated = true;
      } 
    }
    if (communeUpdated) {
      console.log("UPDATED");
    } else {
      addCommune();
    }
  }

  const updateCommune = (communeId) => {
    console.log(communeId);
    fetch(`http://localhost:8080/api/commune/${communeId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(communeInfos)
    })
    .then(() => {
      setCommuneSelected(communeInfos)
      getCommunesList();
      clearCommuneForm();
    })
    .catch(err => console.log(err))
  }

  const modifyCommune = () => {
    setCommuneInfos(communeSelected)
  }
  
  const addCommune = () => {
    console.log("AJOUT");
    fetch("http://localhost:8080/api/commune", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(communeInfos)
    })
    .then((res) => {
      if(res.status === 500){
        setCommuneMessage("ECHEC")
      } else {
        getCommunesList();
        clearCommuneForm();
        setCommuneMessage("SUCCES")
      }
    })
    .catch(err => console.log(err))
  }

  const deleteCommune = () => {
    fetch(`http://localhost:8080/api/commune/${communeSelected.id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
    .then(() => {
      getCommunesList();
      clearCommuneForm();

    })
    .catch(err => console.log(err))
    setCommuneSelected()
  }

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

  const getInfosCommune = (value) => {
    communeList.forEach(element => {
      if(element.nom === value) {
        setCommuneSelected(element);
      }
    });
  }

  const clearCommuneForm = () => {
    setCommuneInfos({
      nom: "",
      salleNom: "",
      salleRue: "",
      salleCommune: "",
      salleContact: ""
    })
  }

  const changeInfoCommune = (e) => {
    const value = e.target.value
    switch (e.target.id) {
      case "nom":
        setCommuneInfos({
          ...communeInfos,
          nom: value
        });
      break;
      case "salleNom":
        setCommuneInfos({
          ...communeInfos,
          salleNom: value
        });
      break;
      case "salleRue":
        setCommuneInfos({
          ...communeInfos,
          salleRue: value
        });
      break;
      case "salleCommune":
        setCommuneInfos({
          ...communeInfos,
          salleCommune: value
        });
      break;
      case "salleContact":
        setCommuneInfos({
          ...communeInfos,
          salleContact: value
        });
      break;
      default:
        console.log("ERREUR !");
    }
  }

  


  return (  
    <div className='communeBlock'>
      {
        communeList &&
        <CommuneList communeSelected={communeSelected} communeList={communeList} getInfosCommune={getInfosCommune}></CommuneList>
      }
      {
        admin &&
        <div className="commune-form">        
          <form action="">
            <label htmlFor="nom">Nom de la commune :</label>
            <input onChange={(e) => changeInfoCommune(e)} type="text" id='nom' required placeholder='ex: Allonnes' value={communeInfos.nom}/>
            <label htmlFor="salleNom">Nom de la salle :</label>
            <input onChange={(e) => changeInfoCommune(e)} type="text" id='salleNom' required placeholder='ex: Salle polyvalente' value={communeInfos.salleNom}/>
            <label htmlFor="salleRue">Rue :</label>
            <input onChange={(e) => changeInfoCommune(e)} type="text" id='salleRue' required placeholder='ex: 10 rue Victor Hugo' value={communeInfos.salleRue}/>
            <label htmlFor="salleCommune">Code Postal et Commune :</label>
            <input onChange={(e) => changeInfoCommune(e)} type="text" id='salleCommune' required placeholder='ex: 72130 Fresnay-sur-Sarthe' value={communeInfos.salleCommune}/>
            <label htmlFor="salleContact">Contact :</label>
            <input onChange={(e) => changeInfoCommune(e)} type="text" id='salleContact' required placeholder='ex: 02.43.12.34.56' value={communeInfos.salleContact}/>
            <button onClick={(e) => submitCommuneForm(e)}>Valider</button>
          </form>
          {
            communeMessage && 
            <div>
              {communeMessage === "SUCCES" ? 
                <div className='message-succes' style={{color: 'green'}}>La nouvelle commune a bien été ajoutée !</div>
                :
                <div className='message-echec' style={{color: 'red'}}>Échec lors de l'ajoût de la nouvelle commune !</div>
              }
            </div>
          }
      </div>
    }

    {
      communeSelected &&
      <div key={uuidv4()} className='commune'>
      <h3>{communeSelected.nom}</h3>
        <div className="commune-salle">
            <h4>{communeSelected.salleNom}</h4>
            <p>{communeSelected.salleRue}</p>
            <p>{communeSelected.salleCommune}</p>
            <p>{communeSelected.salleContact}</p>
            {
              admin &&
            <div className='commune-btn'>
              <button onClick={deleteCommune} className='supprimer-commune'>Supprimer la commune</button>
              <button onClick={modifyCommune} className='modifier-commune'>Modifier la commune</button>
            </div>
            }
            {
              admin && 
              <form className='ajout-photo'>
                <label htmlFor="chemin">Indiquer le chemin de la photo :</label>
                <input onInput={e => changeChemin(e)} value={cheminPhoto} type="text" id='chemin' placeholder='ex: /salles/allonnes/allonnes.jpg' />
                <button onClick={(e) => addPhotoCommune(e)}>Ajouter une photo</button>
              </form>
            }
        </div>
        {
          communePhotos !== [] &&
          <Slider dataSlider={communePhotos} />
        }
        <div className="commune-seances">
          <h4>Films à l'affiche</h4>
          <FilmList communeSelected={communeSelected}></FilmList>
        </div>        
      </div>   
      }    
    </div>
  )
}
