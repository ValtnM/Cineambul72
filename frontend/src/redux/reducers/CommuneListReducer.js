const INITIAL_STATE = [
    {
        url: "/circuit-itinerant/par-communes/allonnes",
        nom: "Allonnes",
        salle: {
            nom: "Maison des Arts Paul Fort",
            rue: "18 rue Georges Bizet",
            commune: "72700 Allonnes",
            contact: "02.43.80.48.00",
            photos: ["/allonnes/allonnes1.jpg", "/allonnes/allonnes2.jpg"]
        },
        photo: "/salles/allonnes/allonnes1.jpg"
    },
    {
        url: "/circuit-itinerant/par-communes/aubigne-racan",
        nom: "Aubigné-Racan",
        salle: {
            nom: "Salle polyvalente",
            rue: "Rue de la gare",
            commune: "72800 Aubigné-Racan",
            contact: "02.43.46.11.34",
            photos: ["allonnes1.jpg", "allonnes2.jpg"]
        },
        photo: "/salles/allonnes/allonnes1.jpg"
    }
    // "Allonnes",
    // "Aubigné-Racan",
    // "Bonnétable",
    // "Bouloire",
    // "Champagné",
    // "Coulaines",
    // "Ecommoy"
];

function CommuneListReducer(state = INITIAL_STATE, action) {
    return state;
};

export default CommuneListReducer;
