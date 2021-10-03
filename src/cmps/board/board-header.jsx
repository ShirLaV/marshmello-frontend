import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { RiBarChartFill } from 'react-icons/ri'
import { HiDotsHorizontal } from 'react-icons/hi'
import { connect } from 'react-redux'
import { activityTxtMap } from '../../services/activity.service'

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

    inviteRef = React.createRef()

    componentDidMount() {
        this.props.loadUsers()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.board.title !== this.props.board.title) {
            this.setState({ boardTitle: this.props.board.title })
        }
    }

    toggleStarredBoard = () => {
        const { board, onUpdateBoard } = this.props
        board.isStarred = !board.isStarred
        onUpdateBoard({ type: 'TOGGLE_STARRED', isStarred: board.isStarred }, board)
    }

    handleFocus = (event) => event.target.select();

    handleChange = ({ target: { name, value } }) => {
        this.setState((prevState) => ({ ...prevState, [name]: value }));
    }

    onChangeBoardTitle = () => {
        const { board, onUpdateBoard } = this.props
        board.title = this.state.boardTitle
        const activity = { txt: activityTxtMap.renameBoard(board.title) }
        onUpdateBoard({ type: 'CHANGE_TITLE', title: board.title }, board, activity)
    }

    toggleMenu = () => {
        this.setState((prevState) => ({ ...prevState, isMenuOpen: !this.state.isMenuOpen }))
    }

    render() {
        const { board } = this.props
        const { boardTitle, isMenuOpen, isOpen } = this.state
        return (
            <section className="board-header">
                <div className="left-btns">
                    <button className="board-title nav-button">
                        <input className='clean-input' type='text' value={boardTitle} name='boardTitle' onFocus={this.handleFocus} onChange={this.handleChange} onBlur={this.onChangeBoardTitle} />
                    </button>
                    <button className={`starred-btn nav-button ${(board.isStarred) ? 'starred' : ''}`} onClick={() => this.toggleStarredBoard()}><AiOutlineStar /></button> |
                    <div className="user-previews">
                        {board.members.map((member, idx) =>
                            <MemberAvatar key={member._id} member={member} style={{ left: idx * -5 }} />
                        )}
                    </div>
                    <div className='relative' ref={this.inviteRef}>
                        <button onClick={() => this.setState({ isOpen: !isOpen })} className="invite-btn nav-button">Invite</button>
                        {isOpen && <DynamicPopover onClose={() => this.setState({ isOpen: false })} title="Invite Members" ref={this.inviteRef}>
                            <InviteMembers />
                        </DynamicPopover>}
                    </div>
                </div>
                <div className="right-btns">
                    <button className={`dashboard-btn nav-button ${(isMenuOpen) ? 'menu-open' : ''}`} onClick={()=>this.props.onToggleDashboard(true)}><RiBarChartFill /> Dashboard</button>
                    <button onClick={() => this.toggleMenu()} className="right-menu-btn nav-button"><HiDotsHorizontal /> Show Menu</button>
                </div>
                <SideMenu isMenuOpen={isMenuOpen} onClose={() => { this.toggleMenu() }} />
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