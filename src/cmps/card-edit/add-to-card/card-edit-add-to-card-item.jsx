import React, { useMemo, useRef, useState } from 'react'
import { DynamicPopover } from '../../shared/dynamic-popover'
import { EditSidebarLabel } from '../edit-sidebar-label'

export function CardEditAddToCardItem({ item }) {
    const [isOpen, setIsOpen] = useState(false)
    const itemRef = useRef()
    const InnerPopperCmp = useMemo(() => item.component, [item])
    return (
        <div ref={itemRef} className='relative' onClick={() => setIsOpen(!isOpen)}>
            <EditSidebarLabel Icon={item.icon} title={item.title} />
            {
                isOpen && <DynamicPopover onClose={() => setIsOpen(false)} title={item.title} ref={itemRef}>
                    <InnerPopperCmp />
                </DynamicPopover>
            }
        </div>
    )
}
