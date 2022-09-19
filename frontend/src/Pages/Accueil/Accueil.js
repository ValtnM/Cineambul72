import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './Accueil.scss'
import {Link, Outlet, useParams} from 'react-router-dom'
import WeekDateForm from '../../Components/WeekDateForm/WeekDateForm';
import Message from '../../Components/Message/Message';

import DatesSemaineReducer from '../../redux/reducers/DatesSemaineReducer'



export default function Accueil() {

  
  const datesSemaine = useSelector(state => state.DatesSemaineReducer)
  const dispatch = useDispatch();

  useParams();

  const [admin, setAdmin] = useState(false);
  
  const accueilUrl = document.location.href.split('/')[3];
  const [menu, setMenu] = useState()
  const [dateDebut, setDateDebut] = useState();
  const [dateFin, setDateFin] = useState();
  // const [message, setMessage] = useState();




  useEffect(() => {
    getWeekDate();
    checkAdmin();
  }, [])

  useEffect(() => {
    setMenu(accueilUrl)
  },[accueilUrl])

  const checkAdmin = () => {
    const token = localStorage.getItem('token')
    if (token) {     
      fetch(`http://localhost:8080/api/admin/${token}`, {
        method: "GET",
      })
      .then(res => res.json())
      .then((data) => {
        setAdmin(data.isAdmin);
      })
      .catch(err => console.log(err))
    } else {
      setAdmin(false)
    }
  }

  
   
  // Modification des dates de la semaine en cours dans la BDD
  const putWeekDate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    fetch("http://localhost:8080/api/dates_semaine", {
        method: "PUT",
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
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
      <Message pageName="accueil"></Message>
      <nav className='accueil-nav'>
        <ul>
          <Link to="/" className={menu === "" ? "active" : ""}><li onClick={() => setMenu("")} >A l'affiche cette semaine</li></Link>
          <Link to="/liste-films" className={menu === "liste-films" ? "active" : ""}><li onClick={() => setMenu("liste-films")}>Liste des films</li></Link>
          <Link to="/a-propos" className={menu === "a-propos" ? "active" : ""}><li onClick={() => setMenu("a-propos")}>A propos de Cinéambul 72</li></Link>
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
