import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { cardEditService } from '../../../services/card-edit.service'
import { onUpdateBoard } from '../../../store/board.actions'


export function _CopyCard({ board, currCardId, onUpdateBoard, onClose }) {
    const [currTitle, setCurrTitle] = useState('')
    const [currGroup, setCurrGroup] = useState(null)
    const [currPosition, setCurrPosition] = useState(null)

    useEffect(() => {
        const group = cardEditService.getGroupById(currCardId, board._id)
        const card = cardEditService.getCardById(currCardId, group.id)
        setCurrTitle(card.title)
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
        } else if (name === 'title') {
            setCurrTitle(value)
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
        const boardToChange = cardEditService.handleCopyCard(currCardId, groupId, idx, currTitle)
        onUpdateBoard({ type: '' }, boardToChange)
        onClose()
    }

    if (!currGroup) return null
    return (
        <div className="copy-card">
            <label>Title</label>
            <textarea name="title" className="search-input" autoFocus value={currTitle} onChange={handleChange} />


            <label>Copy to...</label>
            <div className="select-board">
                <span className="label">Board</span>
                <span className="select-value">{board.title}</span>
                <select name="board" onChange={handleChange}>
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
            <button className="copy-btn card-edit-btn secondary" onClick={handleSubmit}>Create card</button>
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

export const CopyCard = connect(mapStateToProps, mapDispatchToProps)(_CopyCard)
