import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { CgHome } from 'react-icons/cg';
import { AiOutlinePlus, AiOutlineBell } from 'react-icons/ai';
import { SiTrello } from 'react-icons/si';


// import routes from '../routes'
import { onLogin, onLogout, onSignup, loadUsers, removeUser } from '../store/user.actions.js'
import { setAddingBoard } from '../store/board.actions'
import { BoardAdd } from './board/board-add.jsx';
import { MemberAvatar } from './shared/member-avatar.jsx';
import { OverlayScreen } from '../cmps/overlay-screen'


class _AppHeader extends React.Component {
    onLogin = (credentials) => {
        this.props.onLogin(credentials)
    }
    onSignup = (credentials) => {
        this.props.onSignup(credentials)
    }
    onLogout = () => {
        this.props.onLogout()
    }

    setAddBoard = (value) => {
        this.props.setAddingBoard(value)
    }

    render() {
        const { user, isAddingBoard } = this.props
        return (
            <header className="app-header">
                <nav className="nav-links">
                    <div className="left-links">
                        <NavLink to="/"><button className="home-btn nav-button"><CgHome /></button></NavLink>
                        <NavLink to="/board"><button className="boards-btn flex nav-button"><SiTrello /> Boards</button></NavLink>
                    </div>
                    <NavLink className="logo" to="/"><SiTrello /> <span> Marshmello </span></NavLink>
                    <div className="right-links">
                        <button className="nav-button" onClick={() => this.setAddBoard(true)}><AiOutlinePlus /></button>
                        <button className="nav-button"><AiOutlineBell /></button>
                        <MemberAvatar key={user._id} member={user} />
                    </div>
                </nav>
                {isAddingBoard && <BoardAdd onClose={() => this.setAddBoard(false)}/>}
                {isAddingBoard && <OverlayScreen />}
            </header>
        )
    }
}

function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards,
        user: state.userModule.user,
        isAddingBoard: state.boardModule.isAddingBoard
    }
}
const mapDispatchToProps = {
    onLogin,
    onSignup,
    onLogout,
    loadUsers,
    removeUser,
    setAddingBoard
}



export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)