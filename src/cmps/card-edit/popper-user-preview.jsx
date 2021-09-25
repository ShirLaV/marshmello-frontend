import React from 'react'
import { MemberAvatar } from '../shared/member-avatar'

export function PopperUserPreview({user}) {
    return (
        <div className="flex">
            <MemberAvatar member={user} />
            <p>{user.fullname}</p>
            <p>({user.username})</p>
        </div>
    )
}
