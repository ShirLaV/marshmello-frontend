import React, { useState } from 'react'
import { MemberAvatar } from '../shared/member-avatar'
import { BsCheck } from 'react-icons/bs'

export function PopperUserPreview({ user, isMember }) {
    // const [isChecked, setIsChecked] = useState(true)

    // const handleChecked = () => {
    //     setIsChecked(!isChecked)
    // }

    return (
        <div className="popper-user-preview flex">
            <div className='list-item-layover'></div>
            <div style={{ width: 32 }}>
                <MemberAvatar member={user} />
            </div>
            <div className='popper-user-name'>
                <p>{user.fullname} ({user.username})({user.username})</p>
            </div>
            {isMember && <div className='popper-user-check'><BsCheck /></div>}
        </div>
    )
}
