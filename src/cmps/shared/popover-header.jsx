import React from 'react'
import { BsChevronLeft } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'

export const PopoverHeader = React.memo(({ title, isMultiView, onClose, onGoBack }) => {
    return (
        <>
            {title
                ?
                <div className="popover-header">
                    {isMultiView && <span className="back-btn" onClick={onGoBack}><BsChevronLeft /></span>}
                    <h4>{title}</h4>
                    <span className="close-btn" onClick={onClose}><IoMdClose /></span>
                </div>
                :
                <div className="header-replacement pos-relative">
                    <span className="close-popover-icon" onClick={onClose}><IoMdClose /></span>
                </div>}
        </>
    )
})

