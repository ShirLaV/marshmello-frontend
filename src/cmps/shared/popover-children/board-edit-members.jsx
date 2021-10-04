import React, { useEffect } from 'react'
import { MemberAvatar } from '../../shared/member-avatar'
import { connect } from 'react-redux'
import { onUpdateBoard } from '../../../store/board.actions'
import { IoCheckmarkSharp } from 'react-icons/io5'


const _BoardEditMembers = ({ members, board, onUpdateBoard, onClose }) => {

    useEffect(() => {
        return () => {
            onClose()
        }
    },[onClose])

    const removeFromBoard = (memberId) => {
        // const activity = {txt: activityTxtMap.inviteMember(user.fullname)}
        onUpdateBoard({ type: 'REMOVE_BOARD_MEMBER', memberId: memberId }, board)
    }

    return (
        <div className="member-list" style={{ color: '#172b4d' }}>
            {members.map(member => (
                <div key={member._id} className="popper-member-preview flex" onClick={() => removeFromBoard(member._id)}>
                    <div className='list-item-layover'></div>
                    <div style={{ width: 32 }}>
                        <MemberAvatar member={member} />
                    </div>
                    <div className='popper-member-name'>
                        <p>{member.fullname}</p>
                    </div>
                    <div className='popper-member-check'><IoCheckmarkSharp /></div>
                </div>
            ))}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        users: state.userModule.users,
        board: state.boardModule.currBoard
    }
}
const mapDispatchToProps = {
    onUpdateBoard
}

export const BoardEditMembers = connect(mapStateToProps, mapDispatchToProps)(_BoardEditMembers);
 