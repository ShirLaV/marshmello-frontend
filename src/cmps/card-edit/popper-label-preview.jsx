import React, { useEffect, useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import { BsCheck } from 'react-icons/bs'
import { connect } from 'react-redux'
import { cardEditService } from '../../services/card-edit.service'
import { onUpdateCard } from '../../store/board.actions'

function _PopperLabelPreview({ label, currCardId, onUpdateCard }) {
    const [isChecked, setIsChecked] = useState(false)

    useEffect(() => {
        const groupId = cardEditService.getGroupId(currCardId)
        const card = cardEditService.getCardById(currCardId, groupId)
        const isLabelChecked = card.labelIds?.some(l => l === label.id)
        setIsChecked(isLabelChecked)
    }, [currCardId, label.id])

    const handleLabelClick = () => {
        setIsChecked(!isChecked)
        const res = cardEditService.handleLabelChange(label.id)
        onUpdateCard(...res)
    }

    return (
        <div className="label-preview flex" onClick={handleLabelClick}>
            {/* <div className='list-item-layover'></div> */}
            <div className="label-preview flex">
                <div className="popper-label " style={{ backgroundColor: label.color }}>
                    <span> {label.title || ''}</span>
                    {isChecked && <div className='popper-label-check'><BsCheck /></div>}
                </div>
                <div className="icon-wrapper"><BiPencil /></div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currCardId: state.boardModule.currCardId
    }
}

const mapDispatchToProps = {
    onUpdateCard
}

export const PopperLabelPreview = connect(mapStateToProps, mapDispatchToProps)(_PopperLabelPreview);
