import React, {useEffect, useState} from 'react'
import './Salle.scss'
import Slider from '../Slider/Slider'

export default function Salle(props) {

  const [admin, setAdmin] = useState(false);

  // Vérification du token d'authentification
  const checkAdmin = () => {
    const token = sessionStorage.getItem('token')
    if (token) {     
      fetch(`https://cineambul72.fr/api/admin/${token}`, {
        method: "GET",
      })
      .then(res => res.json())
      .then((data) => {
        setAdmin(data.isAdmin);
      })
      .catch(err => console.log(err))
    } else {
      setAdmin(false)
    }
  }

  const [photoList, setPhotoList] = useState();
  const [photoFile, setPhotoFile] = useState();
  const [photoMessage, setPhotoMessage] = useState();
  const [lieu, setLieu] = useState();

  useEffect(() => {
    checkAdmin();
  }, [])
  useEffect(() => {
    getSallePhoto();
  }, [lieu])
  
  // Ajout d'une photo de la salle
  const addSallePhoto = (e) => {
    e.preventDefault();
    if(photoFile){
      let formData = new FormData();
      formData.append('photo', photoFile);
      const token = sessionStorage.getItem("token");
      fetch(`https://cineambul72.fr/api/photo/salle/${lieu}`, {
        method: "POST",
        headers: {
            'authorization': `Bearer ${token}`,
        },
        body: formData
      })
      .then(res => res.json())
      .then((data) => {
        setPhotoMessage(data);
        getSallePhoto();
        clearPhotoForm();
      })
      .catch(err => console.log(err))
    } else {
      setPhotoMessage({erreur: "Aucun fichier n'a été sélectionné"})
    }
  }

  // Nettoyage du formulaire d'ajoût de photo
  const clearPhotoForm = () => {
    const photoInput = document.querySelector('input[type="file"]')
    photoInput.value = null;
  }

  // Récupération des photos de la salle
  const getSallePhoto = () => {  
    checkSalle(props.infos.nom)
    fetch(`https://cineambul72.fr/api/photo/salle/${lieu}`, {
      method: "GET",
      headers: {'Content-Type': 'application/json'},
    })
    .then(res => res.json())
    .then(data => {
      let photosArray = [];
          data.map(photos => (
          photosArray.push(photos.nom)
          ))
        setPhotoList(photosArray)
    })
    .catch(err => console.log(err))
  }

  // Récupération du nom de la salle
  const checkSalle = (nomSalle) => {
    if(nomSalle === "Cinéma Le Royal"){
      setLieu("royal")
    } else if (nomSalle === "Centre Socio-Culturel Simone Signoret") {
      setLieu("mulsanne")
    }
  }

  

  return (
    <div className='salle'>
        <div className="salle-infos">
            <h3>{props.infos.nom}</h3>
            <p>{props.infos.rue}</p>
            <p>{props.infos.ville}</p>
            <p>{props.infos.telephone}</p>
        </div>
        {
          admin &&
          <div className="ajout-photo">
              <h4>Ajouter une photo</h4>
              <form>                
                <input onInput={e => setPhotoFile(e.target.files[0])} type="file"/>
                <button onClick={(e) => addSallePhoto(e)}>Valider</button>
              </form>
              {
                photoMessage && 
                <div>                
                  { photoMessage.message ?
                  <div className='succes'>{photoMessage.message}</div>
                  :
                  <div className='echec'>{photoMessage.erreur}</div>
                  }
                </div>
                
              }
          </div>
        }
        {
          photoList && lieu &&
          <Slider className="salle-slider" dataSlider={photoList} getPhoto={getSallePhoto} admin={admin}/>
        }
    </div>
  )
}
