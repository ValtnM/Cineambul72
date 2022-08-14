import React, {useState, useEffect, useRef} from 'react'
import './Commune.scss'
import { Link, Outlet, useParams } from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
// import axios from "axios"
// import CommuneListReducer from '../../redux/reducers/CommuneListReducer'
import Slider from '../Slider/Slider'
// import { getAllCommune } from '../../../../backend/controllers/commune'

export default function Commune() {  


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
    getCommunesList()
  }, [])

  
  useEffect(() => {
    getPhotoCommune()
  }, [communeSelected])

  const addPhotoCommune = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    console.log(cheminPhoto);
    if(cheminPhoto) {
      fetch(`http://localhost:8080/api/commune/${communeSelected.id}`, {

        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          nom: cheminPhoto
        })
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
      console.log("BIEN");
    } else {
      console.log("ECHEC");
    }
    getPhotoCommune()
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
  
  const addCommune = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/commune", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(communeInfos)
    })
    .then((res) => {
      if(res.status === 500){
        setCommuneMessage("ECHEC")
      } else {
        console.log(res.status)
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
    .then((res) => {
      console.log(res)
      getCommunesList();
    })
    .catch(err => console.log(err))
    setCommuneSelected()
    // console.log('TEST');
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
    console.log(communeInfos);
  }

  


  return (  
    <div>
      {
        communeList &&
        <div className="communes">
          <select onChange={(e) => getInfosCommune(e.target.options[e.target.selectedIndex].text)} name="communes">
            <option key={uuidv4()} value="Null">Sélectionner une commune</option>
            {communeList.map(commune => (
              <option key={uuidv4()} value={commune.nom}>{commune.nom}</option>
              ))}
          </select>        
          
        </div>
      }

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
          <button onClick={(e) => addCommune(e)}>Valider</button>
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

    {
      communeSelected &&
      <div className='commune'>
      <h3>{communeSelected.nom}</h3>
        <div className="commune-salle">
            <h4>{communeSelected.salleNom}</h4>
            <p>{communeSelected.salleRue}</p>
            <p>{communeSelected.salleCommune}</p>
            <p>{communeSelected.salleContact}</p>
            <button onClick={deleteCommune} className='supprimer-commune'>Supprimer la commune</button>
        </div>
        {
          communePhotos !== [] &&
          <Slider dataSlider={communePhotos} />
        }

        <form className='ajout-photo'>
          <label htmlFor="chemin">Chemin</label>
          <input onInput={e => changeChemin(e)} value={cheminPhoto} type="text" id='chemin' />
          <button onClick={(e) => addPhotoCommune(e)}>Ajouter</button>
        </form>


        <div className="commune-seances">
          <h4>Films à l'affiche</h4>
          <div className='commune-seances__films'>
            <img src="/affiches/bruno-reidal.jpg" alt="" />
            <img src="/affiches/bruno-reidal.jpg" alt="" />
            <img src="/affiches/bruno-reidal.jpg" alt="" />
            <img src="/affiches/bruno-reidal.jpg" alt="" />
            <img src="/affiches/bruno-reidal.jpg" alt="" />
          </div>
        </div>
        </div>   
      }    
    </div>
  )
}
