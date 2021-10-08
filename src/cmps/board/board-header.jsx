import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { RiBarChartFill } from 'react-icons/ri'
import { HiDotsHorizontal } from 'react-icons/hi'
import { FaUserAlt } from 'react-icons/fa'
import { connect } from 'react-redux'
import { activityTxtMap } from '../../services/activity.service'

import { onUpdateBoard } from '../../store/board.actions.js'
import { loadUsers } from '../../store/user.actions.js'
import { MemberAvatar } from '../shared/member-avatar.jsx'
import { InviteMembers } from './invite-members.jsx'
import { DynamicPopover } from '../shared/dynamic-popover.jsx'
import { SideMenu } from '../side-menu/side-menu.jsx'
import { BoardEditMembers } from '../shared/popover-children/board-edit-members'
import { withRouter } from 'react-router'

class _BoardHeader extends React.Component {

    state = {
        isInviteOpen: false,
        boardTitle: this.props.board.title,
        isMenuOpen: false,
        numOfShownMembers: 5,
        isExtraMembersOpen: false,
        isTotalMembersOpen: false
    }

    inviteRef = React.createRef()
    membersRef = React.createRef()
    totalMembersRef = React.createRef()

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
        this.props.loadUsers()
        if (this.props.location.search) this.setState({ isMenuOpen: true })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    handleResize = () => {
        const { numOfShownMembers } = this.state
        if (window.innerWidth < 800) {
            if (numOfShownMembers === 3) return
            this.setState({ numOfShownMembers: 3 })
        } else {
            if (numOfShownMembers === 5) return
            this.setState({ numOfShownMembers: 5 })
        }
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

    getRemainingMembers = () => {
        const members = [...this.props.board.members]
        members.splice(this.state.numOfShownMembers)
        return members
    }

    getExtraMembersLength = () => (this.props.board.members.length - this.state.numOfShownMembers)

    onMembersClose = () => this.setState({ isExtraMembersOpen: false })

    render() {
        const { board, onToggleDashboard, toggleCardLabelList, isCardLabelListOpen, getLabel, toggleCardComplete, openCardEdit } = this.props
        const { boardTitle, isMenuOpen, isInviteOpen, isExtraMembersOpen, isTotalMembersOpen } = this.state
        const members = this.getRemainingMembers()
        const extraMembersLength = this.getExtraMembersLength()

        return (
            <section className="board-header">
                <div className="left-btns">
                    <button className="board-title nav-button">
                        <input className='clean-input' type='text' value={boardTitle} name='boardTitle' onFocus={this.handleFocus} onChange={this.handleChange} onBlur={this.onChangeBoardTitle} />
                    </button>
                    <button className={`starred-btn nav-button ${(board.isStarred) ? 'starred' : ''}`} onClick={() => this.toggleStarredBoard()}><AiOutlineStar /></button>
                    <div className="members-container flex"><div className="user-previews">
                        {members.map((member, idx) =>
                            <MemberAvatar key={member._id} member={member} style={{ left: idx * -5 }} />
                        )}
                        {extraMembersLength > 0 && (
                            <div
                                ref={this.membersRef}
                            >
                                <div className="list-item-layover round" style={{ transform: `translateX(${(members.length) * -5}px)` }} onClick={() => this.setState({ isExtraMembersOpen: !isExtraMembersOpen })}></div>
                                <div
                                    className="show-more-btn"
                                    style={{ transform: `translateX(${(members.length) * -5}px)` }}
                                >
                                    {`+${extraMembersLength}`}
                                </div>
                                {isExtraMembersOpen && <DynamicPopover onClose={() => this.setState({ isExtraMembersOpen: false })} title="Members" ref={this.membersRef}>
                                    <BoardEditMembers members={board.members.filter(member => member._id)} onClose={this.onMembersClose} />
                                </DynamicPopover>}
                            </div>
                        )}
                    </div>
                        <div className='pos-relative' ref={this.inviteRef}>
                            <button onClick={() => this.setState({ isInviteOpen: !isInviteOpen })} className="invite-btn nav-button pos-relative" style={{ transform: `translateX(${(members.length -2) * -5}px)` }}>Invite</button>
                            {isInviteOpen && <DynamicPopover onClose={() => this.setState({ isInviteOpen: false })} title="Invite Members" ref={this.inviteRef}>
                                <InviteMembers />
                            </DynamicPopover>}
                        </div></div>
                </div>
                <div className="right-btns">
                    {!isMenuOpen && <>
                        <div className="pos-relative" ref={this.totalMembersRef}>
                            <button className="nav-button members-btn" onClick={() => this.setState({ isTotalMembersOpen: !isTotalMembersOpen })}><FaUserAlt /></button>
                            {isTotalMembersOpen && <DynamicPopover onClose={() => this.setState({ isTotalMembersOpen: false })} title="Members" ref={this.totalMembersRef}>
                                <InviteMembers />
                            </DynamicPopover>}
                        </div>

                        <button onClick={() => onToggleDashboard(true)} className={`dashboard-btn nav-button ${(isMenuOpen) ? 'menu-open' : ''}`}><RiBarChartFill /> <span className="right-btn-txt">Dashboard</span></button>
                        <button onClick={() => this.toggleMenu()} className="right-menu-btn nav-button"><HiDotsHorizontal /> <span className="right-btn-txt">Show Menu</span></button>
                    </>}
                </div>
                <SideMenu isMenuOpen={isMenuOpen} onClose={() => { this.toggleMenu() }} isCardLabelListOpen={isCardLabelListOpen} toggleCardLabelList={toggleCardLabelList} getLabel={getLabel} openCardEdit={openCardEdit} toggleCardComplete={toggleCardComplete} />
            </section >
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



export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(withRouter(_BoardHeader))