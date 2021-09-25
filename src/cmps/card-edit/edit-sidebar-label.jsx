import React from 'react'

export function EditSidebarLabel({Icon, title}) {
    return (
        <div>
           <button className="card-edit-btn sidebar-btn">
               <div className="btn-label-container flex">
                   <Icon />
                   <p>{title}</p>
               </div>
           </button> 
        </div>
    )
}
