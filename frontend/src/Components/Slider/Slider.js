import React, {useState} from 'react'
import './Slider.scss'
import BtnSlider from './BtnSlider'
import {v4 as uuidv4} from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

export default function Slider({dataSlider, getPhoto, admin}) {

    const [slideAnim, setSlideAnim] = useState({
        index: 1,
        inProgress: false
    })

    // Suppression d'une photo
    const deletePhoto = (photoName) => {
      const token = localStorage.getItem("token");
      fetch(`https://test-cineambul72.fr/api/photo/${photoName}`, {
            method: "DELETE",          
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then((data) => {
            if(data.message) {
                getPhoto();
                if(slideAnim.index > 1) {
                    setSlideAnim({...slideAnim, index: slideAnim.index - 1})
                }
            }
        })
        .catch(err => console.log(err))
    }

    // Faire défilé les photos vers la gauche
    const nextSlide = () => {
        if(slideAnim.index !== dataSlider.length && !slideAnim.inProgress){
            setSlideAnim({index: slideAnim.index + 1, inProgress: true})
            setTimeout(() => {
                setSlideAnim({index: slideAnim.index + 1, inProgress: false})
            },400)            
        } else if(slideAnim.index === dataSlider.length && !slideAnim.inProgress) {
            setSlideAnim({index: 1, inProgress: true})
            setTimeout(() => {
                setSlideAnim({index: 1, inProgress: false})
            },400)   
        }
    }

    // Faire défilé les photos vers la droite
    const prevSlide = () => {
        if(slideAnim.index !== 1 && !slideAnim.inProgress) {
            setSlideAnim({index: slideAnim.index - 1, inProgress: true})
            setTimeout(() => {
                setSlideAnim({index: slideAnim.index - 1, inProgress: false})
            },400)   
        }
        else if(slideAnim.index === 1 && !slideAnim.inProgress){
            setSlideAnim({index: dataSlider.length, inProgress: true})
            setTimeout(() => {
                setSlideAnim({index: dataSlider.length, inProgress: false})
            },400)   
        } 
    }

    // Faire défilé le point
    const moveDot = index => {
        setSlideAnim({index: index, inProgress: false})
    }


  return (
    <div className='container-slider'>
        {   dataSlider.length !== 0 ?
            dataSlider.map((obj, index) => {
                return (
                    <div 
                    key={uuidv4()} 
                    className={slideAnim.index === index + 1 ? "slide active-anim" : "slide"}
                    >
                        <img src={"https://test-cineambul72.fr/api/images/" + obj} alt="" />
                        {
                            admin &&
                            <FontAwesomeIcon onClick={() => deletePhoto(obj)} className="delete-photo-btn" icon={faTrashCan} />
                        }
                    </div>
                )
            })
            :
            <div className='slide active-anim'>
                <img src="/salles/photo_indispo.png" alt="" />
            </div>
        }
        <BtnSlider moveSlide={nextSlide} direction="next" />
        <BtnSlider moveSlide={prevSlide} direction="prev" />

        <div className="container-dots">
            {Array.from({length: dataSlider.length}).map((item, index) => {
                return <button 
                key={uuidv4()}
                onClick={() => moveDot(index+1)} 
                className={slideAnim.index === index + 1 ? 'dot active' : 'dot'}
                ></button>})}            
        </div>        
    </div>
  )
}
