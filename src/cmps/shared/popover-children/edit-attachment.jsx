import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { cardEditService } from '../../../services/card-edit.service'
import { onUpdateCard } from '../../../store/board.actions'

const _EditAttachment = ({ attachment, onUpdateCard, onClose }) => {
    const [title, setTitle] = useState(attachment.title)
    const titleRef = useRef()

    useEffect(() => {
        titleRef?.current?.select()
    }, [])

    const handleSubmit = () => {
        if (!title) return
        const res = cardEditService.handleAttachmentEdit(attachment.id, title)
        onUpdateCard(...res)
        onClose()
    }

    return (
        <form onSubmit={handleSubmit} className="edit-attachment">
            <label>Link name</label>
            <input ref={titleRef} className="search-input" value={title} onChange={(ev) => setTitle(ev.target.value)} />
            <button className="card-edit-btn secondary">Update</button>
        </form>
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
    onUpdateCard
}

export const EditAttachment = connect(mapStateToProps, mapDispatchToProps)(_EditAttachment)
