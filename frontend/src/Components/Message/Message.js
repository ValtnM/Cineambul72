import React, { useState, useEffect } from 'react'
import './Message.scss'
import '../../assets/animations.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

export default function Message(props) {

    const [messageList, setMessageList] = useState();

    useEffect(() => {
        getMessage(props.pageName)
    }, [])

    const getMessage = (page) => {
        fetch(`http://localhost:8080/api/message/${page}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .then(data => setMessageList(data))
        .catch(err => console.log(err))
    }

  return (
    <div className='message-container'>
        {
            messageList &&
            <ul>
                {
                    messageList.map((message,index) => (
                        <li style={{animationDelay: `${index * 0.1}s`}}>
                            {
                                message.type === "avertissement" &&
                                <FontAwesomeIcon className='message-icone avertissement' icon={faTriangleExclamation}></FontAwesomeIcon>
                            }
                            {
                                message.type === "information" &&
                                <FontAwesomeIcon className='message-icone information' icon={faCircleInfo}></FontAwesomeIcon>
                            }
                            <h3>{message.texte}</h3>
                        </li>
                    ))
                }
            </ul>
        }
        {/* {
            props.message.type === "avertissement"
            <FontAwesomeIcon icon={faTriangleExclamation}></FontAwesomeIcon>
        } */}
    </div>
  )
}
