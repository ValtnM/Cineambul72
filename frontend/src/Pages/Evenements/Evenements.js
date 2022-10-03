import React, {useState, useEffect} from 'react'
import './Evenements.scss'
import Message from '../../Components/Message/Message'
import FilmList from '../../Components/FilmList/FilmList'

export default function Evenements() {

  const [delay, setDelay] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setDelay(true)
    }, 400)
  }, [])

  return (
    <div className='evenements'>
        <Message pageName="evenements"></Message>
        {
          delay &&
          <FilmList title="Séances évènements"></FilmList>
        }
    </div>
  )
}
