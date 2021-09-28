import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { AiOutlinePlus } from 'react-icons/ai'
import { DynamicPopover } from '../../shared/dynamic-popover'
import { MemberAvatar } from '../../shared/member-avatar'
import { MemberList } from '../../shared/popover-children/member-list'
import { cardEditService } from '../../../services/card-edit.service'

const _CardEditMembers = ({ currCardId }) => {
    const [isOpen, setIsOpen] = useState(false)
    const addButtonRef = useRef()
    let members
    if (isOpen) {
        const groupId = cardEditService.getGroupId(currCardId)
        members = cardEditService.getCardById(currCardId, groupId).members
    }

    return (
        <>
            {members?.length ? <div className="members-container">
                <h3>MEMBERS</h3>
                <div className="members">
                    {members.map(member => <div key={member._id} className="card-member">
                        <span style={{ cursor: 'pointer' }}>
                            <MemberAvatar member={member} />
                        </span>
                    </div>)}
                    <div
                        ref={addButtonRef}
                        className="card-member add-member relative"
                    >
                        <div className="list-item-layover" onClick={() => setIsOpen(!isOpen)}></div>
                        <AiOutlinePlus />
                        {isOpen && <DynamicPopover onClose={() => setIsOpen(false)} title={'Members'} ref={addButtonRef}>
                            <MemberList />
                        </DynamicPopover>}
                    </div>
                </div>
            </div> : null}
        </>
    )
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard,
        currCardId: state.boardModule.currCardId
    }
}

export const CardEditMembers = connect(mapStateToProps, null)(_CardEditMembers);


