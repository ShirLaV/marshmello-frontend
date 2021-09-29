import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { BsCheck } from 'react-icons/bs'
import { onUpdateCard } from '../../store/board.actions'
import { MemberAvatar } from '../shared/member-avatar'
import { cardEditService } from '../../services/card-edit.service'

function _PopperMemberPreview({ member, currCardId, onUpdateCard }) {
    const [isChecked, setIsChecked] = useState(false)

    useEffect(() => {
        const groupId = cardEditService.getGroupId(currCardId)
        const card = cardEditService.getCardById(currCardId, groupId)
        const isMemberChecked = card.members?.find(m => m._id === member._id)
        setIsChecked(isMemberChecked)
    }, [])

    const handleMemberClick = () => {
        setIsChecked(!isChecked)
        const res = cardEditService.handleMemberChange(member._id)
        onUpdateCard(...res)
    }

    return (
        <div className="popper-member-preview flex" onClick={handleMemberClick}>
            <div className='list-item-layover'></div>
            <div style={{ width: 32 }}>
                <MemberAvatar member={member} />
            </div>
            <div className='popper-member-name'>
                <p>{member.fullname}</p>
            </div>
            {isChecked && <div className='popper-member-check'><BsCheck /></div>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currCardId: state.boardModule.currCardId
    }
}

const mapDispatchToProps = {
    onUpdateCard
}

export const PopperMemberPreview = connect(mapStateToProps, mapDispatchToProps)(_PopperMemberPreview);