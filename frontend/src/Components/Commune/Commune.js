import React, {useState, useEffect} from 'react'
import './Commune.scss'
import Slider from '../Slider/Slider'
import CommuneList from '../CommuneList/CommuneList'
import FilmList from '../FilmList/FilmList'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faCheck} from '@fortawesome/free-solid-svg-icons'
import { faXmark} from '@fortawesome/free-solid-svg-icons'

export default function Commune(props) { 
  
  const [admin, setAdmin] = useState(false);

  // Vérification du token d'authentification
  const checkAdmin = () => {
    const token = sessionStorage.getItem('token')
    if (token) {     
      fetch(`https://test-cineambul72.fr/api/admin/${token}`, {
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
  const [modifyMode, setModifyMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [menu, setMenu] = useState('films');
  const [photoMessage, setPhotoMessage] = useState();

  useEffect(() => {
    getCommunesList();
    checkAdmin();
  }, [])

  
  useEffect(() => {
    console.log(communeSelected);
    getPhotoCommune();
    setCommuneMessage("");
    setMenu("films")
    clearCommuneForm();
    setModifyMode(false);
  }, [communeSelected])
  useEffect(() => {   
    setPhotoMessage("")
  }, [menu])
 
  // Ajout d'une photo à la commune sélectionnée
  const addPhotoCommune = (e) => {
    e.preventDefault();
    if(photoFile) {
      let formData = new FormData();
      formData.append("photo", photoFile)
      const token = sessionStorage.getItem('token');
      fetch(`https://test-cineambul72.fr/api/photo/${communeSelected.id}`, {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${token}`,
            // 'Content-Type': 'application/json'
        },
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

  // Nettoyage du formulaire d'ajoût de photo
  const clearPhotoForm = () => {
    const photoInput = document.querySelector('input[type="file"]')
    photoInput.value = null;
  }
  
  // Récupération des photos de la commune sélectionnée
  const getPhotoCommune = () => {
    if(communeSelected) {
      fetch(`https://test-cineambul72.fr/api/photo/${communeSelected.id}`)
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

  // Soumission du formulaire d'ajout et de modification de commune
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

  // Modification de la commune sélectionnée
  const updateCommune = (communeId) => {
    const token = sessionStorage.getItem('token');
    fetch(`https://test-cineambul72.fr/api/commune/${communeId}`, {
      method: 'PUT',
      headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(communeInfos)
    })
    .then(res => res.json())
    .then((data) => {
      if(data.message) {
        setCommuneSelected(communeInfos)
        // clearCommuneForm();
      }
      getCommunesList();
    })
    .catch(err => console.log(err))
  }

  // Passage en mode modification
  const modifyCommune = () => {
    setModifyMode(true);
    setCommuneInfos(communeSelected);
  }

  // Ajoût d'une commune
  const addCommune = () => {
    const token = sessionStorage.getItem('token');
    fetch("https://test-cineambul72.fr/api/commune", {
      method: 'POST',
      headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(communeInfos)
    })
    .then(res => res.json())
    .then((data) => {
      if(data.message){       
        getCommunesList();
        clearCommuneForm();
      }
      setCommuneMessage(data)
    })
    .catch(err => console.log(err))
  }

  // Suppression d'une commune
  const deleteCommune = () => {
    const token = sessionStorage.getItem('token');
    fetch(`https://test-cineambul72.fr/api/commune/${communeSelected.id}`, {
      method: 'DELETE',
      headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then((data) => {
      if(data.message) {        
        getCommunesList();
        clearCommuneForm();
        setCommuneSelected()
      }
      setDeleteMode(false)
    })
    .catch(err => console.log(err))
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

  // Nettoyage du formulaire d'ajoût ou de modification de commune
  const clearCommuneForm = () => {
    setCommuneInfos({
      nom: "",
      salleNom: "",
      salleRue: "",
      salleCommune: "",
      salleContact: ""
    })
  }

  // Modification des infos sur la commune sélectionnée
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
        admin && (!communeSelected || modifyMode) &&
        <div className="commune-form">
          {
            !modifyMode ?
            <h4>Ajouter une commune</h4>  
            :
            <h4>Modifier la commune</h4>
          }
          <form action="">
            <label htmlFor="nom">Nom de la commune</label>
            <input onChange={(e) => changeInfoCommune(e)} type="text" id='nom' required placeholder='ex: Allonnes' value={communeInfos.nom}/>
            <label htmlFor="salleNom">Nom de la salle</label>
            <input onChange={(e) => changeInfoCommune(e)} type="text" id='salleNom' required placeholder='ex: Salle polyvalente' value={communeInfos.salleNom}/>
            <label htmlFor="salleRue">Rue</label>
            <input onChange={(e) => changeInfoCommune(e)} type="text" id='salleRue' required placeholder='ex: 10 rue Victor Hugo' value={communeInfos.salleRue}/>
            <label htmlFor="salleCommune">Code Postal et Commune</label>
            <input onChange={(e) => changeInfoCommune(e)} type="text" id='salleCommune' required placeholder='ex: 72130 Fresnay-sur-Sarthe' value={communeInfos.salleCommune}/>
            <label htmlFor="salleContact">Contact</label>
            <input onChange={(e) => changeInfoCommune(e)} type="text" id='salleContact' required placeholder='ex: 02.43.12.34.56' value={communeInfos.salleContact}/>
            <div className='btn-block'>
              <FontAwesomeIcon className='btn btn-valid' icon={faCheck} onClick={(e) => submitCommuneForm(e)}>Valider</FontAwesomeIcon>
              {
                modifyMode &&
                <FontAwesomeIcon className='btn btn-cancel' icon={faXmark} onClick={() => setModifyMode(false)}>Annuler</FontAwesomeIcon>
              }
              </div>
          </form>
          {
            communeMessage && 
            <div>
              {communeMessage.message ? 
                <div className='message-succes' style={{color: 'green'}}>{communeMessage.message}</div>
                :
                <div className='message-echec' style={{color: 'red'}}>{communeMessage.error}</div>
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
                <input onInput={e => setPhotoFile(e.target.files[0])} type="file"/>
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
