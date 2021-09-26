import React from 'react'
import { BiPencil } from 'react-icons/bi'

export function PopperLabelPreview({ label }) {
    return (
        <div className="label-preview flex">
            <div className="popper-label" style={{backgroundColor:label.color}}>{label.title || ''}</div>
            <div className="icon-wrapper"><BiPencil /></div>
        </div>
    )
}
