import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { RiBarChartFill } from 'react-icons/ri'
import { HiDotsHorizontal } from 'react-icons/hi'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

import { loadUsers } from '../../store/user.actions.js'
import { MemberAvatar } from '../shared/member-avatar.jsx'

class _BoardHeader extends React.Component {

    componentDidMount() {
        this.props.loadUsers()
    }

    render() {
        const { users, board } = this.props
        console.log('Board: ', board);
        console.log('Users: ', users);
        return (
            <section className="board-header">
                <div className="left-btns">
                    <button className="board-title nav-button">{board.title}</button>
                    <button className={'starred-btn nav-button'}><AiOutlineStar /></button> |
                <div className="user-previews">
                    {board.members.map(member =>
                        <MemberAvatar key={member._id} member={member} />
                    )}
                    <button className="invite-btn nav-button">Invite</button>
                </div>
                </div>
                <div className="right-btns">
                    <button className="dashboard-btn nav-button"><RiBarChartFill /> Dashboard</button>
                    <button className="right-menu-btn nav-button"><HiDotsHorizontal /> Show Menu</button>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.currBoard,
        users: state.userModule.users,
    }
}
const mapDispatchToProps = {
    loadUsers,

}



export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader)