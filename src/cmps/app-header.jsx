import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { CgHome } from 'react-icons/cg';
import { AiOutlinePlus, AiOutlineBell } from 'react-icons/ai';
import { SiTrello } from 'react-icons/si';


// import routes from '../routes'


import { onLogin, onLogout, onSignup, loadUsers, removeUser } from '../store/user.actions.js'

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

    render() {
        const { user } = this.props
        return (
            <header className="app-header">
                <nav className="nav-links">
                    <div className="left-links">
                        <NavLink to="/"><button className="nav-button"><CgHome /></button></NavLink>
                        <NavLink to="/board"><button className="nav-button"><SiTrello /> Boards</button></NavLink>
                        {/* <NavLink to="/board/:boardId"><button className="nav-button">Board</button></NavLink> */}
                    </div>
                    <NavLink className="logo" to="/board"><SiTrello /> <span> Marshmello </span></NavLink>
                    <div className="right-links">
                        <button className="nav-button"><AiOutlinePlus /></button>
                        <button className="nav-button"><AiOutlineBell /></button>
                        <button className="nav-button">User</button>
                    </div>
                </nav>
            </header>
        )
    }
}

function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards,
        user: state.userModule.user,
    }
}
const mapDispatchToProps = {
    onLogin,
    onSignup,
    onLogout,
    loadUsers,
    removeUser
}



export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)