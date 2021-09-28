import React, { useEffect, useRef, useState } from 'react'
import { cardEditService } from '../../../services/card-edit.service'
import { onUpdateCard } from '../../../store/board.actions'
import { connect } from 'react-redux'

export function _PopoverChecklist({onUpdateCard}) {
    const inputRef = useRef()
    const [title, setTitle] = useState('Checklist')

    useEffect(() => {
        inputRef.current.focus()
        inputRef.current.select()
    }, [])

    const handleChange = ({ target: { value } }) => {
        setTitle(value)
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        const res = cardEditService.handleChecklistChange('addChecklist', null, title)
        onUpdateCard(...res)
    }

    return (
        <form className="popover-checklist" onSubmit={handleSubmit}>
            <label htmlFor="checklist-title">Title</label>
            <input className="search-input" ref={inputRef} value={title} onChange={handleChange} />
            <button className="card-edit-btn secondary">Add</button>
        </form>
    )
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard
    }
}

const mapDispatchToProps = {
    onUpdateCard
}

export const PopoverChecklist = connect(mapStateToProps, mapDispatchToProps)(_PopoverChecklist);