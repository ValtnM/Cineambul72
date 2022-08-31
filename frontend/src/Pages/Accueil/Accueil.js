import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './Accueil.scss'
import {Link, Outlet, useParams} from 'react-router-dom'
import WeekDateForm from '../../Components/WeekDateForm/WeekDateForm';

import DatesSemaineReducer from '../../redux/reducers/DatesSemaineReducer'



export default function Accueil() {
  
  const datesSemaine = useSelector(state => state.DatesSemaineReducer)
  const dispatch = useDispatch();

  useParams();

  const admin = true;
  
  const accueilUrl = document.location.href.split('/')[3];
  const [menu, setMenu] = useState(accueilUrl)
  const [dateDebut, setDateDebut] = useState();
  const [dateFin, setDateFin] = useState();


  useEffect(() => {
    getWeekDate();
  }, [])
  
  // Modification de l'état de Menu
  const changeMenu = (content) => {
    setMenu(content)
  } 

  // Modification des dates de la semaine en cours dans la BDD
  const putWeekDate = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/dates_semaine", {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            dateDebut: dateDebut,
            dateFin: dateFin
        })
    })
    .then(() => getWeekDate())
    .catch(err => console.log(err))
  }

  // Récupération des dates de la semaine en cours dans la BDD
  const getWeekDate = () => {
    fetch("http://localhost:8080/api/dates_semaine", {
        method: "GET",
        headers: {'Content-Type': 'application/json'},
    })
    .then(res => res.json())
    .then(data => {
        setDateDebut(data.dateDebut.split("T")[0]);
        setDateFin(data.dateFin.split("T")[0]);
        changeDates(data)
    })
  }

  // Modification du state contenant les dates de la semaine en cours
  const changeDates = (data) => {
    dispatch({
      type: "CHANGEDATES",
      payload: data
    })
  }   

  return (
    <div className='accueil'>
      <nav className='accueil-nav'>
        <ul>
          <Link to="/"><li onClick={() => changeMenu("a-laffiche")} className={menu === "" ? "active" : ""}>A l'affiche cette semaine</li></Link>
          <Link to="/liste-films"><li onClick={() => changeMenu("liste-films")} className={menu === "liste-films" ? "active" : ""}>Liste des films</li></Link>
          <Link to="/a-propos"><li onClick={() => changeMenu("a-propos")} className={menu === "a-propos" ? "active" : ""}>A propos de Cinéambul 72</li></Link>
        </ul>
      </nav>

      {
        admin && accueilUrl === "" &&
        <WeekDateForm dateDebut={dateDebut} dateFin={dateFin} setDateDebut={setDateDebut} setDateFin={setDateFin} putWeekDate={putWeekDate}></WeekDateForm>      
      }

      <Outlet dateDebut={dateDebut} dateFin={dateFin}/>
     
    </div>
  )
}
