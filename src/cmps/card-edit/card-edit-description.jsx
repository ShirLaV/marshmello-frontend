import React, { Component } from 'react'
import { IoMdClose, IoMdList } from 'react-icons/io'
import { connect } from 'react-redux'
import { cardEditService } from '../../services/card-edit.service'
import { onUpdateCard } from '../../store/board.actions'

class _CardEditDescription extends Component {
    state = {
        currCard: {},
        isDescriptionOpen: false
    }

    descriptionRef = React.createRef()

    componentDidMount() {
        const groupId = cardEditService.getGroupId(this.props.currCardId)
        const currCard = cardEditService.getCardById(this.props.currCardId, groupId)
        this.setState({ currCard })
    }

    setDescriptionTextarea = () => {
        this.setState({ isDescriptionOpen: !this.state.isDescriptionOpen })
    }

    handleDescriptionChange = (card = this.state.currCard) => {
        const { board } = this.props
        const groupId = cardEditService.getGroupId(this.props.currCardId)
        this.props.onUpdateCard(card, groupId, board)
    }

    handleInputChange = ({ target: { value } }) => {
        this.setState({ currCard: { ...this.state.currCard, description: value } })
    }

    render() {
        const { currCard, isDescriptionOpen } = this.state
        return (
            <>
                <div className="description-container card-edit-title">
                    <span><IoMdList /></span>
                    <h3>Description</h3>
                    {currCard.description && !isDescriptionOpen && <button className="card-edit-btn" onClick={() => {
                        this.setDescriptionTextarea()
                        this.descriptionRef.current.focus()
                    }}> Edit</button>}
                </div>
                <div className="card-description">
                    <textarea
                        ref={this.descriptionRef}
                        className={`description-textarea ${isDescriptionOpen ? 'open' : ''} ${currCard.description ? 'filled' : ''}`}
                        rows={isDescriptionOpen ? "6" : "3"}
                        onFocus={this.setDescriptionTextarea}
                        onBlur={() => {
                            this.setDescriptionTextarea()
                            this.handleDescriptionChange()
                        }}
                        value={currCard.description}
                        onChange={this.handleInputChange}
                        placeholder="Add a more detailed description..."
                    />
                    {isDescriptionOpen &&
                        <div className="description-btns">
                            <button className="card-edit-btn secondary" onClick={() => this.handleDescriptionChange()}>Save</button>
                            <button onClick={this.setDescriptionTextarea}><IoMdClose style={{ color: '#42526e', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} /></button>
                        </div>}
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

export const CardEditDescription = connect(mapStateToProps, mapDispatchToProps)(_CardEditDescription);
