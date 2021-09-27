import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { RiBarChartFill } from 'react-icons/ri'
import { HiDotsHorizontal } from 'react-icons/hi'
import { connect } from 'react-redux'

import { onUpdateBoard } from '../../store/board.actions.js'
import { loadUsers } from '../../store/user.actions.js'
import { MemberAvatar } from '../shared/member-avatar.jsx'
import { InviteMembers } from './invite-members.jsx'
import { DynamicPopover } from '../shared/dynamic-popover.jsx'
import { SideMenu } from '../side-menu/side-menu.jsx'

class _BoardHeader extends React.Component {

    state = {
        isOpen: false,
        rect: null,
        element: null,
        boardTitle: this.props.board.title,
        isMenuOpen: false
    }

    componentDidMount() {
        this.props.loadUsers()
    }

    toggleStarredBoard = () => {
        const { board, onUpdateBoard } = this.props
        board.isStarred = !board.isStarred
        onUpdateBoard({ type: 'TOGGLE_STARRED', isStarred: board.isStarred }, board)
    }

    onOpenInvite = (ev) => {
        const rect = ev.target.getBoundingClientRect()
        this.setState({ isOpen: !this.state.isOpen, rect: rect, element: ev.target })
    }

    handleFocus = (event) => event.target.select();

    handleChange = ({ target: { name, value } }) => {
        this.setState((prevState) => ({ ...prevState, [name]: value }));
    }

    onChangeBoardTitle = () => {
        const { board, onUpdateBoard } = this.props
        board.title = this.state.boardTitle
        onUpdateBoard({ type: 'CHANGE_TITLE', title: board.title }, board)
    }

    toggleMenu = () => {
        this.setState((prevState) => ({ ...prevState, isMenuOpen: !this.state.isMenuOpen }))
    }

    render() {
        const { board } = this.props
        const { boardTitle, isMenuOpen } = this.state
        return (
            <section className="board-header">
                <div className="left-btns">
                    <button className="board-title nav-button">
                        <input className='clean-input' type='text' value={boardTitle} name='boardTitle' onFocus={this.handleFocus} onChange={this.handleChange} onBlur={this.onChangeBoardTitle} />
                    </button>
                    <button className={`starred-btn nav-button ${(board.isStarred) ? 'starred' : ''}`} onClick={() => this.toggleStarredBoard()}><AiOutlineStar /></button> |
                    <div className="user-previews">
                        {board.members.map(member =>
                            <MemberAvatar key={member._id} member={member} />
                        )}
                    </div>
                    <button onClick={(ev) => this.onOpenInvite(ev)} className="invite-btn nav-button">Invite</button>
                    {this.state.isOpen && <DynamicPopover onClose={() => this.setState({ isOpen: false })} title="Invite Members" rect={this.state.rect} element={this.state.element}>
                        <InviteMembers />
                    </DynamicPopover>}
                </div>
                <div className="right-btns">
                    <button className="dashboard-btn nav-button"><RiBarChartFill /> Dashboard</button>
                    <button onClick={() => this.toggleMenu()} className="right-menu-btn nav-button"><HiDotsHorizontal /> Show Menu</button>
                </div>
                <SideMenu isMenuOpen={isMenuOpen} onClose={() => {this.toggleMenu()}} />
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