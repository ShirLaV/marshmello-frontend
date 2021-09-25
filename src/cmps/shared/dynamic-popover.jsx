import React from 'react'
import { IoMdClose } from 'react-icons/io'


export function DynamicPopover({ onClose, title, children }) {
    return (
        <div className="dynamic-popover">
            <div className="popover-header">
                <p>{title}</p>
                <span onClick={onClose}><IoMdClose /></span>
            </div>
            <div className="popover-content">
                {children}
            </div>
        </div>
    )
}
