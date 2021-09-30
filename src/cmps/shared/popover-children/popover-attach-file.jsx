import React from 'react'
import { connect } from 'react-redux'
import { cardEditService } from '../../../services/card-edit.service'
import { onUpdateCard } from '../../../store/board.actions'



function _PopoverAttachFile({ onUpdateCard, onClose }) {


    const handleSubmit = (ev) => {
        ev.preventDefault()
        const res = cardEditService.handleFileAdd(ev.target[0].value)
        onUpdateCard(...res)
        onClose()
    }

    return (
        <div className="popover-attach-file">
            <div className="attach-from">
                <label htmlFor="upload" >
                    <span aria-hidden="true">Computer</span>
                    <input type="file" id="upload" style={{ display: 'none' }} onChange={handleSubmit} />
                </label>
            </div>

            <form onSubmit={handleSubmit} className="attach-link">
                <label>Attach a link</label>
                <input className="search-input" placeholder="Paste any link here..." />
                <button className="card-edit-btn">Attach</button>
            </form>
        </div>
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

export const PopoverAttachFile = connect(mapStateToProps, mapDispatchToProps)(_PopoverAttachFile);

