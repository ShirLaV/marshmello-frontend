import React from 'react'

export function EditSidebarLabel({ Icon, title }) {
    return (
        <div>
            <button className="card-edit-btn sidebar-btn" style={{ position: 'relative' }}>
                <div className="list-item-layover"></div>
                <div className="btn-label-container flex">
                    <Icon />
                    <p>{title}</p>
                </div>
            </button>
        </div>
    )
}
