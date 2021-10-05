import React, { useState } from 'react'
import { PopperLabelPreview } from '../../card-edit/popper-label-preview'
import { connect } from 'react-redux'

function _LabelList({ board, handleEdit }) {
    const [labels, setLabels] = useState(board.labels)

    const handleChange = ({ target: { value } }) => {
        const matchingLabels = board.labels.filter(label => label.title.toLowerCase().includes(value.toLowerCase()))
        setLabels(matchingLabels)
    }

    return (
        <div className="label-list-container">
            <input className="search-input" type="text" autoFocus placeholder="Search labels..." onChange={handleChange} />
            <h4>Labels</h4>
            <div className="flex column label-list">
                {labels.map(label => <PopperLabelPreview key={label.id} label={label} handleEdit={handleEdit} />)}
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


