import React, { useMemo, useRef, useState } from 'react'
import { DynamicPopover } from '../shared/dynamic-popover'
import { EditSidebarLabel } from '../card-edit/edit-sidebar-label'


export function CardEditActionsItem({ item }) {
    const [isOpen, setIsOpen] = useState(false)
    const itemRef = useRef()
    const InnerPopperCmp = useMemo(() => item.component, [item])

    return (
        <div className="label-wrapper">
            <div ref={itemRef} className={`relative ${isOpen ? 'popover-open' : ''}`}>
                <span onClick={() => setIsOpen(!isOpen)}>
                    <EditSidebarLabel Icon={item.icon} title={item.title} />
                </span>
                {
                    isOpen && <DynamicPopover onClose={() => setIsOpen(false)} title={item.title} ref={itemRef}>
                        <InnerPopperCmp onClose={() => setIsOpen(false)} />
                    </DynamicPopover>
                }
            </div>
        </div>
    )
}

