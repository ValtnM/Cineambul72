import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './PhotoViewer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'

import ViewerModeReducer from '../../redux/reducers/ViewerModeReducer'

export default function PhotoViewer(props) {

  const viewerModeState = useSelector(state => state.ViewerModeReducer);

  const dispatch = useDispatch();

  const toggleOffViewerMode = () => {
    dispatch({
      type: "CHANGEVIEWERMODE",
      payload: {
        toggle: false,
        photo: ""
      }
    })
  }

  return (
    <div className='photo-viewer'>
        {/* <div className="photo-viewer-content"> */}
          <img src={"https://cineambul72.fr/api/images/" + viewerModeState.photo} alt={viewerModeState.photo} />
            {/* <h2>HELLO</h2> */}
            <FontAwesomeIcon onClick={() => toggleOffViewerMode()} className='close-btn' icon={faCircleXmark} />
        {/* </div> */}
    </div>
  )
}
