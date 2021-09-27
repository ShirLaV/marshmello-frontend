import React, { Component } from 'react'
import { connect } from 'react-redux'
import { utilService } from '../services/util.service'
import { CardEditSidebar } from './card-edit/card-edit-sidebar'
import { LabelsMembers } from './card-edit/labels-members'
import { ChecklistEdit } from './card-edit/checklist-edit'
import { DynamicPopover } from './shared/dynamic-popover'
import { loadBoard, onUpdateCard } from '../store/board.actions'
import { MemberList } from './shared/popover-children/member-list'
import { MdFormatListBulleted } from 'react-icons/md'
import { IoMdList, IoMdClose } from 'react-icons/io'
import { BsCardChecklist } from 'react-icons/bs'
import { CgCreditCard } from 'react-icons/cg'

class _CardEdit extends Component {
    state = {
        isDescriptionOpen: false,
        currCard: null,
        currGroup: null,
        isAddTodo: false,
        newTodo: ''
        // isOpen: false,
        // rect: '',
        // element: null
    }

    descriptionRef = React.createRef()
    addTodoBtnRef = React.createRef()
    newTodoTextarea = React.createRef()

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick)
        // console.log(this.props.match.params.groupId);
        let currCard
        let currGroup
        if (this.props.card) currCard = this.props.card
        else {
            const cardId = this.props.cardId
            const groupId = this.props.groupId
            // const { cardId, groupId } = this.props.openedCardEdit
            // const { cardId, groupId } = this.props.match.params
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
        if (this.addTodoBtnRef?.current?.contains(e.target) || this.newTodoTextarea?.current?.contains(e.target)) {
            // inside click
            return
        }
        // outside click 
        this.setState({ isAddTodo: false, newTodo: '' })
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
        if (name === "newTodo") this.setState({ newTodo: value })
        else this.setState({ currCard: { ...this.state.currCard, [name]: value } })
    }

    onAddTodo = (checklist) => {
        const card = this.state.currCard
        checklist.todos.push({ id: utilService.makeId(), title: this.state.newTodo, isDone: false })
        const idx = card.checklists.findIndex(cl => cl.id === checklist.id)
        card.checklists.splice(idx, 1, checklist)
        this.setState({ currCard: card, isAddTodo: false, newTodo: '' })
        this.handlePropertyChange()
    }

    handlePropertyChange = (card = this.state.currCard) => {
        const { board } = this.props
        const { groupId } = this.props.match.params
        this.props.onUpdateCard(card, groupId, board)
    }

    // handlePropertyChange = ({ target: { name, value, checked } }) => {
    //     let dataParams = this.props.match.params
    //     const action = { ...dataParams, [name]: value }
    //     this.props.onUpdateCard(action, name, this.props.board)
    // }

    onRemoveChecklist = (checklistId) => {
        const card = this.state.card
        const idx = card.checklists.findIndex(checklist => checklist.id === checklistId)
        card.checklists.splice(idx, 1)
        this.setState({ currCard: card })
        this.handlePropertyChange()
    }

    // handlePopoverChange = (ev) => {
    //     const rect = ev.target.getBoundingClientRect()
    //     this.setState({ rect, isOpen: !this.state.isOpen, element: ev.target })
    // }

    render() {
        console.log(this.addTodoBtnRef.current);
        const { currCard, isDescriptionOpen, currGroup, isAddTodo } = this.state
        if (!currCard) return <div>Loading...</div>
        // console.log(this.props.board);
        return (
            <section className="card-edit">
                {currCard.style?.bgColor && <div className="card-edit-bg" style={{ backgroundColor: currCard.style.bgColor }}></div>}
                <div className="card-edit-header card-title-container">
                    <span><CgCreditCard /></span>
                    <input className="title-input" type="text" value={currCard.title} name="title" onChange={this.handleInputChange} onBlur={() => this.handlePropertyChange()} />
                </div>

                <div className="list-name-container"><p>in list <span className="list-name">{currGroup.title}</span></p></div>
                <div className="flex">

                    <div className="card-edit-main">
                        <LabelsMembers handlePropertyChange={this.handlePropertyChange} currCard={currCard} members={currCard.members} labelIds={currCard.labelIds} board={this.props.board} />
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
                                placeholder="Add a more detailed description..." />
                            {isDescriptionOpen &&
                                <div className="description-btns">
                                    <button className="card-edit-btn secondary" onClick={() => this.handlePropertyChange()}>Save</button>
                                    <button onClick={this.setDescriptionTextarea}><IoMdClose style={{ color: '#42526e', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} /></button>
                                </div>}
                        </div>

                        {/* {this.state.isOpen && <DynamicPopover onClose={() => this.setState({ isOpen: false })} title="fhvhk fhb" rect={this.state.rect} element={this.state.element}>
                            <MemberList />
                        </DynamicPopover>
                        } */}

                        {currCard.checklists?.map(checklist => (
                            <div key={checklist.id}>
                                <section className="flex space-between">
                                    <div className="card-edit-title">
                                        <span><BsCardChecklist /></span>
                                        <h3>{checklist.title}</h3>
                                    </div>
                                    <button className="card-edit-btn" onClick={() => this.onRemoveChecklist(checklist.id)}>Delete</button>
                                </section>
                                <div>
                                    <ChecklistEdit checklist={checklist} currCard={currCard} handlePropertyChange={this.handlePropertyChange} />
                                </div>
                                {!isAddTodo
                                    ? <button className="card-edit-btn add-todo-btn" onClick={() => this.setState({ isAddTodo: true })}>Add an item</button>
                                    : <><textarea rows="2"
                                        className="description-textarea add-todo"
                                        ref={this.newTodoTextarea}
                                        autoFocus
                                        name="newTodo"
                                        placeholder="Add an item"
                                        onChange={this.handleInputChange} />
                                        {/* // onBlur={() => this.setState({ isAddTodo: false, newTodo: '' })}  */}

                                        <div className="description-btns add-todo-btns">
                                            <button ref={this.addTodoBtnRef} className="card-edit-btn secondary" onClick={() => this.onAddTodo(checklist)}>Save</button>
                                            <button onClick={() => this.setState({ isAddTodo: false, newTodo: '' })}><IoMdClose style={{ color: '#42526e', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} /></button>
                                        </div>
                                    </>

                                }
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

                    <CardEditSidebar />
                </div>
            </section>
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
