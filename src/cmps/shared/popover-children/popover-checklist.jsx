import React, { useEffect, useRef, useState } from 'react'

export function PopoverChecklist() {
    const inputRef = useRef()
    const [title, setTitle] = useState('Checklist')

    useEffect(() => {
        inputRef.current.focus()
        inputRef.current.select()
    }, [])

    return (
        <div className="popover-checklist">
            <label htmlFor="checklist-title">Title</label>
            <input className="search-input" ref={inputRef} value={title} />
            <button className="card-edit-btn secondary">Add</button>
        </div>
    )
}
