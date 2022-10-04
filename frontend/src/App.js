import { useState } from 'react';
import './App.scss';
import Banner from './Components/Banner/Banner';
import Navbar from './Components/Navbar/Navbar';
import Accueil from './Pages/Accueil/Accueil';
import Circuit from './Pages/Circuit/Circuit';
import Royal from './Pages/Royal/Royal';
import Mulsanne from './Pages/Mulsanne/Mulsanne';
import Evenements from './Pages/Evenements/Evenements';
import Admin from './Pages/Admin/Admin';
import Contact from './Pages/Contact/Contact';
import FilmDetails from './Pages/FilmDetails/FilmDetails';
import {Route, Routes} from 'react-router-dom';
import FilmList from './Components/FilmList/FilmList';
import About from './Components/About/About';
import Commune from './Components/Commune/Commune';
import Salle from './Components/Salle/Salle';
import Tarif from './Components/Tarif/Tarif';
import tarifsCircuit from './assets/datas/tarifsCircuit';
import tarifsRoyal from './assets/datas/tarifsRoyal';
import tarifsMulsanne from './assets/datas/tarifsMulsanne';
import infosRoyal from './assets/datas/infosRoyal';
import infosMulsanne from './assets/datas/infosMulsanne'
import Foot from './Components/Foot/Foot';
import MentionsLegales from './Pages/MentionsLegales/MentionsLegales';
import EvenementDetails from './Components/EvenementDetails/EvenementDetails';

function App() {  

  const [pageUrl, setPageUrl] = useState(document.location.href.split('/')[3])
  
  return (
    <div>
      <Banner />
      <Navbar pageUrl={pageUrl} setPageUrl={setPageUrl}/>
      <Routes  id="container">
        <Route path='/' element={<Accueil />}>
          <Route path='/' element={<FilmList title="A l'affiche cette semaine" />}></Route>
          <Route path='/liste-films' element={<FilmList title="Liste des films" />}></Route>
          <Route path='/a-propos' element={<About />}></Route>
        </Route>
        <Route path='/circuit-itinerant' element={<Circuit />}>
          <Route path='/circuit-itinerant' element={<FilmList title="Circuit itinérant" />}></Route>
          <Route path='/circuit-itinerant/par-communes' element={<Commune />}></Route>
          <Route path='/circuit-itinerant/tarifs' element={<Tarif tarif={tarifsCircuit} />}></Route>          
        </Route>
        <Route path='/le-royal' element={<Royal />}>
          <Route path='/le-royal/a-laffiche' element={<FilmList title="Cinéma Le Royal" />}></Route>
          <Route path='/le-royal/la-salle' element={<Salle infos={infosRoyal} />}></Route>
          <Route path='/le-royal/tarifs' element={<Tarif tarif={tarifsRoyal} />}></Route>
        </Route>
        <Route path='/mulsanne' element={<Mulsanne />}>
          <Route path='/mulsanne/a-laffiche' element={<FilmList title="Cinéma de Mulsanne" />}></Route>
          <Route path='/mulsanne/la-salle' element={<Salle infos={infosMulsanne} />}></Route>
          <Route path='/mulsanne/tarifs' element={<Tarif tarif={tarifsMulsanne} />}></Route>
        </Route>
        <Route path='/evenements' element={<Evenements />}>
          <Route path='/evenements/seances-speciales' element={<FilmList title="Séances spéciales" />}></Route>
          <Route path='/evenements' element={<FilmList title="Évènements" />}></Route>
        </Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/film/:filmId/*" element={<FilmDetails />}></Route>
        <Route path="/evenement/:evenementId" element={<EvenementDetails />}></Route>
        <Route path="/nous-contacter" element={<Contact />}></Route>
        <Route path="/mentions-legales" element={<MentionsLegales />}></Route>
      </Routes>
      <Foot pageUrl={pageUrl} setPageUrl={setPageUrl}/>
    </div>
  );
}

export default App;
