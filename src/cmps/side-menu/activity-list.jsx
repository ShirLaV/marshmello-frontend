import React from 'react';
import { GrList } from 'react-icons/gr';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MemberAvatar } from '../shared/member-avatar';
import Moment from 'react-moment'

class _ActivityList extends React.Component {

    getGroupTitle = (groupId) => {
        const group = this.props.board.groups.find(group => group.id === groupId)
        return group.title
    }

    render() {
        const { board } = this.props
        if (board.activities.length === 0) return (<div className="activity">
            <div className="activity-header">
                <GrList />
                <p>Activity</p>
            </div>
            <p>No Activities in this board yet</p>
        </div>)
        return (
            <div className="activity">
                <div className="activity-header">
                    <GrList />
                    <p>Activity</p>
                </div>
                <ul className="activity-list clean-list" >
                    {
                        board.activities.map((activity, idx) =>
                            <li key={`${activity.createdAt}${idx}`} className="activity-preview">
                                <span className="member-avatar"><MemberAvatar member={activity.byMember} /></span>
                                <div className="activity-text">
                                    <span className="user-fullname">{activity.byMember.fullname} </span>
                                    <p>{activity.txt}</p>
                                    {activity.groupId && <Link to={`/board/${board._id}/${activity.groupId}/${activity.card.id}`}> {activity.card.title}</Link>}
                                    {activity.groupId && <p>in list: {this.getGroupTitle(activity.groupId)}</p>}
                                    <Moment className="publish-time" fromNow>{activity.createdAt}</Moment>
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.currBoard
    }
}
const mapDispatchToProps = {
}

export const ActivityList = connect(mapStateToProps, mapDispatchToProps)(_ActivityList);