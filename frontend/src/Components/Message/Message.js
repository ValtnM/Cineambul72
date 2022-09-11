import React, { useState, useEffect } from 'react'
import {v4 as uuidv4} from 'uuid'
import nl2br from "react-nl2br"
import './Message.scss'
import '../../assets/animations.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'

export default function Message(props) {

    const [admin, setAdmin] = useState(false);
    const [messageList, setMessageList] = useState();

    useEffect(() => {
        checkAdmin();
        getMessage(props.pageName);
    }, [])

    const checkAdmin = () => {
        const adminUserName = localStorage.getItem("username")
        const adminPassword = localStorage.getItem("password")
        fetch(`http://localhost:8080/api/admin/${adminUserName}/${adminPassword}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .then(data => setAdmin(data))
        .catch(err => console.log(err))    
    }

    const getMessage = (page) => {
        fetch(`http://localhost:8080/api/message/${page}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .then(data => setMessageList(data))
        .catch(err => console.log(err))
    }

    const deleteMessage = (messageId) => {
        fetch(`http://localhost:8080/api/message/${messageId}`, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => getMessage(props.pageName))
        .catch(err => console.log(err))
    }

  return (
    <div className='message-container'>
        {
            messageList &&
            <ul>
                {
                    messageList.map((message,index) => (
                        <li key={uuidv4()} style={{animationDelay: `${index * 0.1}s`}}>
                            {
                                message.type === "avertissement" &&
                                <FontAwesomeIcon className='message-icone avertissement' icon={faTriangleExclamation}></FontAwesomeIcon>
                            }
                            {
                                message.type === "information" &&
                                <FontAwesomeIcon className='message-icone information' icon={faCircleInfo}></FontAwesomeIcon>
                            }
                            <h3>{nl2br(message.texte)}</h3>
                            {
                                admin &&
                                <FontAwesomeIcon onClick={() => deleteMessage(message.id)} className='message-close-btn' icon={faCircleXmark}></FontAwesomeIcon>
                            }
                        </li>
                    ))
                }
            </ul>
        }
    </div>
  )
}
