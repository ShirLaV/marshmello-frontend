import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { cardEditService } from '../../../services/card-edit.service'
import { onUpdateBoard } from '../../../store/board.actions'


export function _MoveCard({ board, currCardId, onUpdateBoard, onClose, goBack }) {
    const [currGroup, setCurrGroup] = useState(null)
    const [currPosition, setCurrPosition] = useState(null)

    useEffect(() => {
        const group = cardEditService.getGroupById(currCardId, board._id)
        setCurrGroup(group)
        const idx = group.cards.findIndex(card => card.id === currCardId)
        setCurrPosition(idx + 1)
    }, [board, currCardId])

    const handleChange = ({ target: { name, value } }) => {
        if (name === 'group') {
            const group = board.groups.find(item => item.id === value)
            setCurrGroup(group)
            setCurrPosition(group.cards.length + 1)
        } else if (name === 'position') {
            setCurrPosition(value)
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
        const groupId = currGroup.id
        const idx = currPosition - 1
        const boardToChange = cardEditService.handleMoveCard(currCardId, groupId, idx)
        onUpdateBoard({ type: '' }, boardToChange)
        goBack()
    }

    if (!currGroup) return null
    return (
        <div className="move-card">
            <h4>Select destination</h4>

            <div className="select-board">
                <span className="label">Board</span>
                <span className="select-value">{board.title}</span>
                <select name="board" onChange={handleChange}>
                    {/* {boards.map(item => <option key={item._id} value={item._id}>{item.title}</option>)} */}
                    <option value={board._id}>{board.title}</option>
                </select>
            </div>

            <div className="flex bottom-container">
                <div className="select-group">
                    <span className="label">List</span>
                    <span className="select-value">{currGroup.title}</span>
                    <select name="group" onChange={handleChange}>
                        {board.groups.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}
                    </select>
                </div>

                <div className="select-position">
                    <span className="label">Position</span>
                    <span className="select-value">{currPosition}</span>
                    <select name="position" onChange={handleChange}>
                        {getPositions().map((item, i) => <option key={i} value={item}>{item}</option>)}
                    </select>
                </div>
            </div>
            <button className="move-btn card-edit-btn secondary" onClick={handleSubmit}>Move</button>
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

const mapDispatchToProps = {
    onUpdateBoard
}

export const MoveCard = connect(mapStateToProps, mapDispatchToProps)(_MoveCard)
