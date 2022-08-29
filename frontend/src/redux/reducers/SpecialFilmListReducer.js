const INITIAL_STATE = [
    // {
    //     afficheUrl: "https://pictures.betaseries.com/films/affiches/original/278.jpg",
    //     casting: "Jérémie Renier, Benoît Magimel, Monica Scattini",
    //     codeBetaSeries: 278,
    //     dateSortie: "14/03/2012",
    //     duree: "",
    //     genre: "Drame",
    //     id: 4,
    //     realisateur: "Florent-Emilio Siri",
    //     special: false,
    //     synopsis: "Cloclo, c’est le destin tragique d’une icône de la chanson française décédée à l’âge de 39 ans, qui plus de trente ans après sa disparition continue de fasciner. Star adulée et business man, bête de scène et pro du marketing avant l’heure, machine à tubes et patron de presse, mais aussi père de famille et homme à femmes…  Cloclo ou le portrait d’un homme complexe, multiple; toujours pressé, profondément moderne et prêt à tout pour se faire aimer.",
    //     titre: "Cloclo",
    //     trailerUrl: "https://www.youtube.com/embed/Nx2naUGho1k",
    // }
];

function SpecialFilmListReducer(state = INITIAL_STATE, action) {
    if(action.type === "ADDSPECIALDATA"){
        return action.payload
    }
    return state;
};

export default SpecialFilmListReducer;

