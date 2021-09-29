import React, { Component } from 'react'
import { ProgressBar } from './progress-bar'
import { connect } from 'react-redux'
import { onUpdateCard } from '../../store/board.actions'
import { cardEditService } from '../../services/card-edit.service'
import { utilService } from '../../services/util.service'
import { BsCardChecklist } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import { TodoItem } from './todo-item'

export class _ChecklistEdit extends Component {
    state = {
        percentage: 0,
        isAddTodo: false,
        newTodo: ''
    }

    saveTodoBtnRef = React.createRef()
    addTodoBtnRef = React.createRef()
    newTodoTextarea = React.createRef()

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick)
        if (this.props.checklist.todos) this.setTodoPercentage()
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.board !== this.props.board) {
            this.setTodoPercentage()
        }
    }

    handleClick = (e) => {
        if (this.saveTodoBtnRef?.current?.contains(e.target) || this.addTodoBtnRef?.current?.contains(e.target) || this.newTodoTextarea?.current?.contains(e.target)) {
            return
        }
        this.setState({ isAddTodo: false, newTodo: '' })
    }

    setTodoPercentage = (todos = this.props.checklist.todos) => {
        if (!todos?.length && !this.props.checklist?.todos.length) {
            this.setState({ percentage: 0 })
            return
        }
        const doneTodos = todos.filter(todo => todo.isDone)
        const num = (doneTodos.length / todos.length) * 100
        const percentage = (Number.isInteger(num)) ? num : num.toFixed(0)
        this.setState({ percentage })
    }

    handleInputChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value })
    }

    onAddTodo = (ev) => {
        ev.preventDefault()
        this.setState({ isAddTodo: false, newTodo: '' })
        const res = cardEditService.handleChecklistChange("addTodo", this.props.checklist.id, { id: utilService.makeId(), title: ev.target[0].value, isDone: false })
        this.props.onUpdateCard(...res)
    }

    onRemoveChecklist = () => {
        const res = cardEditService.handleChecklistChange("removeChecklist", this.props.checklist.id)
        this.props.onUpdateCard(...res)
    }

    render() {
        const { checklist } = this.props
        const { percentage, isAddTodo } = this.state
        return (
            <section className="checklist-preview flex column">

                <section className="flex space-between">
                    <div className="card-edit-title">
                        <span><BsCardChecklist /></span>
                        <h3>{checklist.title}</h3>
                    </div>
                    <button className="card-edit-btn" onClick={this.onRemoveChecklist}>Delete</button>
                </section>

                <div className="flex align-center">
                    <span style={{ fontSize: 11, width: 32, maxWidth: 32, minWidth: 32 }}>{percentage}%</span>
                    <ProgressBar completed={percentage} bgColor={(percentage === 100) ? '#61bd4f' : '#5ba4cf'} />
                </div>

                {checklist.todos?.map(todo => {
                    return <div className="todos-container" key={todo.id}>
                        <TodoItem todo={todo} checklistId={checklist.id} />
                    </div>
                })
                }

                {!isAddTodo
                    ? <button className="card-edit-btn add-todo-btn" style={{ alignSelf: 'flex-start' }} onClick={() => this.setState({ isAddTodo: true })}>Add an item</button>
                    : <form onSubmit={this.onAddTodo}><textarea rows="2"
                        className="description-textarea add-todo"
                        ref={this.newTodoTextarea}
                        autoFocus
                        name="newTodo"
                        placeholder="Add an item"
                        onChange={this.handleInputChange} />

                        <div className="description-btns add-todo-btns">
                            <button ref={this.addTodoBtnRef} className="card-edit-btn secondary">Save</button>
                            <button onClick={() => this.setState({ isAddTodo: false, newTodo: '' })}><IoMdClose style={{ color: '#42526e', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} /></button>
                        </div>
                    </form>
                }
            </section >
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.boardModule.currBoard
    }
}

const mapDispatchToProps = {
    onUpdateCard
}

export const ChecklistEdit = connect(mapStateToProps, mapDispatchToProps)(_ChecklistEdit);
