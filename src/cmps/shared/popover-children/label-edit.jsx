import React from 'react'

export function LabelEdit() {
    return (
        <div>
            <div>
                <label>Name</label>
                <input className="search-input" />
            </div>

            <div>
                <label>Select a color</label>
                <div className="color-container"></div>
            </div>
        </div>
    )
}
