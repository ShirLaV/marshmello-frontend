import React from 'react'
import { connect } from 'react-redux'
import { PopperMemberPreview } from '../../card-edit/popper-member-preview'

const _MemberList = ({ board }) => (
    <div className="member-list">
        <input className="search-input" type="text" autoFocus placeholder="Search..." />
        <h4>Board Members</h4>
        <div className="flex column">
            {board.members.map(member => (
                <PopperMemberPreview
                    key={member._id}
                    member={member}
                />
            ))}
        </div>
    </div>
)

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard,
    }
}

export const MemberList = connect(mapStateToProps)(_MemberList)