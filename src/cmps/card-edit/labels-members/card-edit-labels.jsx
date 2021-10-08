import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { AiOutlinePlus } from 'react-icons/ai'
import { DynamicPopover } from '../../shared/dynamic-popover'
import { LabelList } from '../../shared/popover-children/label-list'
import { cardEditService } from '../../../services/card-edit.service'
import { LabelEdit } from '../../shared/popover-children/label-edit'

const _CardEditLabels = ({ currCardId, board }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [color, setColor] = useState('')
    const addButtonRef = useRef()

    const getCardLabels = (labelIds) => (
        labelIds?.map(id => board.labels.find(label => label.id === id))
    )

    const groupId = cardEditService.getGroupId(currCardId)
    const labelIds = cardEditService.getCardById(currCardId, groupId).labelIds
    const labels = getCardLabels(labelIds)

    const handleEdit = (color) => {
        if (isEdit) setIsEdit(false)
        else {
            setColor(color)
            setIsEdit(true)
        }
    }
    return (
        <>
            {labelIds?.length ? <div className="labels-container">
                <h3 className="small-title">Labels</h3>
                <div className="labels">
                    {labels.map(label => <div key={label.id} className="card-label" style={{ backgroundColor: label.color }}>
                        {label.title || ''}
                    </div>)}
                    <div
                        ref={addButtonRef}
                        className="card-label add-label pos-relative"
                    >
                        <div className="list-item-layover" onClick={() => setIsOpen(!isOpen)}></div>
                        <AiOutlinePlus />
                        {isOpen && <DynamicPopover onGoBack={handleEdit} onClose={() => setIsOpen(false)} title={'Labels'} ref={addButtonRef} isMultiView={isEdit}>
                            {!isEdit ? <LabelList onGoBack={handleEdit} onClose={() => setIsOpen(false)} /> : <LabelEdit onGoBack={handleEdit} color={color} onClose={() => setIsOpen(false)} />}
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
