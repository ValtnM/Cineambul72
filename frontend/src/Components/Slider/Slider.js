import React, {useState} from 'react'
import './Slider.scss'
// import dataSlider from './dataSlider'
import BtnSlider from './BtnSlider'
import {v4 as uuidv4} from 'uuid'

export default function Slider({dataSlider}) {


    const [slideAnim, setSlideAnim] = useState({
        index: 1,
        inProgress: false
    })


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

    const moveDot = index => {
        setSlideAnim({index: index, inProgress: false})
    }


  return (
    <div className='container-slider'>
        {dataSlider.map((obj, index) => {
            return (
                <div 
                key={uuidv4()} 
                className={slideAnim.index === index + 1 ? "slide active-anim" : "slide"}
                >
                    <img src={process.env.PUBLIC_URL + `/salles${obj}`} alt="" />
                </div>
            )
        })}
        <BtnSlider moveSlide={nextSlide} direction="next" />
        <BtnSlider moveSlide={prevSlide} direction="prev" />

        <div className="container-dots">
            {Array.from({length: dataSlider.length}).map((item, index) => {
                return <button 
                key={uuidv4()}
                onClick={() => moveDot(index+1)} 
                className={slideAnim.index === index + 1 ? 'dot active' : 'dot'}
                ></button>})}

            {/* <button className={slideAnim.index === 1 ? "dot active" : "dot"}></button> 
            <button className={slideAnim.index === 2 ? "dot active" : "dot"}></button> 
            <button className={slideAnim.index === 3 ? "dot active" : "dot"}></button> 
            <button className={slideAnim.index === 4 ? "dot active" : "dot"}></button> 
            <button className={slideAnim.index === 5 ? "dot active" : "dot"}></button>  */}
        </div>        
    </div>
  )
}
