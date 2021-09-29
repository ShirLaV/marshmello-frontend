import React, { useRef, useState } from 'react'
import { DynamicPopover } from '../shared/dynamic-popover'
import { MemberAvatar } from '../shared/member-avatar'
import { MiniUser } from '../shared/popover-children/mini-user'

export function MembersContainerMemberPreview({ member }) {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)
    const userButtonRef = useRef()
    return (
        <div key={member._id} className="card-member relative" ref={userButtonRef}>
            <span style={{ cursor: 'pointer' }}>
                <div className="list-item-layover" onClick={() => setIsPreviewOpen(!isPreviewOpen)}></div>
                <MemberAvatar member={member} />
            </span>
            {isPreviewOpen && <DynamicPopover onClose={() => setIsPreviewOpen(false)} title={null} ref={userButtonRef}>
                <MiniUser member={member} />
            </DynamicPopover>}
        </div>
    )
}
