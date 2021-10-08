import React from 'react'
import Moment from 'react-moment'
import { MemberAvatar } from '../shared/member-avatar'
import { connect } from 'react-redux'

function _CardEditActivityPreview({ activity, board }) {

    return (
        <div className="activity-preview">
            <span className="member-avatar"><MemberAvatar member={activity.byMember} /></span>
            <div className="activity-text">
                <span className="user-fullname">{activity.byMember.fullname} </span>
                <p>{activity.txt}</p>
                <Moment className="publish-time" fromNow>{activity.createdAt}</Moment>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        board: state.boardModule.currBoard,
        currCardId: state.boardModule.currCardId
    }
}


export const CardEditActivityPreview = connect(mapStateToProps)(_CardEditActivityPreview)