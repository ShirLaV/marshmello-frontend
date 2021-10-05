import React, { Component } from 'react'
import { MdFormatListBulleted } from 'react-icons/md'
import { cardEditService } from '../../services/card-edit.service'
import { onUpdateCard } from '../../store/board.actions'
import { MemberAvatar } from '../shared/member-avatar'
import { connect } from 'react-redux'
import { Loader } from '../shared/loader'


class _CardEditActivities extends Component {
    state = {
        isFocus: false,
        isTxt: false,
        commentTxt: '',
        currCard: null
    }

    commentRef = React.createRef()

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick)
        const groupId = cardEditService.getGroupId(this.props.currCardId)
        const currCard = cardEditService.getCardById(this.props.currCardId, groupId)
        this.setState({ currCard })
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick)
    }


    handleChange = ({ target: { value } }) => {
        if (value) this.setState({ isTxt: true })
        else this.setState({ isTxt: false, commentTxt: value })
    }

    handleClick = e => {
        if (this.commentRef?.current?.contains(e.target)) {
            return
        } else {
            this.setState({ isFocus: false })
        }
    }

    handleSubmit = () => {
        if (!this.state.isTxt) return
        const res = cardEditService.onAddComment(this.state.commentTxt)
        onUpdateCard(...res)
    }

    render() {
        const { currCard, isFocus, isTxt } = this.state
        const { member } = this.props
        if (!currCard) return <Loader />
        return (
            <div className="comments-section">
                <section className="flex space-between">
                    <div className="card-edit-title">
                        <span><MdFormatListBulleted /></span>
                        <h3>Activity</h3>
                    </div>
                    <button className="card-edit-btn">Show details</button>
                </section>

                <div className="add-comment-container flex">
                    <MemberAvatar member={member} />
                    <div className="new-comment" ref={this.commentRef} style={{ width: '100%', height: isFocus ? 84 : 36, backgroundColor: '#fff' }} onClick={() => this.setState({ isFocus: true })}>
                        <textarea placeholder="Write a comment..." style={{ width: '100%', height: isFocus ? '50%' : '100%' }} onChange={this.handleChange} />
                        {isFocus && <button className={`save-comment-btn card-edit-btn ${isTxt ? 'active' : ''}`} onClick={this.handleSubmit}>Save</button>}
                    </div>
                </div>

                {/* {currCard.comments?.length > 0 && <div className="comments-container flex column">
                    {currCard.comments.map(comment => <CommentPreview key={comment.id} comment={comment} />)}
                </div>} */}


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        board: state.boardModule.currBoard,
        currCardId: state.boardModule.currCardId
    }
}

const mapDispatchToProps = {
    onUpdateCard,
}

export const CardEditActivities = connect(mapStateToProps, mapDispatchToProps)(_CardEditActivities)