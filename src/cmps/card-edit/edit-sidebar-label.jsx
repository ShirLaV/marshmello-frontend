import React from 'react'

export function EditSidebarLabel({ Icon, title }) {

    const getStyle = () => {
        if (title === "Delete") return { backgroundColor: '#b04632', color: '#fff' }
        else return {}
    }
    return (
        <div>
            <button className="card-edit-btn sidebar-btn" style={{ position: 'relative', ...getStyle() }}>
                <div className="list-item-layover"></div>
                <div className="btn-label-container flex">
                    <Icon />
                    <p>{title}</p>
                </div>
            </button>
        </div>
    )
}
