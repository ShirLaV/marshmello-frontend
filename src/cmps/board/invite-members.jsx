import React from 'react';
import { connect } from 'react-redux';
import { MemberAvatar } from '../shared/member-avatar';
import { onUpdateBoard } from '../../store/board.actions'

class _InviteMembers extends React.Component {

    getMembersIds = () => {
        const { board } = this.props
        const boardMembersIds = board.members.map(member => member._id)
        return boardMembersIds
    }

    inviteToBoard = (user) => {
        const { board, onUpdateBoard } = this.props
        // const members = board.members
        // members.push({_id: user._id, fullname: user.fullname, imgUrl: user.imgUrl})
        const memberToAdd = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
        onUpdateBoard({ type: 'ADD_BOARD_MEMBER', member: memberToAdd }, board)
        console.log(board.members)
    }

    render() {
        const { users } = this.props
        const memberIds = this.getMembersIds()
        return (
            <div className="invite-members">
                <h1>Invite Members</h1>
                <ul className="users-list clean-list">
                    {users.map(user =>
                        <li key={user._id} onClick={() => this.inviteToBoard(user)} >
                            <MemberAvatar member={user} />
                            {user.fullname}
                            {(memberIds.includes(user._id)) ? 'V' : ''}
                        </li>
                    )}
                </ul>

            </div>
        )
    }

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

export const InviteMembers = connect(mapStateToProps, mapDispatchToProps)(_InviteMembers);
