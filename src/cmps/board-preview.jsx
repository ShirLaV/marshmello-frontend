import React from 'react';
import { AiOutlineStar } from 'react-icons/ai';
import { Link } from 'react-router-dom'


export function BoardPreview({ board, toggleStarredBoard, setFavicon }) {

    function toggleIsStarred(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        toggleStarredBoard(board)
    }

    return (
        <Link to={`/board/${board._id}`}><div onClick={() => setFavicon(board.style)} className="board-preview" style={(board.style.bgColor) ? { backgroundColor: `${board.style.bgColor}` } : { backgroundImage: `url(${board.style.imgUrl})` }}>
            <div className="preview-content">
                <h4 className="board-title">{board.title}</h4>
                <button className={`star-btn ${(board.isStarred) ? 'starred' : ''}`} onClick={(ev) => toggleIsStarred(ev)}><AiOutlineStar /></button>
            </div>
        </div></Link>
    )
}