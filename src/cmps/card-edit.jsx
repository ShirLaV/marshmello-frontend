import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onUpdateCard } from '../store/board.actions'
import { CgCreditCard } from 'react-icons/cg'
import { IoMdList } from 'react-icons/io'
import { MdFormatListBulleted } from 'react-icons/md'
import { LabelsMembers } from './card-edit/labels-members'
import { BsCardChecklist } from 'react-icons/bs'
import { ChecklistEdit } from './card-edit/checklist-edit'
// import { AiOutlinePlus } from 'react-icons/ai'

class _CardEdit extends Component {
    state = {
        isDescriptionOpen: false,
        currCard: null,
        currGroup: null,
    }

    componentDidMount() {
        let currCard
        let currGroup
        if (this.props.card) currCard = this.props.card
        else {
            const { cardId, groupId } = this.props.match.params
            if (this.props.board.groups) {
                currCard = this.getDataById(cardId, groupId).currentCard
                currGroup = this.getDataById(cardId, groupId).currentGroup
            }
        }
        this.setState({ currCard, currGroup })
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

    handleChange = ({ target: { name, value } }) => {
        this.setState({ currCard: { ...this.state.currCard, [name]: value } })
    }

    handlePropertyChange = ({ target: { name, value, checked } }) => {
        let dataParams = this.props.match.params
        const action = { ...dataParams, [name]: value }
        this.props.onUpdateCard(action, name, this.props.board)
    }

    // handlePropertyRemove = ({ target: { name, value, checked } }) => {
    //     let dataParams = this.props.match.params
    //     const action = { ...dataParams, [name]: value }
    //     this.props.onRemoveCardProperty(action, name, this.props.board)
    // }

    render() {
        const { currCard, isDescriptionOpen, currGroup } = this.state
        if (!currCard) return <div>Loading...</div>
        // console.log(this.props.board);
        return (
            <div className="card-edit">
                {currCard.style.bgColor && <div className="card-edit-bg" style={{ backgroundColor: currCard.style.bgColor }}></div>}
                <div className="card-edit-header card-edit-title">
                    <span><CgCreditCard /></span>
                    <input className="clean-input" type="text" value={currCard.title} name="title" onChange={this.handleChange} onBlur={this.handlePropertyChange} />
                </div>
                <div className="list-name-container"><p>in list <span className="list-name">{currGroup.title}</span></p></div>
                <LabelsMembers members={currCard.members} labelIds={currCard.labelIds} board={this.props.board} />
                <div className="description-container card-edit-title">
                    <span><IoMdList /></span>
                    <h3>Description</h3>
                </div>
                <div className="card-description">
                    <textarea
                        className={`description-textarea ${isDescriptionOpen ? 'open' : ''}`}
                        rows={isDescriptionOpen ? "6" : "3"}
                        onFocus={this.setDescriptionTextarea}
                        onBlur={(ev) => {
                            this.setDescriptionTextarea()
                            this.handlePropertyChange(ev)
                        }}
                        name="description"
                        value={currCard.description}
                        onChange={this.handleChange}
                        placeholder="Add a more detailed description..." />
                    {isDescriptionOpen && <div className="description-btns">
                        <button>Save</button>
                        <button onClick={this.setDescriptionTextarea}>X</button>
                    </div>}
                </div>

                {currCard.checklists?.map(checklist => (
                    <div key={checklist.id}>
                        <section className="flex space-between">
                            <div className="card-edit-title">
                                <span><BsCardChecklist /></span>
                                <h3>{checklist.title}</h3>
                            </div>
                            <button>Delete</button>
                        </section>
                        <div>
                            <ChecklistEdit checklist={checklist} params={this.props.match.params} board={this.props.board} />
                        </div>
                    </div>
                ))
                }

                <div className="card-edit-title">
                    <span><MdFormatListBulleted /></span>
                    <h3>Activity</h3>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard
    }
}

const mapDispatchToProps = {
    onUpdateCard,
}

export const CardEdit = connect(mapStateToProps, mapDispatchToProps)(_CardEdit);
