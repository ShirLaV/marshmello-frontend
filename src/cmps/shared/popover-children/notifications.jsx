import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment'
import { MemberAvatar } from '../member-avatar';
import { onUpdateUser } from '../../../store/user.actions'

class _Notifications extends React.Component {

    markAsSeen = (mentionId) => {
        const { user } = this.props
        const currMentionIdx = user.mentions.findIndex(mention => mention.id === mentionId)
        user.mentions.splice(currMentionIdx, 1)
        this.props.onUpdateUser(user);
    }

    render() {
        const { user } = this.props
        return (
            <section className="notifications">
                {(user.mentions && user.mentions.length > 0) ? user.mentions.map((mention, idx) =>
                    <div key={mention.id} className="user-mentions">
                        <div className="notification-text">
                            <div className="notification-avatar">
                                <MemberAvatar member={mention.user} />
                            </div>
                            <p><span className="username">{mention.user.fullname}</span> has {mention.action} you {(mention.action === 'Removed') ? 'from' : 'to'} card <Link to={`/board/${mention.board.boardId}/${mention.groupId}/${mention.card.cardId}`}><span className="card-title"> {mention.card.title} </span></Link > in board <Link to={`/board/${mention.board.boardId}`}><span className="board-title">{mention.board.title}</span></Link>
                            </p>
                        </div>
                        <div className="notification-bottom">
                            <Moment className="notification-time" fromNow>{mention.createdAt}</Moment>
                            <small onClick={() => this.markAsSeen(mention.id)}>Mark as read</small>
                        </div>
                    </div>
                ) : <div>No notifications yet</div>}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user
    }
}
const mapDispatchToProps = {
    onUpdateUser
}

export const Notifications = connect(mapStateToProps, mapDispatchToProps)(_Notifications);