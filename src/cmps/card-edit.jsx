import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardEditSidebar } from './card-edit/card-edit-sidebar'
import { LabelsMembers } from './card-edit/labels-members'
import { ChecklistEdit } from './card-edit/checklist-edit'
import { onUpdateCard, onSetCardId } from '../store/board.actions'
import { MdFormatListBulleted } from 'react-icons/md'
import { IoMdList, IoMdClose } from 'react-icons/io'
import { TiCreditCard } from 'react-icons/ti'
import { CgCreditCard } from 'react-icons/cg'


class _CardEdit extends Component {
    state = {
        isDescriptionOpen: false,
        currCard: null,
        currGroup: null
    }

    descriptionRef = React.createRef()
    modalRef = React.createRef()

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick)
        let currCard
        let currGroup
        if (this.props.card) currCard = this.props.card
        else {
            const { cardId, groupId } = this.props.match.params
            this.props.onSetCardId(cardId)
            if (this.props.board.groups) {
                currCard = this.getDataById(cardId, groupId).currentCard
                currGroup = this.getDataById(cardId, groupId).currentGroup
            }
        }
        this.setState({ currCard, currGroup })
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick)
    }

    handleClick = e => {
        if (!this.modalRef?.current?.contains(e.target)) {
            this.props.history.goBack()
        }
    }

    getDataById = (cardId, groupId) => {
        const board = this.props.board
        const currentGroup = board.groups.find(group => group.id === groupId)
        const currentCard = currentGroup.cards.find(card => card.id === cardId)
        return { currentGroup, currentCard }
    }

    setDescriptionTextarea = () => {
        this.setState({ isDescriptionOpen: !this.state.isDescriptionOpen })
    }

    handleInputChange = ({ target: { name, value } }) => {
        this.setState({ currCard: { ...this.state.currCard, [name]: value } })
    }

    handlePropertyChange = (card = this.state.currCard) => {
        const { board } = this.props
        const { groupId } = this.props.match.params
        this.props.onUpdateCard(card, groupId, board)
    }

    onRemoveChecklist = (checklistId) => {
        const card = this.state.card
        const idx = card.checklists.findIndex(checklist => checklist.id === checklistId)
        card.checklists.splice(idx, 1)
        this.setState({ currCard: card })
        this.handlePropertyChange()
    }

    render() {
        const { currCard, isDescriptionOpen, currGroup } = this.state
        if (!currCard) return <div>Loading...</div>
        return (
            <div className="edit-modal-container">
                <section className="card-edit" ref={this.modalRef}>
                    {currCard.style?.bgColor && <div className="card-edit-bg" style={{ backgroundColor: currCard.style.bgColor }}></div>}
                    <button className="close-modal-btn" onClick={() => this.props.history.goBack()}><IoMdClose /></button>
                    {currCard.style?.bgColor && <button className="change-cover-btn">
                        <span className="cover-icon"><TiCreditCard /></span>
                        <span>Cover</span>
                    </button>}

                    <div className="card-edit-header card-title-container">
                        <span><CgCreditCard /></span>
                        <input className="title-input" type="text" value={currCard.title} name="title" onChange={this.handleInputChange} onBlur={() => this.handlePropertyChange()} />
                    </div>

                    <div className="list-name-container"><p>in list <span className="list-name">{currGroup.title}</span></p></div>

                    <div className="flex">
                        <div className="card-edit-main">

                            <LabelsMembers />

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
                                        this.handlePropertyChange()
                                    }}
                                    name="description"
                                    value={currCard.description}
                                    onChange={this.handleInputChange}
                                    placeholder="Add a more detailed description..."
                                />
                                {isDescriptionOpen &&
                                    <div className="description-btns">
                                        <button className="card-edit-btn secondary" onClick={() => this.handlePropertyChange()}>Save</button>
                                        <button onClick={this.setDescriptionTextarea}><IoMdClose style={{ color: '#42526e', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} /></button>
                                    </div>}
                            </div>

                            {currCard.checklists?.map(checklist => (
                                <div key={checklist.id}>
                                    <ChecklistEdit checklist={checklist} currCard={currCard} handlePropertyChange={this.handlePropertyChange} />
                                </div>
                            ))}

                            <section className="flex space-between">
                                <div className="card-edit-title">
                                    <span><MdFormatListBulleted /></span>
                                    <h3>Activity</h3>
                                </div>
                                <button className="card-edit-btn">Show details</button>
                            </section>

                        </div>

                        <CardEditSidebar />

                    </div>
                </section>
            </div>
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
    onUpdateCard,
    onSetCardId
}

export const CardEdit = connect(mapStateToProps, mapDispatchToProps)(_CardEdit);
