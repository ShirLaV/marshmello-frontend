import React from 'react';
import { connect } from 'react-redux';
import { MemberAvatar } from '../shared/member-avatar';
import { onUpdateBoard } from '../../store/board.actions'
import { IoCheckmarkSharp } from 'react-icons/io5'
import { activityTxtMap } from '../../services/activity.service';

class _InviteMembers extends React.Component {

    state = {
        search: ''
    }

    getMembersIds = () => {
        const { board } = this.props
        const boardMembersIds = board.members.map(member => member._id)
        return boardMembersIds
    }

    inviteToBoard = (user) => {
        const { board, onUpdateBoard } = this.props
        // const members = board.members
        // members.push({_id: user._id, fullname: user.fullname, imgUrl: user.imgUrl})
        const memberIds = this.getMembersIds()
        const memberToAdd = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
        if (memberIds.includes(memberToAdd._id)) return
        const activity = {txt: activityTxtMap.inviteMember(user.fullname)}
        onUpdateBoard({ type: 'ADD_BOARD_MEMBER', member: memberToAdd }, board, activity)
        console.log(board.members)
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState({ ...this.state, [field]: value });
    }

    render() {
        const { search } = this.state
        const { users } = this.props
        const memberIds = this.getMembersIds()
        const filteredUsers = users.filter(user => !memberIds.includes(user._id))

        return (
            <div className="invite-members">
                <input className="search-input" type="text" onChange={this.handleChange} name="search" value={search} autoFocus placeholder="Search..." />
                <ul className="member-list clean-list">
                    {filteredUsers.filter(user => user.fullname.includes(search)).map(user =>
                        <li className="user-preview" key={user._id} onClick={() => this.inviteToBoard(user)} >
                            <div className="user-details">
                                <MemberAvatar member={user} />
                                <span className="user-name">{user.fullname}</span>
                            </div>
                            <span>{(memberIds.includes(user._id)) ? <IoCheckmarkSharp /> : ''}</span>
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
