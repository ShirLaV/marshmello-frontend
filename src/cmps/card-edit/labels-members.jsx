import { useState } from 'react'
import { DynamicPopover } from '../shared/dynamic-popover'
import { MemberAvatar } from '../shared/member-avatar'
import { MemberList } from '../shared/popover-children/member-list'
import LabelList from '../shared/popover-children/label-list'
import { AiOutlinePlus } from 'react-icons/ai'

export function LabelsMembers({ members, labelIds, board }) {
    const [isOpen, setIsOpen] = useState(false)
    const [rect, setRect] = useState('')
    const [element, setElement] = useState('')
    const [cmp, setCmp] = useState('')
    const [popoverTitle, setPopoverTitle] = useState('')

    const getCardLabels = (labelIds) => labelIds.map(id => board.labels.find(label => label.id === id))

    const handlePopoverChange = (ev, cmp) => {
        const rect = ev.target.getBoundingClientRect()
        setRect(rect)
        setElement(ev.target)
        setIsOpen(!isOpen)
        setCmp(cmp)
        setPopoverTitle(cmp)
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
                        onClick={(ev) => handlePopoverChange(ev, 'members')}
                        className="card-member add-member"
                    >
                        <AiOutlinePlus />
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
                        onClick={(ev) => handlePopoverChange(ev, 'labels')}
                        className="card-label add-label"
                    >
                        <AiOutlinePlus />
                    </div>
                </div>
            </div>}

            {isOpen && <DynamicPopover onClose={() => setIsOpen(false)} title={popoverTitle} rect={rect} element={element}>
                {cmp === 'members' ? <MemberList /> : <LabelList />}
            </DynamicPopover>
            }

        </div>
    )
}
