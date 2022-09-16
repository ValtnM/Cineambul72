import React, {useEffect, useState} from 'react'
import './Salle.scss'
import Slider from '../Slider/Slider'

export default function Salle(props) {

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

  const [photoList, setPhotoList] = useState();
  const [photoFile, setPhotoFile] = useState();
  const [photoMessage, setPhotoMessage] = useState();
  const [lieu, setLieu] = useState();

  useEffect(() => {
    checkAdmin();
  }, [])
  useEffect(() => {
    getRoyalPhoto();
  }, [lieu])

  

  const addRoyalPhoto = (e) => {
    e.preventDefault();
    if(photoFile){
      let formData = new FormData();
      formData.append('photo', photoFile);
      console.log('lieu: '+ lieu);
      fetch(`http://localhost:8080/api/commune/salle/${lieu}`, {
        method: "POST",
        body: formData
      })
      .then(res => res.json())
      .then((data) => {
        setPhotoMessage(data);
        getRoyalPhoto();
      })
      .catch(err => console.log(err))
    } else {
      setPhotoMessage({erreur: "Aucun fichier n'a été sélectionné"})
    }
    setPhotoFile(null)
  }

  const getRoyalPhoto = () => {  
    checkSalle(props.infos.nom)
    fetch(`http://localhost:8080/api/commune/salle/${lieu}`, {
      method: "GET",
      headers: {'Content-Type': 'application/json'},
    })
    .then(res => res.json())
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
        setPhotoList(photosArray)
    })
    .catch(err => console.log(err))
  }

  const checkSalle = (nomSalle) => {
    console.log("nomSalle: " + nomSalle);
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
                <button onClick={(e) => addRoyalPhoto(e)}>Valider</button>
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
          <Slider className="salle-slider" dataSlider={photoList} />
        }
    </div>
  )
}
