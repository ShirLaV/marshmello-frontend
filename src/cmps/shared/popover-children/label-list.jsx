import React from 'react'
import { PopperLabelPreview } from '../../card-edit/popper-label-preview'

export default function LabelList() {
    return (
        <div className="label-list-container">
            <input className="search-input" type="text" autoFocus placeholder="Search labels..." />
            <h4>Labels</h4>
            <div className="flex column label-list">
                {labels.map(label => <PopperLabelPreview key={label.id} label={label} />)}
            </div>
        </div>
    )
}

const labels = [{
    "id": "l101",
    "title": "Done",
    "color": "#61bd4f"
},
{
    "id": "l102",
    "title": "Important",
    "color": "#eb5a46"
},
{
    "id": "l103",
    "title": "urgent",
    "color": "#0079BF"
}
]
