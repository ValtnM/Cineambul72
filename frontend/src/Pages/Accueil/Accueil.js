import React, {useState, useEffect} from 'react'
import './Accueil.scss'
import Map from '../../assets/img/map.png'
import CreditMutuel from '../../assets/img/logo_credit_mutuel.jpg'
import PDL from '../../assets/img/logo_pays_de_la_loire.png'
import CNC from '../../assets/img/logo-cnc.png'
import Sarthe from '../../assets/img/logo-sarthe.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
import FilmListReducer from '../../redux/reducers/FilmListReducer'
import FilmList from '../../Components/FilmList/FilmList'

export default function Accueil() {

  const [menu, setMenu] = useState('films');

  const changeMenu = (content) => {
    setMenu(content)
  }


  return (
    <div className='accueil'>
      <nav className='accueil-nav'>
        <ul>
          <li onClick={() => changeMenu("films")} className={menu === "films" && "active"}>A l'affiche cette semaine</li>
          <li onClick={() => changeMenu("about")} className={menu === "about" && "active"}>A propos de Cinéambul 72</li>
        </ul>
      </nav>

      {menu === 'films' &&          

        <FilmList title="à l'affiche cette semaine" />
      }


      {
      menu === "about" && 

      <div>
        <div className="about">
          <h2>à propos de Cinéambul 72</h2>
          <div className="about-txt">
            <p>
              Depuis sa création, en 1986, les bénévoles et les projectionnistes de l’association Ciné’Ambul 72 vont à la rencontre du public sarthois afin de lui proposer un cinéma de proximité à des tarifs accessibles à tous.
            </p>
            <p>
              Les objectifs de notre association sont de promouvoir le cinéma comme moyen de culture populaire, à la portée de tous, tout en créant du lien social et en permettant une vraie solidarité entre les communes par la mutualisation : les bonnes recettes réalisées dans les grosses communes permettent aux petites de bénéficier, elles aussi, de séances de qualité même pour un public parfois peu nombreux. Par ailleurs, le système d’adhésion à Ciné’Ambul par le versement d’ une cotisation au nombre d’habitants permet d’impliquer les élus des communes et communautés de communes soucieux d’offrir ce service culturel de proximité à leurs administrés.
            </p>
            <p>
              Ce sont à présent 35 communes du département qui bénéficient régulièrement, dans leurs salles, grâce à une équipe de projectionnistes professionnels, de séances de cinéma avec la diffusion de films récents. Depuis 2013, l’acquisition de projecteurs numériques permet d’assurer des séances de grande qualité avec des images et un son parfaits. Pour chaque séance, une équipe de bénévoles de la commune assure la communication et l’accueil des spectateurs.
            </p>
            <p>
              Dans le domaine scolaire et du jeune public, Ciné’Ambul participe également aux deux opérations mises en place conjointement par le Ministère de l’Éducation Nationale et celui de la Culture : « École et Cinéma » et « Collège et Cinéma ».
            </p>
            <p>
              Par ailleurs, notre succès grandissant incite de plus en plus de communes à faire appel à Ciné’Ambul pour organiser ponctuellement des séances de plein air pendant les mois d’été ce qui témoigne de la confiance envers le professionnalisme et les options culturelles de notre association.
            </p>
            <p>
              Il nous restait à moderniser nos moyens de communication. Avec ce nouveau site, c’est chose faite ! Ce site va évoluer au cours du temps, d’une part grâce à sa mise à jour régulière mais aussi grâce à votre collaboration. N’hésitez donc pas à nous communiquer vos remarques et vos suggestions qui pourront ainsi nous faire progresser en améliorant la qualité de ce moyen de communication.
            </p>
          </div>
          <div className='about-card'>
            <iframe loading="lazy" src="https://www.google.com/maps/d/embed?mid=1kADhmxPeePDsaZlJPjZU9y0kHuE" width="640" height="480"></iframe>
            <img src={Map} alt="Logo Google Maps" />
          </div>
        </div>

        <div className="support">
          <h2>Nos soutiens</h2>
          <div className='support-list'>
            <ul>
              <li><FontAwesomeIcon className="list-icon list-icon-link" icon={faCircleArrowRight} /><a href="">Centre National du Cinéma et de l'image animée</a></li>
              <li><FontAwesomeIcon className="list-icon" icon={faCircleArrowRight} />Communes adhérentes</li>
              <li><FontAwesomeIcon className="list-icon list-icon-link" icon={faCircleArrowRight} /><a href="">Conseil départemental de la Sarthe</a></li>
              <li><FontAwesomeIcon className="list-icon list-icon-link" icon={faCircleArrowRight} /><a href="">Région Pays de la Loire</a></li>
              <li><FontAwesomeIcon className="list-icon list-icon-link" icon={faCircleArrowRight} /><a href="">Crédit Mutuel</a></li>
              <li><FontAwesomeIcon className="list-icon" icon={faCircleArrowRight} />Communautés de communes</li>
            </ul>
            <div className='logo'>
              <img src={CNC} alt="logo du CNC" />
              <img src={Sarthe} alt="logo de la Sarthe" />
              <img src={PDL} alt="logo des pays de la loire" />
              <img src={CreditMutuel} alt="logo du Crédit mutuel" />
            </div>
          </div>
        </div>
      </div>
      }
      
    </div>
  )
}
