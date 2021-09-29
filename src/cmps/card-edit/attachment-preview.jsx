import React from 'react'

export function AttachmentPreview({ attachment }) {
    return (
        <div className="attachment-preview flex">
            <div className="image-container">
                <img src={attachment.url} alt={attachment.title} />
            </div>

            <div>
                <span className="attachment-title">{attachment.title}</span>
                <div>
                    <span></span>
                    <span>Comment</span>
                    <span>Delete</span>
                    <span>Edit</span>
                </div>
                <div>{attachment.isCover ? 'Remove cover' : 'Make cover'}</div>
            </div>

        </div>
    )
}
