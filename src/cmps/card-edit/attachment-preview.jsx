import React from 'react'
import { cardEditService } from '../../services/card-edit.service'
import { CgCreditCard } from 'react-icons/cg'

export function AttachmentPreview({ attachment }) {

    const addedAt = cardEditService.getUploadTime(attachment.addedAt)

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
                    <span>{attachment.isCover ? 'Remove cover' : 'Make cover'}</span>
                </div>
            </div>

        </div>
    )
}
