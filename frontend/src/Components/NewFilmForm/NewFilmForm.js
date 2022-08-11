import { faListSquares } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid'
import "./NewFilmForm.scss"

import CommuneListReducer from '../../redux/reducers/CommuneListReducer';


export default function NewFilmForm() {

  const [special, setSpecial] = useState(false);
  const [lieu, setLieu] = useState("");

  const changeSpecial = (value) => {
    setSpecial(value)
  }
  const changeLieu = (value) => {
    setLieu(value)
  }


  const communeList = CommuneListReducer(undefined, []);
  const [communeSelected, setCommuneSelected] = useState();

  const getCommune = (value) => {
    communeList.forEach(element => {
      if(element.nom === value) {
        setCommuneSelected(element);
      }
    });
  }

  console.log(lieu);

  return (
    <div className='newfilm-form'>
        <h2>Ajoût d'un nouveau film</h2>
        <hr />
        <form action="">
            <label htmlFor="code">Code TMDB : </label>
            <input type="text" id='code' />
            <div className='special'>
              <p>Séance Spéciale ?</p>
              <div>
                <label htmlFor="oui">Oui</label>
                <input type="radio" name='special' id='oui' onChange={() => changeSpecial(true)} checked={special ? "checked" : false} />
                <label htmlFor="non">Non</label>
                <input type="radio" name='special' id='non' onChange={() => changeSpecial(false)} checked={!special ? "checked" : false} />
              </div>
            </div>

            {
              special && 
              <div>
                <div className='date'>
                  <label htmlFor="date">Date : </label>
                  <input type="date" id='date' />
                  <label htmlFor="heure">Heure : </label>
                  <input type="time" id='heure'/>
                </div>

                <div className="precision">
                  <label htmlFor="precision">Info(s) complémentaire(s) : </label>
                  <textarea name="" id="precision" cols="30" rows="5" placeholder='Plein air, intervenant,...'></textarea>
                </div>

                <div className='lieu'>
                  <p>Lieu :</p>
                  <div>
                    <label htmlFor="circuit">Circuit</label>
                    <input type="radio" name='lieu' id='circuit' onChange={() => changeLieu("circuit")} checked={lieu === "circuit" ? "checked" : false} />
                    <label htmlFor="royal">Royal</label>
                    <input type="radio" name='lieu' id='royal' onChange={() => changeLieu("royal")} checked={lieu === "royal" ? "checked" : false} />
                    <label htmlFor="mulsanne">Mulsanne</label>
                    <input type="radio" name='lieu' id='mulsanne' onChange={() => changeLieu("mulsanne")} checked={lieu === "mulsanne" ? "checked" : false} />
                    <label htmlFor="autre">Autre</label>
                    <input type="radio" name='lieu' id='autre' onChange={() => changeLieu("autre")} checked={lieu === "autre" ? "checked" : false} />
                  </div>
                </div>

                {
                  lieu === "circuit" &&
                  <div className="communes">
                      <select onChange={(e) => getCommune(e.target.options[e.target.selectedIndex].text)} name="communes">
                          <option key={uuidv4()} value="Null">Sélectionner une commune</option>
                          {communeList.map(commune => (
                              <option key={uuidv4()} value={commune}>{commune.nom}</option>
                          ))}
                      </select>        
                  </div>
                }

            {
              (lieu == "circuit" || lieu === "mulsanne" || lieu === "autre" && special) &&
              <div className="lieu-precis">
                <label htmlFor="salle">Lieu précis : </label>
                <textarea name="salle" id="salle" cols="30" rows="5" placeholder='Salle, commune,...'></textarea>
              </div>
            }
            </div>
            }

            <button>Valider</button>
        </form>
    </div>
  )
}
