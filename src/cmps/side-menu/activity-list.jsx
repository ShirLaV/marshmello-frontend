import React from 'react';
import { connect } from 'react-redux';
import { MemberAvatar } from '../shared/member-avatar';
// import { BoardPreview } from './board-preview';

class _ActivityList extends React.Component {

    render() {
        const { board } = this.props
        return (
            <ul className="activity-list clean-list" >
                {
                    board.activities.map(activity =>
                        <li key={activity.id} className="activity-preview">
                        <p>{activity.byMember.fullname} {activity.txt}</p>
                        <MemberAvatar member={activity.byMember} />
                        </li>
                        )
                }
            </ul>
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