import React from 'react';
import { Link } from 'react-router-dom'


export function BoardPreview({ board }) {
    return (
        <div className="board-preview" style={(board.style.bgColor) ? {backgroundColor: `${board.style.bgColor}`} : {backgroundColor: 'yellow'}}>
            <Link to={`/board/${board._id}`}><h4>{board.title}</h4></Link>
        </div>
    )
}