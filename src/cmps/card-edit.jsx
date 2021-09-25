import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onUpdateCard } from '../store/board.actions'
import { CgCreditCard } from 'react-icons/cg'
import { IoMdList } from 'react-icons/io'
import { MdFormatListBulleted } from 'react-icons/md'
import { LabelsMembers } from './card-edit/labels-members'
import { BsCardChecklist } from 'react-icons/bs'
import { ChecklistEdit } from './card-edit/checklist-edit'
import { IoMdClose } from 'react-icons/io'
import { BiUser } from 'react-icons/bi'
import { MdLabelOutline } from 'react-icons/md'
import { BsClock } from 'react-icons/bs'
import { FiPaperclip } from 'react-icons/fi'
import { BsArrowRight } from 'react-icons/bs'
import { MdContentCopy } from 'react-icons/md'
import { AiOutlineEye } from 'react-icons/ai'
import { GoArchive } from 'react-icons/go'

import { DynamicPopover } from './shared/dynamic-popover'
import { EditSidebarLabel } from './card-edit/edit-sidebar-label'
import { MemberList } from './card-edit/member-list'
// import { AiOutlinePlus } from 'react-icons/ai'

class _CardEdit extends Component {
    state = {
        isDescriptionOpen: false,
        currCard: null,
        currGroup: null,
        isOpen: false
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

    onClose = () => {
        this.setState({ isOpen: false })
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
            <section className="card-edit">
                {currCard.style?.bgColor && <div className="card-edit-bg" style={{ backgroundColor: currCard.style.bgColor }}></div>}
                <div className="card-edit-header card-title-container">
                    <span><CgCreditCard /></span>
                    <input className="title-input" type="text" value={currCard.title} name="title" onChange={this.handleChange} onBlur={this.handlePropertyChange} />
                </div>
                <div className="list-name-container"><p>in list <span className="list-name">{currGroup.title}</span></p></div>
                <div className="flex">
                    <div className="card-edit-main">
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
                            {isDescriptionOpen &&
                                <div className="description-btns">
                                    <button className="card-edit-btn secondary">Save</button>
                                    <button onClick={this.setDescriptionTextarea}><IoMdClose style={{ color: '#42526e', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} /></button>
                                </div>}
                        </div>

                        <button onClick={() => this.setState({ isOpen: true })}>open</button>
                        {this.state.isOpen && <DynamicPopover onClose={() => this.setState({ isOpen: false })} title="fhvhk fhb">
                            <MemberList />
                        </DynamicPopover>
                        }


                        {currCard.checklists?.map(checklist => (
                            <div key={checklist.id}>
                                <section className="flex space-between">
                                    <div className="card-edit-title">
                                        <span><BsCardChecklist /></span>
                                        <h3>{checklist.title}</h3>
                                    </div>
                                    <button className="card-edit-btn">Delete</button>
                                </section>
                                <div>
                                    <ChecklistEdit checklist={checklist} params={this.props.match.params} board={this.props.board} />
                                </div>
                                <button className="card-edit-btn">Add an item</button>
                            </div>
                        ))
                        }
                        <section className="flex space-between">
                            <div className="card-edit-title">
                                <span><MdFormatListBulleted /></span>
                                <h3>Activity</h3>
                            </div>
                            <button className="card-edit-btn">Show details</button>
                        </section>
                    </div>

                    <div className="sidebar">
                        <div className="add-to-card">
                            <h3 className="sidebar-title">Add to card</h3>
                            {addToCard.map(item => <EditSidebarLabel Icon={item.icon} title={item.title} />)}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const addToCard = [{ icon: BiUser, title: 'Members' }, { icon: MdLabelOutline, title: 'Labels' }, { icon: BsCardChecklist, title: 'Checklist' }, { icon: BsClock, title: 'Dates' }, { icon: FiPaperclip, title: 'Attachment' }]
const actions = [{ icon: BsArrowRight, title: 'Move' }, { icon: MdContentCopy, title: 'Copy' }, { icon: BsCardChecklist, title: 'Checklist' }, { icon: BsClock, title: 'Dates' }, { icon: FiPaperclip, title: 'Attachment' }]

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard
    }
}

const mapDispatchToProps = {
    onUpdateCard,
}

export const CardEdit = connect(mapStateToProps, mapDispatchToProps)(_CardEdit);
