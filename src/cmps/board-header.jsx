import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { RiBarChartFill } from 'react-icons/ri'
import { HiDotsHorizontal } from 'react-icons/hi'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

import { loadUsers } from '../store/user.actions.js'

class _BoardHeader extends React.Component {

    componentDidMount() {
        this.props.loadUsers()
    }

    render() {
        const { users } = this.props
        console.log('Users: ', users);
        return (
            <section className="board-header">
                <div className="left-btns">
                    <button className="board-title nav-button">Hard Coded Board</button>
                    <button className="starred-btn nav-button"><AiOutlineStar /></button> |
                    <div className="user-previews">
                        {users.map(user =>
                            <div className="user-pic-container">
                                <img src={user.imgUrl} />
                            </div>
                        )}
                        <button className="invite-btn nav-button">Invite</button>
                    </div>
                    <div className="right-btns">
                        <button className="dashboard-btn nav-button"><RiBarChartFill /> Dashboard</button>
                        <button className="right-menu-btn nav-button"><HiDotsHorizontal /> Show Menu</button>
                    </div>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards,
        currBoard: state.boardModule.currBoard,
        users: state.userModule.users,
    }
}
const mapDispatchToProps = {
    loadUsers
}



export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader)