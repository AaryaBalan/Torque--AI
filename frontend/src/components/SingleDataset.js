import React from 'react'
import '../styles/SingleData.css'

const SingleDataset = (props) => {
    
    // open modal box function and setting states
    function openBox(id, title, description, img) {
        if (!props.inHome) {
            props.click(true)
            props.setInfo({
                id, title, description, img
            })
        }
    }

    return (
        <div className="single-dataset" onClick={() => openBox(props.id, props.title, props.description, props.img)}>
            <div className="img-area">
                <img src={props.img} alt="" />
            </div>
            <div className="content-area">
                <div className="title">{props.title.slice(0, 20)}...</div>
                <div className="description">{props.description.slice(0, 35)}...</div>
            </div>
        </div>
    )
}

export default SingleDataset