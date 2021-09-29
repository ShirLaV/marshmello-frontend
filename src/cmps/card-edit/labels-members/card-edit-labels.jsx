import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { AiOutlinePlus } from 'react-icons/ai'
import { DynamicPopover } from '../../shared/dynamic-popover'
import { LabelList } from '../../shared/popover-children/label-list'
import { cardEditService } from '../../../services/card-edit.service'

const _CardEditLabels = ({ currCardId, board }) => {
    const [isOpen, setIsOpen] = useState(false)
    const addButtonRef = useRef()

    const getCardLabels = (labelIds) => (
        labelIds?.map(id => board.labels.find(label => label.id === id))
    )

    const groupId = cardEditService.getGroupId(currCardId)
    const labelIds = cardEditService.getCardById(currCardId, groupId).labelIds
    const labels = getCardLabels(labelIds)
    return (
        <>
            {labelIds?.length ? <div className="labels-container">
                <h3>LABELS</h3>
                <div className="labels">
                    {labels.map(label => <div key={label.id} className="card-label" style={{ backgroundColor: label.color }}>
                        {label.title || ''}
                    </div>)}
                    <div
                        ref={addButtonRef}
                        className="card-label add-label relative"
                    >
                        <div className="list-item-layover" onClick={() => setIsOpen(!isOpen)}></div>
                        <AiOutlinePlus />
                        {isOpen && <DynamicPopover onClose={() => setIsOpen(false)} title={'Labels'} ref={addButtonRef}>
                            <LabelList />
                        </DynamicPopover>}
                    </div>
                </div>
            </div> : null}
        </>
    )
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard,
        currCardId: state.boardModule.currCardId
    }
}

export const CardEditLabels = connect(mapStateToProps, null)(_CardEditLabels);
