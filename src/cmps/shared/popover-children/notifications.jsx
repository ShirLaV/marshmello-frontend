import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment'

class _Notifications extends React.Component {

    render() {
        const { user } = this.props
        return (
            <section className="notifications">
                {(user.mentions && user.mentions.length > 0) ? user.mentions.map((mention, idx) =>
                    <div key={idx} className="user-mentions">
                        <p>{mention.user.fullname} has {mention.action} you {(mention.action === 'Removed') ? 'from' : 'to'} <Link to={`/board/${mention.board.boardId}/${mention.groupId}/${mention.card.cardId}`}> {mention.card.title} </Link>
                        </p>
                        <Moment className="publish-time" fromNow>{mention.createdAt}</Moment>
                    </div>
                ) : <div>No Mentions Yet</div>}
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user
    }
}

export const Notifications = connect(mapStateToProps)(_Notifications);