const INITIAL_STATE = [
    {
        commune: 'Allonnes',
        salle: "Maison des Arts Paul Fort",
        date: "Mardi 9 août à 14h30 et 17h30"
    },
    {
        commune: 'Aubigné-Racan',
        salle: "Salle Polyvalente",
        date: "Mercredi 10 août à 20h30"
    },
    {
        commune: 'Bessé-sur-Braye',
        salle: "Salle de la Pléiade",
        date: "Mercredi 10 août à 20h30"
    },
    {
        commune: 'Bouloire',
        salle: "Théâtre Epidaure",
        date: "Vendredi 12 août à 20h30"
    },
    {
        commune: 'Fresnay-sur-Sarthe',
        salle: "Salle André Voisin",
        date: "Samedi 13 août à 20h30"
    },
    {
        commune: 'Marolles-les-Braults',
        salle: "Salle Jean de la Fontaine",
        date: "Mercredi 10 août à 20h00"
    },    
];

function SeanceListReducer(state = INITIAL_STATE, action) {
    return state;
};

export default SeanceListReducer;