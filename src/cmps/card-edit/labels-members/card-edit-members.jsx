import React, { useRef, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { DynamicPopover } from '../../shared/dynamic-popover'
import { MemberAvatar } from '../../shared/member-avatar'
import { MemberList } from '../../shared/popover-children/member-list'

export function CardEditMembers({ members, currCard, handlePropertyChange }) {
    const [isOpen, setIsOpen] = useState(false)
    const addButtonRef = useRef()

    return (
        <>
            {members?.length && <div className="members-container">
                <h3>MEMBERS</h3>
                <div className="members">
                    {members.map(member => <div key={member._id} className="card-member">
                        <MemberAvatar member={member} />
                    </div>)}
                    <div
                        ref={addButtonRef}
                        onClick={() => setIsOpen(!isOpen)}
                        className="card-member add-member relative"
                    >
                        <div className="list-item-layover"></div>
                        <AiOutlinePlus />
                        {isOpen && <DynamicPopover onClose={() => setIsOpen(false)} title={'Members'} ref={addButtonRef}>
                            <MemberList currCard={currCard} handlePropertyChange={handlePropertyChange} />
                        </DynamicPopover>}
                    </div>
                </div>
            </div>}
        </>
    )
}
