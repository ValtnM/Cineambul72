import './App.css';
import Banner from './Components/Banner/Banner';
import Navbar from './Components/Navbar/Navbar';
import Accueil from './Pages/Accueil/Accueil';
import Circuit from './Pages/Circuit/Circuit';
import Royal from './Pages/Royal/Royal';
import Mulsanne from './Pages/Mulsanne/Mulsanne';
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div>
      <Banner />
      <Navbar />
      <Routes>
        <Route path='/' element={<Accueil />}></Route>
        <Route path='/circuit-itinerant' element={<Circuit />}></Route>
        <Route path='/le-royal' element={<Royal />}></Route>
        <Route path='/mulsanne' element={<Mulsanne />}></Route>
      </Routes>
    </div>
  );
}

export default App;
