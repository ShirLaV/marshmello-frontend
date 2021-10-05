import React, { useState } from 'react'
import { connect } from 'react-redux'
import { PopperMemberPreview } from '../../card-edit/popper-member-preview'

const _MemberList = ({ board }) => {
    const [members, setMembers] = useState(board.members)

    const handleChange = ({ target: { value } }) => {
        const matchingMembers = board.members.filter(member => member.fullname.toLowerCase().includes(value.toLowerCase()))
        setMembers(matchingMembers)
    }

    return (<div className="member-list">
        <input className="search-input" type="text" autoFocus placeholder="Search..." onChange={handleChange} />
        <h4>Board Members</h4>
        <div className="flex column">
            {members.map(member => (
                <PopperMemberPreview
                    key={member._id}
                    member={member}
                />
            ))}
        </div>
    </div>)

}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard,
    }
}

export const MemberList = connect(mapStateToProps)(_MemberList)