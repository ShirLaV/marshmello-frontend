import React, { Component } from 'react'
// import { IoMdClose } from 'react-icons/io'
import { connect } from 'react-redux'
import { cardEditService } from '../../services/card-edit.service'
import { onUpdateCard } from '../../store/board.actions'
import { FiPaperclip } from 'react-icons/fi'
import { AttachmentPreview } from './attachment-preview'


class _CardEditAttachment extends Component {
    state = {
        currCard: {}
    }

    componentDidMount() {
        const groupId = cardEditService.getGroupId(this.props.currCardId)
        const currCard = cardEditService.getCardById(this.props.currCardId, groupId)
        this.setState({ currCard })
    }

    render() {
        const { currCard } = this.state
        return (
            <>
                <div className="attachment-container card-edit-title">
                    <span><FiPaperclip /></span>
                    <h3>Attachments</h3>
                </div>
                <div className="card-attachments">
                    {currCard?.attachments?.map(attachment => <AttachmentPreview attachment={attachment} />)}
                </div>
            </>
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

export const CardEditAttachment = connect(mapStateToProps, mapDispatchToProps)(_CardEditAttachment);
