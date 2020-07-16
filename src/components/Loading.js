import React from 'react'
import loadingGif from '../images/gif/loading-pulsating.gif'

const Loading = () => {
    return (
        <div className="loading">
            <h4>Loading...</h4>
            <img src={loadingGif} alt=""></img>
        </div>
    )
}

export default Loading
