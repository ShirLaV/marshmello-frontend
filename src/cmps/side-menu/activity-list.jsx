import React from 'react';
import { GrList } from 'react-icons/gr';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MemberAvatar } from '../shared/member-avatar';
// import { BoardPreview } from './board-preview';

class _ActivityList extends React.Component {

    getGroupTitle = (groupId) => {
        const group = this.props.board.groups.find(group => group.id === groupId)
        return group.title
    }

    render() {
        const { board } = this.props
        return (
            <div className="activity">
                <div className="activity-header">
                    <GrList />
                    <p>Activity</p>
                </div>
                <ul className="activity-list clean-list" >
                    {
                        board.activities.map(activity =>
                            <li key={activity.id} className="activity-preview">
                                <MemberAvatar member={activity.byMember} />
                                <span>{activity.byMember.fullname} {activity.txt} 
                                {activity.groupId && <Link to={`/board/${board._id}/${activity.groupId}/${activity.card.id}`}> {activity.card.title}</Link>}
                                {activity.groupId && <p>to: {this.getGroupTitle(activity.groupId)}</p>}
                                </span>
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