import React, { useState } from 'react'
import { cardEditService } from '../../services/card-edit.service'
import { CgCreditCard } from 'react-icons/cg'
import { connect } from 'react-redux'
import { onUpdateCard } from '../../store/board.actions'


function _AttachmentPreview({ attachment, currCardId, board }) {
    const [isOpen, setIsOpen] = useState(false)

    const groupId = cardEditService.getGroupId(currCardId)
    const currCard = cardEditService.getCardById(currCardId, groupId)
    const addedAt = cardEditService.getUploadTime(attachment.addedAt)


    const toggleCover = () => {
        if (currCard?.style?.imgUrl === attachment.url) currCard.style = null
        else currCard.style = { imgUrl: attachment.url }
        onUpdateCard(currCard, groupId, board)
    }

    const checkIfCover = () => {
        return currCard?.style?.imgUrl === attachment.url
    }


    return (
        <div className="attachment-preview flex">
            <div className="image-container">
                <img src={attachment.url} alt={attachment.title} />
            </div>

            <div className="right-section flex column">
                <span className="attachment-title">{attachment.title}</span>
                <div className="middle-line">
                    <span>{addedAt}</span>-
                    <span>Comment</span>-
                    <span>Delete</span>-
                    <span>Edit</span>
                </div>
                <div className="attachment-cover">
                    <span><CgCreditCard /></span>
                    <span onClick={toggleCover}>{checkIfCover() ? 'Remove cover' : 'Make cover'}</span>
                </div>
            </div>

        </div>
    )
}


const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard,
        currCardId: state.boardModule.currCardId
    }
}

const mapDispatchToProps = {
    onUpdateCard
}

export const AttachmentPreview = connect(mapStateToProps, mapDispatchToProps)(_AttachmentPreview);
