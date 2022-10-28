import React, {useState} from 'react'
import './NewEventForm.scss'

export default function NewEventForm() {

  const [affiche, setAffiche] = useState();
  const [titre, setTitre] = useState();
  const [description, setDescription] = useState();
  const [lien, setLien] = useState();
  const [messageNotification, setMessageNotification] = useState();

  const addEvent = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    fetch('https://cineambul72.fr/api/evenement', {
      method: "POST",
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nom: titre,
        affiche: affiche,
        texte: description,
        lien: lien
      })
    })
    .then(res => res.json())
    .then(data => {
      setMessageNotification(data)
      console.log(data);
    })
    .catch(err => console.log(err))
  }


  return (
    <div className='form-event'>
        <h2>Ajouter un évènement</h2>
        <form >
            <label htmlFor="affiche">Affiche*</label>
            <input onChange={(e) => setAffiche(e.target.value)} type="text" id='affiche' placeholder="http://.....image.jpg" />
            <label htmlFor="nom">Titre</label>
            <input onChange={(e) => setTitre(e.target.value)} type="text" id='nom' />
            <label htmlFor="texte">Description</label>
            <textarea onChange={(e) => setDescription(e.target.value)} type="text" id='texte' />
            <label htmlFor="lien">Lien</label>
            <input onChange={(e) => setLien(e.target.value)} type="text" id='lien' />
            <button onClick={(e) => addEvent(e)} >Valider</button>
        </form>
        {
          messageNotification &&
          <div>
            {
              messageNotification.message &&
              <div className='notification succes'>{messageNotification.message}</div>
            }
            {
              messageNotification.erreur &&
              <div className='notification echec'>{messageNotification.erreur}</div>
            }
          </div>
        }
    </div>
  )
}
