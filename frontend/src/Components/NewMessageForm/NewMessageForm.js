import React, { useState } from 'react'
import './NewMessageForm.scss'
import '../../assets/animations.scss'

export default function NewMessageForm() {
  const [type, setType] = useState();
  const [accueil, setAccueil] = useState(false);
  const [circuit, setCircuit] = useState(false);
  const [royal, setRoyal] = useState(false);
  const [mulsanne, setMulsanne] = useState(false);
  const [evenements, setEvenements] = useState(false); 
  const [texte, setTexte] = useState();
  const [notificationMessage, setNotificationMessage] = useState();
  
  // Création d'un nouveau message
  const createMessage = (e) => {
    e.preventDefault();
    if(texte.length > 255) {
      setNotificationMessage({erreur: "Le nombre de caractères a été dépassé"})
    } else {
      const token = sessionStorage.getItem('token');
      fetch('https://cineambul72.fr/api/message', {
        method: "POST",
        headers: {
          'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: type,
          accueil: accueil,
          circuit: circuit,
          royal: royal,
          mulsanne: mulsanne,
          evenements: evenements,
          texte: texte
        })
      })
      .then(res => res.json())
      .then(data => {
        setNotificationMessage(data);
        if(data.message) {
          uncheckedRadio();
          setType("");
          setAccueil(false);
          setCircuit(false);
          setRoyal(false);
          setMulsanne(false);
          setEvenements(false);
          setTexte("")
        }
      })
      .catch(err => console.log(err))
    }
  }

  // Décochage des checkbox
  const uncheckedRadio = () => {
    const inputs = document.querySelectorAll('.message-type input')
    inputs.forEach(element => {
      element.checked = false;
    });
  }

  return (
    <div className='new-message-form'>
        <h2>Ajouter un message</h2>
        <form>
            <div className="message-type">
                <p>Type de message :</p>
                <div>                  
                  <div>
                    <label htmlFor="information">Information</label>
                    <input onChange={() => setType("information")} type="radio" id='information' name='type' value={type}/>
                  </div>
                  <div>
                    <label htmlFor="avertissement">Avertissement</label>
                    <input onChange={() => setType("avertissement")} type="radio" id='avertissement' name='type' value={type}/>
                  </div>
                </div>
            </div>
            <div className="message-page">
                <p>Sur quelle(s) page(s) ?</p>
                <div className='page-list'>
                  <div>
                    <label htmlFor="accueil">Accueil</label>
                    <input onChange={(e) => setAccueil(e.target.checked)} type="checkbox" id='accueil' checked={accueil}/>
                  </div>
                  <div>
                    <label htmlFor="circuit">Circuit</label>
                    <input onChange={(e) => setCircuit(e.target.checked)} type="checkbox" id='circuit' checked={circuit}/>
                  </div>
                  <div>
                    <label htmlFor="royal">Royal</label>
                    <input onChange={(e) => setRoyal(e.target.checked)} type="checkbox" id='royal' checked={royal}/>
                  </div>
                  <div>
                    <label htmlFor="mulsanne">Mulsanne</label>
                    <input onChange={(e) => setMulsanne(e.target.checked)} type="checkbox" id='mulsanne' checked={mulsanne}/>
                  </div>
                  <div>
                    <label htmlFor="evenements">Évènements</label>
                    <input onChange={(e) => setEvenements(e.target.checked)} type="checkbox" id='evenements' checked={evenements}/>
                  </div>
                </div>
            </div>
            <label htmlFor="texte"><span>Texte :</span></label>
            <textarea onChange={(e) => setTexte(e.target.value)} name="" id="texte" cols="30" rows="10" value={texte}></textarea>
            <div className="counter">
              
              {`${texte ? texte.length : 0}/255`}
            </div>
            <button onClick={(e) => createMessage(e)} className='message-btn'>Valider</button>
            {
              notificationMessage &&
              <div>
                {
                  notificationMessage.message ?
                  <div className='succes'>{notificationMessage.message}</div>
                  :
                  <div className="echec">{notificationMessage.erreur}</div>
                }
              </div>
            }
        </form>
    </div>
  )
}
