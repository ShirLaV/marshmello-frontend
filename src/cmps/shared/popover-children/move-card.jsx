import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { cardEditService } from '../../../services/card-edit.service'


export function _MoveCard({ boards, board, currCardId }) {
    const [initialBoard] = useState(board._id)
    const [currBoard, setCurrBoard] = useState(board)
    const [currGroup, setCurrGroup] = useState(null)
    const [currPosition, setCurrPosition] = useState(null)

    useEffect(() => {
        const group = cardEditService.getGroupById(currCardId, currBoard._id)
        setCurrGroup(group)
        const idx = group.cards.findIndex(card => card.id === currCardId)
        setCurrPosition(idx + 1)
    }, [board])

    const handleChange = ({ target: { name, value } }) => {
        if (name === 'board') {
            const newBoard = boards.find(item => item._id === value)
            setCurrBoard(newBoard)
            setCurrGroup(newBoard.groups[0])
            setCurrPosition(newBoard.groups[0].cards.length + 1)

        } else if (name === 'group') {
            const group = currBoard.groups.find(item => item.id === value)
            setCurrGroup(group)
            setCurrPosition(group.cards.length + 1)
        } else {
            setCurrPosition(currGroup.cards.length + 1)
        }
    }

    const getPositions = () => {
        const length = currGroup.cards.length + 1
        const positions = []
        for (let i = 1; i <= length; i++) {
            positions.push(i)
        }
        return positions
    }

    const handleSubmit = () => {
        const boardId = currBoard._id
        const groupId = currGroup.id
        const idx = currPosition - 1

    }

    if (!currBoard || !currGroup) return null
    return (
        <div className="move-card">
            <h4>Select destination</h4>

            <div className="select-board">
                <span className="label">Board</span>
                <span className="select-value">{currBoard.title}</span>
                <select name="board" onChange={handleChange}>
                    {boards.map(item => <option key={item._id} value={item._id}>{item.title}</option>)}
                </select>
            </div>

            <div className="flex bottom-container">
                <div className="select-group">
                    <span className="label">List</span>
                    <span className="select-value">{currGroup.title}</span>
                    <select name="group" onClick={handleChange}>
                        {currBoard.groups.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
                    </select>
                </div>

                <div className="select-position">
                    <span className="label">Position</span>
                    <span className="select-value">{currPosition}</span>
                    <select onChange={handleChange}>
                        {getPositions().map((item, i) => <option key={i} value={item}>{item}</option>)}
                    </select>
                </div>
            </div>
            <button className="move-btn card-edit-btn secondary">Move</button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard,
        boards: state.boardModule.boards,
        currCardId: state.boardModule.currCardId
    }
}

export const MoveCard = connect(mapStateToProps)(_MoveCard)
