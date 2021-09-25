import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { RiBarChartFill } from 'react-icons/ri'
import { HiDotsHorizontal } from 'react-icons/hi'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

import { onUpdateBoard } from '../../store/board.actions.js'
import { loadUsers } from '../../store/user.actions.js'
import { MemberAvatar } from '../shared/member-avatar.jsx'

class _BoardHeader extends React.Component {

    componentDidMount() {
        this.props.loadUsers()
    }

    toggleStarredBoard = () => {
        const { board, onUpdateBoard } = this.props
        board.isStarred = !board.isStarred
        onUpdateBoard({ type: 'TOGGLE_STARRED', isStarred: board.isStarred }, board)
    }

    render() {
        const { users, board } = this.props
        return (
            <section className="board-header">
                <div className="left-btns">
                    <button className="board-title nav-button">{board.title}</button>
                    <button className={`starred-btn nav-button ${(board.isStarred) ? 'starred' : ''}`} onClick={() => this.toggleStarredBoard()}><AiOutlineStar /></button> |
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
    onUpdateBoard

}



export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader)