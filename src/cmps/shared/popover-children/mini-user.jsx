import React from 'react'
import { MemberAvatar } from '../member-avatar'
import { connect } from 'react-redux'
import { onUpdateCard } from '../../../store/board.actions'
import { cardEditService } from '../../../services/card-edit.service'

const _MiniUser = ({ member, onUpdateCard }) => {

    const onRemoveUser = () => {
        const res = cardEditService.handleMemberChange(member._id)
        onUpdateCard(...res)
    }

    return (
        <div className="mini-user flex column">

            <div className="main flex">
                <MemberAvatar size="lg" member={member} />
                <div>
                    <h3 className="mini-user-fullname">{member.fullname}</h3>
                    <p>{member.username}</p>
                </div>
            </div>

            <p className="remove-member" onClick={onRemoveUser}>Remove from card</p>
        </div>
    )
}

const mapDispatchToProps = {
    onUpdateCard
}

export const MiniUser = connect(null, mapDispatchToProps)(_MiniUser);
