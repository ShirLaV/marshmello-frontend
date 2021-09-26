import React from 'react'

export function PopoverAttachFile() {
    return (
        <div className="popover-attach-file">
            <div className="attach-from">
                <label htmlFor="upload" >
                    <span aria-hidden="true">Computer</span>
                    <input type="file" id="upload" style={{ display: 'none' }} />
                </label>
            </div>

            <div className="attach-link">
               <label>Attach a link</label> 
               <input className="search-input" placeholder="Paste any link here..." />
               <button className="card-edit-btn">Attach</button>
            </div>
        </div>
    )
}

