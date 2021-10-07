import React, { useRef, useState } from 'react'
import { cardEditService } from '../../services/card-edit.service'
import { CgCreditCard } from 'react-icons/cg'
import { connect } from 'react-redux'
import { onUpdateCard } from '../../store/board.actions'
import { DynamicPopover } from '../shared/dynamic-popover'
import { EditAttachment } from '../shared/popover-children/edit-attachment'


function _AttachmentPreview({ attachment, currCardId, board, onUpdateCard }) {
    const [isEditOpen, setIsEditOpen] = useState()
    const editRef = useRef()

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

    const onRemoveAttachment = () => {
        const res = cardEditService.handleFileRemove(attachment.id)
        onUpdateCard(...res)
    }

    return (
        <div className="attachment-preview flex">
            <a href={attachment.url} target="_blank"><div className="image-container">
                <img src={attachment.url} alt={attachment.title} />
            </div></a>

            <div className="right-section flex column">
                <span className="attachment-title">{attachment.title}</span>
                <div className="middle-line">
                    <span className="added-at">{addedAt}</span>-
                    <span>Comment</span>-
                    <span onClick={onRemoveAttachment}>Delete</span>-

                    <div ref={editRef} className="relative">
                        <div className="list-item-layover" onClick={() => setIsEditOpen(!isEditOpen)}></div>
                        <span>Edit</span>
                        {isEditOpen && <DynamicPopover onClose={() => setIsEditOpen(false)} title={'Edit attachment'} ref={editRef}>
                            <EditAttachment attachment={attachment} onClose={() => setIsEditOpen(false)} />
                        </DynamicPopover>}
                    </div>

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
