import { faTicket } from '@fortawesome/free-solid-svg-icons'
import { faCircleArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'

const tarifsRoyal = [
    {
      icone: faTicket,
      nom: "Tarif Plein",
      prix: "5,50 €",
      description: []
    },
    {
      icone: faCircleArrowDown,
      nom: "Tarif Réduit",
      prix: "4,20 €",
      description: ["Demandeurs d'emploi", "Étudiants", "Moins de 12 ans", "Carte MJC", "Carte Cézam"]
    },
    {
      icone: faPeopleGroup,
      nom: "Carnet",
      prix: "42,00 €",
      description: ["11 places", "Non nominatif", "Durée illimitée"]
    }
  ]

export default tarifsRoyal;