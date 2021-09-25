import React from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { Link } from 'react-router-dom'


export function BoardPreview({ board }) {
    return (
        <Link to={`/board/${board._id}`}><div className="board-preview" style={(board.style.bgColor) ? { backgroundColor: `${board.style.bgColor}` } : { backgroundImage: `url(${board.style.imgUrl})` }}>
            <div className="preview-content">
                <h4 className="board-title">{board.title}</h4>
                <span className="star-btn"><AiOutlineStar /></span>
            </div>
        </div></Link>
    )
}