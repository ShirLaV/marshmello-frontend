import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { connect } from 'react-redux'
import { cardEditService } from '../../../services/card-edit.service'
import { utilService } from '../../../services/util.service'
import { onUpdateBoard, onUpdateCard } from '../../../store/board.actions'

function _LabelEdit({ color, board, onUpdateBoard, onClose, onGoBack, onUpdateCard }) {
    const [selectedColor, setSelectedColor] = useState(null)
    const [title, setTitle] = useState('')

    const inputRef = useRef()

    useEffect(() => {
        setSelectedColor(color)
        const label = board.labels.find(label => label.color === color)
        setTitle(label?.title || '')
        inputRef.current?.select()
    }, [board.labels, color])

    const handleClick = (ev) => {
        setSelectedColor(ev.target.dataset.color)
        const label = board.labels.find(label => label.color === ev.target.dataset.color)
        setTitle(label?.title || '')
    }

    const handleChange = ({ target: { value } }) => {
        setTitle(value)
    }

    const handleSumbit = () => {
        const boardToSave = { ...board }
        let label = boardToSave.labels.find(label => label.color === selectedColor)
        if (label) label.title = title
        else {
            label = { id: utilService.makeId(), color: selectedColor, title }
            boardToSave.labels.push(label)
        }
        onUpdateBoard({ type: '' }, boardToSave)
        onGoBack()
        onClose()

        const res = cardEditService.handleLabelChange(label.id)
        onUpdateCard(...res)
    }

    return (
        <div className="label-edit">
            <div>
                <label>Name</label>
                <input ref={inputRef} className="search-input" onChange={handleChange} value={title} />
            </div>

            <div>
                <label>Select a color</label>
                <div className="color-container flex">
                    {colors.map((c, i) => {
                        return (<div key={i} data-color={c} className="label-color-option" style={{ backgroundColor: c }} onClick={handleClick}
                        >{(c === selectedColor) && <span><AiOutlineCheck /></span>}</div>)
                    })
                    }
                </div>
            </div>

            <div className="btns-container">
                <button className="card-edit-btn save-btn" onClick={handleSumbit}>Save</button>
                <button className="card-edit-btn delete-btn">Delete</button>
            </div>
        </div >
    )
}

const colors = ['#7bc86c', '#f5dd29', '#ffaf3f', '#ef7564', '#cd8de5', '#517dab', '#29cce5', '#6deca9', '#ff8ed4', '#172b4d']

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard,
        currCardId: state.boardModule.currCardId
    }
}

const mapDispatchToProps = {
    onUpdateCard,
    onUpdateBoard
}

export const LabelEdit = connect(mapStateToProps, mapDispatchToProps)(_LabelEdit);
