import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import { AiOutlinePlus } from 'react-icons/ai'
import { DynamicPopover } from '../../shared/dynamic-popover'
import { MemberList } from '../../shared/popover-children/member-list'
import { cardEditService } from '../../../services/card-edit.service'
import { MembersContainerMemberPreview } from '../members-container-member-preview'

const _CardEditMembers = ({ currCardId }) => {
    const [isListOpen, setIsListOpen] = useState(false)
    
    const addButtonRef = useRef()
   
    let members

    const groupId = cardEditService.getGroupId(currCardId)
    members = cardEditService.getCardById(currCardId, groupId).members

    return (
        <>
            {members?.length ? <div className="members-container">
                <h3 className="small-title">Members</h3>
                <div className="members">
                    {members.map(member => <MembersContainerMemberPreview key={member._id} member={member} />)}

                    <div
                        ref={addButtonRef}
                        className="card-member add-member pos-relative"
                    >
                        <div className="list-item-layover round" onClick={() => setIsListOpen(!isListOpen)}></div>
                        <AiOutlinePlus />
                        {isListOpen && <DynamicPopover onClose={() => setIsListOpen(false)} title={'Members'} ref={addButtonRef}>
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


