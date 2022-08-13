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
  const [communeList, setComunneList] = useState();
  const [communePhotos, setCommunePhotos] = useState([]);
  const [cheminPhoto, setCheminPhoto] = useState()
  // const communeList= null ;

  useEffect(() => {
    fetch('http://localhost:8080/api/commune')
    .then(res => {
      console.log("OK")
      return res.json()
    })
    .then(data => {
      setComunneList(data)
    })
    .catch(err => {
      console.log(err)
    })
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
        console.log(data);
        let photosArray = [];
        if(data.length === 0){
          photosArray.push("/salles/photo_indispo.png")
        }
        else {
          data.map(photos => (
          photosArray.push(photos.nom)
          ))
        }

        console.log(photosArray);
        
        setCommunePhotos(photosArray)
        console.log(communePhotos)
      })
      .catch(err => console.log(err))
    }
  }

  const changeChemin = (e) => {
    console.log(e.target.value);
    setCheminPhoto(e.target.value)
  }
  

  const getCommune = (value) => {
    communeList.forEach(element => {
      if(element.nom === value) {
        // console.log(element);
        setCommuneSelected(element);
        console.log(communeSelected);
      }
    });
  }

  const getUrl = (commune) => {
    return `/circuit-itinerant/par-communes/${commune}`
  }

  // const communeList = CommuneListReducer(undefined, []);


  // const getCommuneListe = () => {
  //   axios.get('http://localhost:3000/api/commune/')
  //     .then(res => communeList = res.data)
  //     // .then(res => console.log(res.data))
  //     .catch(() => console.log("ERREUR !!!"))
  // }



  


  return (  
    <div>
      {
        communeList &&
        <div className="communes">
          <select onChange={(e) => getCommune(e.target.options[e.target.selectedIndex].text)} name="communes">
            <option key={uuidv4()} value="Null">Sélectionner une commune</option>
            {communeList.map(commune => (
              <option key={uuidv4()} value={commune.nom}>{commune.nom}</option>
              ))}
          </select>        
          
        </div>
      }
    {
      communeSelected &&
      <div className='commune'>
      <h3>{communeSelected.nom}</h3>
        <div className="commune-salle">
            <h4>{communeSelected.salleNom}</h4>
            <p>{communeSelected.salleRue}</p>
            <p>{communeSelected.salleCommune}</p>
            <p>{communeSelected.salleContact}</p>
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
