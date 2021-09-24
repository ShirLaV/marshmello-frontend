import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { MemberAvatar } from '../shared/member-avatar'
import { EditPopper } from './edit-popper'

export function LabelsMembers({ members, labelIds, board }) {
    const [isPopperOpen, setIsPopperOpen] = useState(true)
    const [popperTitle, setPopperTitle] = useState('')

    const getCardLabels = (labelIds) => labelIds.map(id => board.labels.find(label => label.id === id))

    const handlePopper = (ev, label) => {
        setPopperTitle(label)
        setIsPopperOpen(!isPopperOpen)
    }

    return (
        <div className="members-labels-container">
            {members?.length && <div className="members-container">
                <h3>MEMBERS</h3>
                <div className="members">
                    {members.map(member => <div key={member._id} className="card-member">
                        <MemberAvatar member={member} />
                    </div>)}
                    <div
                        onClick={(ev) => handlePopper(ev, 'members')}
                        className="card-member add-member"
                    >
                        <AiOutlinePlus onClick={(ev) => handlePopper(ev, 'members')} />
                    </div>
                </div>
            </div>}

            {labelIds?.length && <div className="labels-container">
                <h3>LABELS</h3>
                <div className="labels">
                    {getCardLabels(labelIds).map(label => <div key={label.id} className="card-label" style={{ backgroundColor: label.color }}>
                        {label.title || ''}
                    </div>)}
                    <div
                        onClick={(ev) => handlePopper(ev, 'labels')}
                        className="card-label add-label"
                    >
                        <AiOutlinePlus onClick={(ev) => handlePopper(ev, 'labels')} />
                    </div>
                </div>
            </div>}

            {isPopperOpen && <EditPopper title={popperTitle} />}
        </div>
    )
}
