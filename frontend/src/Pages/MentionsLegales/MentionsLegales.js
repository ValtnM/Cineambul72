import React from 'react'
import './MentionsLegales.scss'

export default function MentionsLegales() {
  return (
    <div className='mentions-legales'>
        <h2>Mentions Legales</h2>
        <hr />
        <div className='cards'>
            <div className="editeur">
                <h3>Éditeur du site</h3>
                <p>
                    <span>Association CinéAmbul 72</span><br />
                    409 avenue Félix Geneslay<br />
                    72100 LE MANS<br/>
                    Tél: 02.43.84.58.62
                </p>
            </div>
            <div className='hebergeur'>
                <h3>Hébergeur</h3>
                <p>
                    <span>PlanetHoster</span><br/>
                    4416 rue Louis B. Mayer, Laval<br/>
                    QUEBEC H7P 0G1, Canada<br/>
                    Tél: +33 (0)1 76 60 41 43
                </p>
            </div>
            <div className="directeur">
                <h3>Directrice de la publication</h3>
                <p>
                    <span>Ginette Chaveneau</span><br/>
                    Présidente de CinéAmbul 72
                </p>
            </div>
        </div>
    </div>
  )
}
