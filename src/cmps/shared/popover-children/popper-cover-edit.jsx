import React, { Component } from 'react'
import { cardEditService } from '../../../services/card-edit.service'
import { connect } from 'react-redux'
import { onUpdateCard } from '../../../store/board.actions'

class _PopperCoverEdit extends Component {
    render() {
        const { currCardId } = this.props
        const groupId = cardEditService.getGroupId(currCardId)
        const currCard = cardEditService.getCardById(currCardId, groupId)
        const attachments = currCard?.attachments
        const colors = ['#7bc86c', '#f5dd29', '#ffaf3f', '#ef7564', '#cd8de5', '#517dab', '#29cce5', '#6deca9', '#ff8ed4', '#172b4d']
        return (
            <section className="modal-cover-edit flex column">

                <div className="size-container flex column">
                    <h4>Size</h4>
                    <div className="size-options flex">
                        <div className="size-option"></div>
                        <div className="size-option"></div>
                    </div>
                    <button className="card-edit-btn">Remove cover</button>
                </div>

                <div className="flex column">
                    <h4>Colors</h4>
                    <div className="color-container flex">{colors.map(color => <div className="cover-color-option" style={{ backgroundColor: color }}></div>)}</div>
                </div>

                {attachments && attachments.length && <div className="flex column">
                    <h4>Attachments</h4>
                    <div className="attachments-container flex">{attachments.map(a => <div className="cover-image-option" style={{ backgroundImage: a.url }}></div>)}</div>
                </div>}

            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard,
        currCardId: state.boardModule.currCardId
    }
}

const mapDispatchToProps = {
    onUpdateCard
}

export const PopperCoverEdit = connect(mapStateToProps, mapDispatchToProps)(_PopperCoverEdit);
