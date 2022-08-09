import React from 'react'
import "./NewFilmForm.scss"

export default function NewFilmForm() {
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
                <input type="radio" name='special' id='oui' />
                <label htmlFor="non">Non</label>
                <input type="radio" name='special' id='non' checked />
              </div>
            </div>
            <button>Valider</button>
        </form>
    </div>
  )
}
