import React from 'react'
import { PopperLabelPreview } from '../../card-edit/popper-label-preview'
import { connect } from 'react-redux'

function _LabelList({ board }) {
    const labels = board.labels
    return (
        <div className="label-list-container">
            <input className="search-input" type="text" autoFocus placeholder="Search labels..." />
            <h4>Labels</h4>
            <div className="flex column label-list">
                {labels.map(label => <PopperLabelPreview key={label.id} label={label} />)}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard,
    }
}

export const LabelList = connect(mapStateToProps)(_LabelList)


