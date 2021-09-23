import React from 'react';

export function BoardPreview({ board }) {
    return (
        <div className="board-preview">
            <h4>{board.title}</h4>
        </div>
    )
}