import React, { useState, useEffect } from 'react'
import nl2br from "react-nl2br"
import './Message.scss'
import '../../assets/animations.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

export default function Message(props) {

    const [admin, setAdmin] = useState(false);
    const [messageList, setMessageList] = useState();

    useEffect(() => {
        checkAdmin();
        getMessage(props.pageName);
    }, [])

    // Vérification du token d'authentification
    const checkAdmin = () => {
        const token = sessionStorage.getItem('token')
        if (token) {     
          fetch(`https://cineambul72.fr/api/admin/${token}`, {
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

    // Récupération des messages correspondant à cette page
    const getMessage = (page) => {
        fetch(`https://cineambul72.fr/api/message/${page}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .then(data => {
            setMessageList(data)
        })
        .catch(err => console.log(err))
    }

    // Suppression d'un message
    const deleteMessage = (messageId) => {
        const token = sessionStorage.getItem('token');
        fetch(`https://cineambul72.fr/api/message/${messageId}`, {
            method: "DELETE",
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.message) {
                getMessage(props.pageName)
            }
        })
        .catch(err => console.log(err))
    }

    

  return (
    <div className='message-container'>
        {
            messageList &&
            <ul>
                {
                    messageList.map((message,index) => (
                        <li style={{animationDelay: `${(index - 1) * 0.1}s`}} key={props.pageName + index}>
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
                                <FontAwesomeIcon onClick={() => deleteMessage(message.id)} className='message-close-btn' icon={faTrashCan}></FontAwesomeIcon>
                            }
                        </li>
                    ))
                }
            </ul>
        }
    </div>
  )
}
