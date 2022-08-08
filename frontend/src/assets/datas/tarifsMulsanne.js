import { faTicket } from '@fortawesome/free-solid-svg-icons'
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import { faChild } from '@fortawesome/free-solid-svg-icons'


const tarifsMulsanne = [
    {
      icone: faTicket,
      nom: "Tarif Plein",
      prix: "5,80 €",
      description: []
    },
    {
      icone: faCircleArrowDown,
      nom: "Tarif Réduit",
      prix: "4,80 €",
      description: ["Demandeurs d'emploi", "Étudiants", "Plus de 70 ans"]
    },
    {
      icone: faChild,
      nom: "Tarif Enfant",
      prix: "4,00 €",
      description: ["Moins de 14 ans"]
    },
    {
      icone: faPeopleGroup,
      nom: "Carnet",
      prix: "42,00 €",
      description: ["11 places", "Non nominatif", "Durée illimitée"]
    }
  ]

export default tarifsMulsanne;