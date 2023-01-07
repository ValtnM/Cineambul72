import React, { useEffect, useState } from "react";
import "./Contact.scss";
import { GiRotaryPhone } from "react-icons/gi";
import { FiMail } from "react-icons/fi";

export default function () {
  const [typeOfContact, setTypeOfContact] = useState("mail");
  const [prenom, setPrenom] = useState();
  const [nom, setNom] = useState();
  const [adresse, setAdresse] = useState();
  const [sujet, setSujet] = useState();
  const [objet, setObjet] = useState();
  const [message, setMessage] = useState();
  const [messageNotification, setMessageNotification] = useState();
  const [messageSended, setMessageSended] = useState(false);
  const [success, setSuccess] = useState();

  useEffect(() => {
    window.scrollTo(0, 100);
  }, []);

  // Envoi de l'email
  const sendMessage = (e) => {
    setMessageNotification("");
    setMessageSended(true);
    e.preventDefault();
    fetch("https://cineambul72.fr/api/mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prenom: prenom,
        nom: nom,
        adresse: adresse,
        sujet: sujet,
        objet: objet,
        message: message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.erreur) {
          setSuccess(false);
        } else if (data.message) {
          setSuccess(true);
          setPrenom("");
          setNom("");
          setAdresse("");
          setSujet("");
          setObjet("");
          setMessage("");
        }
        setMessageSended(false);
        setMessageNotification(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="contact">
      <h2>Nous contacter</h2>
      <nav>
        <div onClick={() => setTypeOfContact('mail')} className={typeOfContact === "mail" ? "contact-icons active" : "contact-icons"}>
          <FiMail />
        </div>
        <div onClick={() => setTypeOfContact('téléphone')} className={typeOfContact === "téléphone" ? "contact-icons active" : "contact-icons"}>
          <GiRotaryPhone />
        </div>
      </nav>
      {typeOfContact === "mail" && (
        <form>
            <h3>Par mail</h3>
            <hr />
          <label htmlFor="prenom">Votre prénom :</label>
          <input
            onChange={(e) => setPrenom(e.target.value)}
            type="text"
            id="prenom"
            value={prenom}
          />
          <label htmlFor="nom">Votre nom :</label>
          <input
            onChange={(e) => setNom(e.target.value)}
            type="text"
            id="nom"
            value={nom}
          />
          <label htmlFor="adresse">Votre adresse email :</label>
          <input
            onChange={(e) => setAdresse(e.target.value)}
            type="email"
            id="adresse"
            value={adresse}
          />
          <div className="contact-form-sujet">
            <p>Quel est le sujet de votre message ?</p>
            <div className="radio-sujet">
              <div>
                <label htmlFor="circuit">Circuit</label>
                <input
                  onChange={(e) => setSujet(e.target.id)}
                  type="radio"
                  id="circuit"
                  name="sujet"
                />
              </div>
              <div>
                <label htmlFor="royal">Royal</label>
                <input
                  onChange={(e) => setSujet(e.target.id)}
                  type="radio"
                  id="royal"
                  name="sujet"
                />
              </div>
              <div>
                <label htmlFor="mulsanne">Mulsanne</label>
                <input
                  onChange={(e) => setSujet(e.target.id)}
                  type="radio"
                  id="mulsanne"
                  name="sujet"
                />
              </div>
              <div>
                <label htmlFor="site">Site web</label>
                <input
                  onChange={(e) => setSujet(e.target.id)}
                  type="radio"
                  id="site"
                  name="sujet"
                />
              </div>
              <div>
                <label htmlFor="autre">Autre</label>
                <input
                  onChange={(e) => setSujet(e.target.id)}
                  type="radio"
                  id="autre"
                  name="sujet"
                />
              </div>
            </div>
          </div>
          <label htmlFor="objet">Objet :</label>
          <input
            onChange={(e) => setObjet(e.target.value)}
            type="text"
            id="objet"
            value={objet}
          />
          <label htmlFor="message">Message :</label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            name="message"
            id="message"
            cols="30"
            rows="10"
            value={message}
          ></textarea>
          <div
            style={messageSended ? { opacity: 1 } : { opacity: 0 }}
            className="loader"
          ></div>

          <button onClick={(e) => sendMessage(e)}>Envoyer</button>

          {messageNotification && !success && (
            <div className="notification echec">
              {messageNotification.erreur}
            </div>
          )}
          {messageNotification && success && (
            <div className="notification succes">
              {messageNotification.message}
            </div>
          )}
        </form>
      )}
      {
        typeOfContact === "téléphone" && 
        <div className="phone">
            <h3>Par téléphone</h3>
            <hr />
            <div className="phone-contact">
                Cinéma Le Royal : 02.43.84.58.62
            </div>
        </div>
      }
    </div>
  );
}
