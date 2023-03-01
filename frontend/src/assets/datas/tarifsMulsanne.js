import { faTicket } from '@fortawesome/free-solid-svg-icons'
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { faChild } from '@fortawesome/free-solid-svg-icons'


const tarifsMulsanne = [
    {
      icone: faTicket,
      nom: "Tarif Plein",
      prix: "6,20 €",
      description: []
    },
    {
      icone: faCircleArrowDown,
      nom: "Tarif Réduit",
      prix: "5,20 €",
      description: ["Demandeurs d'emploi", "Moins de 14 ans", "Étudiants", "Plus de 70 ans", "Carte Cézam"]
    },    
    {
      icone: faPeopleGroup,
      nom: "Carnet",
      prix: "52,00 €",
      description: ["11 places", "Non nominatif", "Durée illimitée"]
    }
  ]

export default tarifsMulsanne;