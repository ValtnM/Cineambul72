import React, {useState, useEffect, useRef} from 'react'
import './Commune.scss'
import Slider from '../Slider/Slider'
import CommuneList from '../CommuneList/CommuneList'
import FilmList from '../FilmList/FilmList'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

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
  const [photoFile, setPhotoFile] = useState()
  const [communeInfos, setCommuneInfos] = useState({
    nom: "",
    salleNom: "",
    salleRue: "",
    salleCommune: "",
    salleContact: ""
  })
  const [communeMessage, setCommuneMessage] = useState();
  const [deleteMode, setDeleteMode] = useState(false);
  const [menu, setMenu] = useState('films');
  const [photoMessage, setPhotoMessage] = useState();

  useEffect(() => {
    getCommunesList();
    checkAdmin();
  }, [])

  
  useEffect(() => {
    getPhotoCommune();
    setCommuneMessage("");
    setMenu("films")
  }, [communeSelected])
  useEffect(() => {   
    setPhotoMessage("")
  }, [menu])
 

  const addPhotoCommune = (e) => {
    e.preventDefault();
    if(photoFile) {
      let formData = new FormData();
      formData.append("photo", photoFile)
      fetch(`http://localhost:8080/api/photo/${communeSelected.id}`, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then((data) => {
        clearPhotoForm();
        setPhotoMessage(data)
        getPhotoCommune()
      })
      .catch(err => console.log(err))
    } else {
      setPhotoMessage({erreur: "Aucun fichier n'a été sélectionné"})
    }
  }

  const clearPhotoForm = () => {
    const photoInput = document.querySelector('input[type="file"]')
    photoInput.value = null;
  }
  
  const getPhotoCommune = () => {
    if(communeSelected) {
      fetch(`http://localhost:8080/api/photo/${communeSelected.id}`)
      .then(res => res.json())
      .then(data => {
        let photosArray = [];
          data.map(photos => (
          photosArray.push(photos.nom)
          ))
        setCommunePhotos(photosArray)
      })
      .catch(err => console.log(err))
    }
  }

  const changeChemin = (e) => {
    setPhotoFile(e.target.files[0])
  }

  const submitCommuneForm = (e) => {
    e.preventDefault();
    let communeUpdated = false;
    for(let i = 0; i < communeList.length; i++){
      if (communeSelected && (communeList[i].id === communeSelected.id)) {
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
      setDeleteMode(false)
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
          <h4>Ajouter une commune</h4>  
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
      <div key={communeSelected.nom} className="commune">
        <h3>{communeSelected.nom}</h3>
        <nav className="commune-menu">
          <ul>
            <li className={menu === "films" ? "active" : ""} onClick={() => setMenu("films")}>Films à l'affiche</li>
            <li className={menu === "salle" ? "active" : ""} onClick={() => setMenu("salle")}>La salle</li>
          </ul>
        </nav> 
        {
          menu === "films" &&
          <div key={menu + "1"} className='commune-seances'>

              <FilmList titre="Films à l'affiche" communeSelected={communeSelected}></FilmList>
          </div>
        } 
        {
          menu === "salle" &&
          <div key={menu + "2"} className="commune-salle">
            <h4>{communeSelected.salleNom}</h4>
            <p>{communeSelected.salleRue}</p>
            <p>{communeSelected.salleCommune}</p>
            <p>{communeSelected.salleContact}</p>
         
          {
            admin &&
          <div className='commune-btn'>
            <div onClick={() => setDeleteMode(true)} className="delete-btn">
              <FontAwesomeIcon icon={faTrashCan} />
              <p className='supprimer-commune'>Supprimer la commune</p>
            </div>
            <div onClick={() => modifyCommune()} className="modify-btn">
              <FontAwesomeIcon icon={faPenToSquare} />
              <p className='modifier-commune'>Modifier la commune</p>
            </div>
            {
              deleteMode &&
              <div className="delete-confirmation">
                <div className="delete-confirmation-pop-up">
                  <p>Êtes-vous sûr de vouloir supprimer cette commune ?</p>
                  <div className='delete-confirmation-btn'>
                    <button onClick={() => deleteCommune()} className='confirm-btn'>Supprimer</button>
                    <button onClick={() => setDeleteMode(false)} className='cancel-btn'>Annuler</button>
                  </div>
                </div>
              </div>
            }  
          </div>
          }
          {
            admin && 
            <div className="ajout-photo">
              <h4>Ajouter une photo</h4>
              <form>                
                <input onInput={e => changeChemin(e)} type="file"/>
                <button onClick={(e) => addPhotoCommune(e)}>Valider</button>
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
        </div>
        }
        {
          communePhotos !== [] && menu === "salle" &&           
          <Slider dataSlider={communePhotos} getPhoto={getPhotoCommune} admin={admin}/>
        }
      
 
      </div>
      }
    </div>
  )
}
