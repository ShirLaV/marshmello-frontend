import React from 'react';
import { BoardPreview } from './board-preview';

export function BoardList({ boards, toggleStarredBoard, setFavicon, setAddBoard, isWorkspace }) {
    return (
        <div className="board-list flex">
            {boards.map(board =>
                <BoardPreview key={board._id} board={board} toggleStarredBoard={toggleStarredBoard} setFavicon={setFavicon} />)}

            {isWorkspace && <div className="board-preview create-board-btn" onClick={() => setAddBoard()}>
                <h4>Create New Board</h4>
            </div>}
        </div>
    );
}