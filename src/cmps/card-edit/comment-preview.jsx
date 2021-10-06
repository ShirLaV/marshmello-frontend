import React from 'react'
import { cardEditService } from '../../services/card-edit.service'
import { MemberAvatar } from '../shared/member-avatar'
import { connect } from 'react-redux'
import { onUpdateCard } from '../../store/board.actions'


function _CommentPreview({ comment, user, onUpdateCard }) {

    const timeMsg = cardEditService.getCommentTime(comment.addedAt)

    const onRemoveComment = () => {
        const res = cardEditService.handleCommentRemove(comment.id)
        onUpdateCard(...res)
    }

    return (
        <div className="comment-preview flex">
            <MemberAvatar member={comment.author} />
            <div className="flex column comment-info">
                <div className="comment-data flex">
                    <span className="author-name">{comment.author.fullname}</span>
                    <span className="comment-time">{timeMsg}</span>
                </div>

                <div className="comment-txt">{comment.txt}</div>

                {(comment.author._id === user._id) && <span className="remove-btn" onClick={onRemoveComment}>Delete</span>}

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    onUpdateCard,
}

export const CommentPreview = connect(mapStateToProps, mapDispatchToProps)(_CommentPreview)