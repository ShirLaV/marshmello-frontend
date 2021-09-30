import React, { Component } from 'react'
import { cardEditService } from '../../../services/card-edit.service'
import { connect } from 'react-redux'
import { onUpdateCard } from '../../../store/board.actions'

class _PopperCoverEdit extends Component {
    state = {
        currCard: null,
        groupId: null,
        selectedEl: null,
        initialStyle: null
    }

    componentDidMount() {
        const { currCardId } = this.props
        console.log(currCardId);
        const groupId = cardEditService.getGroupId(currCardId)
        const currCard = cardEditService.getCardById(currCardId, groupId)
        console.log(currCard);
        // if (currCard.style) {
        //     if (currCard.style.bgColor) {

        //     }
        // }
        this.setState({ currCard, groupId })
    }

    handleClick = (ev, value, type) => {
        ev.target.classList.add('selected')
        this.state.selectedEl?.classList.remove('selected')
        this.setState({ selectedEl: ev.target })
        const { board, currCardId, onUpdateCard } = this.props
        const { currCard, groupId } = this.state
        currCard.style = type === 'color' ? { bgColor: value } : { imgUrl: value }
        onUpdateCard(currCard, groupId, board)
    }

    handleCoverRemove = () => {
        const { board, currCardId, onUpdateCard } = this.props
        const { currCard, groupId } = this.state
        currCard.style = null
        onUpdateCard(currCardId, groupId, board)
    }

    handleInitialSelect = () => {

    }

    render() {
        const { currCard } = this.state
        if (!currCard) return ''
        const colors = ['#7bc86c', '#f5dd29', '#ffaf3f', '#ef7564', '#cd8de5', '#517dab', '#29cce5', '#6deca9', '#ff8ed4', '#172b4d']
        return (
            <section className="modal-cover-edit flex column">

                <div className="size-container flex column">
                    <h4>Size</h4>
                    <div className="size-options flex">
                        <div className="size-option"></div>
                        <div className="size-option"></div>
                    </div>
                    <button className="card-edit-btn" onClick={this.handleCoverRemove}>Remove cover</button>
                </div>

                <div className="flex column">
                    <h4>Colors</h4>
                    <div className="color-container flex">{colors.map((color, i) => <div key={i} className="cover-color-option" style={{ backgroundColor: color }} onClick={ev => this.handleClick(ev, color, 'color')}></div>)}</div>
                </div>

                {currCard.attachments && currCard.attachments.length && <div className="flex column">
                    <h4>Attachments</h4>
                    <div className="attachments-container flex">{currCard.attachments.map(a => <div key={a.id} className="cover-image-option" style={{ backgroundImage: `url(${a.url})` }} onClick={ev => this.handleClick(ev, a.url, 'img')}></div>)}</div>
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
