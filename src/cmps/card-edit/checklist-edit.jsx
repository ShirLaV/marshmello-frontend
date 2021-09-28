import React, { Component } from 'react'
import { ProgressBar } from './progress-bar'
import { connect } from 'react-redux'
import { onUpdateCard } from '../../store/board.actions'
import { VscTrash } from 'react-icons/vsc'


export class _ChecklistEdit extends Component {
    state = {
        percentage: 0,
        currCard: null,
        todoTitle: '',
        isEditTodo: false
    }

    todoItemRef = React.createRef()
    saveTodoBtnRef = React.createRef()

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick)
        this.setState({ currCard: this.props.currCard })
        this.setState({ percentage: this.getTodoPercentage(this.props.checklist.todos) })
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick)
    }

    handleClick = (e) => {
        if (this.saveTodoBtnRef?.current?.contains(e.target) || this.todoItemRef?.current?.contains(e.target)) {
            // inside click
            return
        }
        // outside click 
        this.setState({ isEditTodo: false, todoTitle: '' })
    }



    getTodoPercentage = (todos) => {
        const doneTodos = todos.filter(todo => todo.isDone)
        const percentage = (doneTodos.length / todos.length) * 100

        // console.log(((doneTodos.length / todos.length) * 100).length);
        return (Number.isInteger(percentage)) ? percentage : percentage.toFixed(0)
    }

    handleChange = (todoId) => {
        const { checklist } = this.props
        const todo = checklist.todos.find(todo => todo.id === todoId)
        todo.isDone = !todo.isDone
        const card = this.state.currCard
        const idx = card.checklists.findIndex(cl => cl.id === checklist.id)
        card.checklists.splice(idx, 1, checklist)
        this.setState({ currCard: card })
        this.props.handlePropertyChange(this.state.currCard)
        const percentage = this.getTodoPercentage(this.props.checklist.todos)
        this.setState({ percentage })
    }

    handleTitleChange = ({ target: { name, value } }, todoId) => {

    }

    render() {
        const { checklist } = this.props
        const { percentage, isEditTodo } = this.state
        return (
            <section className="checklist-preview flex column">
                <div className="flex align-center">
                    <span style={{ fontSize: 11, width: 32, maxWidth: 32, minWidth: 32 }}>{percentage}%</span>
                    <ProgressBar completed={percentage} bgColor={(percentage === 100) ? '#61bd4f' : '#5ba4cf'} />
                </div>
                {checklist.todos?.map(todo => {
                    return <div className="flex align-center todo-item" key={todo.id}>
                        <input className="main-checkbox" type="checkbox" name={todo.id} checked={todo.isDone} onChange={() => this.handleChange(todo.id)} onClick={() => this.setState({ todoTitle: todo.title, isEditTodo: true })} />
                        <span className={todo.isDone ? 'done' : ''} onClick={() => this.setState({ isEditTodo: true })}>{todo.title}</span>
                        <span className="remove-todo-icon"><VscTrash /></span>

                    </div>
                })
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
    onUpdateCard,
}

export const ChecklistEdit = connect(mapStateToProps, mapDispatchToProps)(_ChecklistEdit);
