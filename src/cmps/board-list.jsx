import React from 'react';
import { BoardPreview } from './board-preview';

export function BoardList({ boards }) {
    return (
        <div className="board-list flex">
            {boards.map(board =>
                <BoardPreview key={board._id} board={board} />)}
        </div>
    );
}