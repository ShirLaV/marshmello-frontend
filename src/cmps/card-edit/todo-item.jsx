import React, { Component } from 'react'
import { connect } from 'react-redux'
import { VscTrash } from 'react-icons/vsc'
import { cardEditService } from '../../services/card-edit.service'
import { onUpdateCard } from '../../store/board.actions'
import { IoMdClose } from 'react-icons/io'

class _TodoItem extends Component {
    state = {
        todoTitle: '',
        isEditTodo: false
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick)
    }

    todoTextareaRef = React.createRef()
    saveTodoBtnRef = React.createRef()

    handleClick = (e) => {
        if (this.todoTextareaRef?.current?.contains(e.target) || this.saveTodoBtnRef?.current?.contains(e.target) || this.newTodoTextarea?.current?.contains(e.target)) {
            return
        }
        this.setState({ isEditTodo: false, todoTitle: '' })
    }

    handleMarkTodo = () => {
        const res = cardEditService.handleChecklistChange('markTodo', this.props.checklistId, this.props.todo.id)
        this.props.onUpdateCard(...res)
    }

    handleRemoveTodo = () => {
        const res = cardEditService.handleChecklistChange('removeTodo', this.props.checklistId, this.props.todo.id)
        this.props.onUpdateCard(...res)
    }

    handleTitleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value })
    }

    onChangeTitle = (ev) => {
        ev.preventDefault()
        const { checklistId, todo, onUpdateCard } = this.props
        const { todoTitle } = this.state
        const res = cardEditService.handleChecklistChange('changeTitle', checklistId, todo.id, todoTitle)
        onUpdateCard(...res)
        this.setState({ isEditTodo: false, todoTitle: '' })
    }

    render() {
        const { todo } = this.props
        const { isEditTodo, todoTitle } = this.state
        return (
            <div className="flex align-center todo-item">
                <input className="main-checkbox" type="checkbox" name={todo.id} checked={todo.isDone} onChange={this.handleMarkTodo} onClick={() => this.setState({ todoTitle: todo.title })}
                    style={{ alignSelf: isEditTodo ? 'flex-start' : 'center' }} />
                {!isEditTodo ? (
                    <div>
                        <span
                            className={todo.isDone ? 'done' : ''}
                            onClick={() => this.setState({ isEditTodo: true })}
                        >
                            {todo.title}
                        </span>
                        <span
                            className="remove-todo-icon"
                            onClick={this.handleRemoveTodo}
                        >
                            <VscTrash />
                        </span>
                    </div>
                ) :
                    <form onSubmit={this.onChangeTitle} style={{ paddingBottom: 9 }}>
                        <textarea
                            className="description-textarea edit-todo"
                            onFocus={() => this.setState({ todoTitle: todo.title })}
                            autoFocus
                            name="todoTitle"
                            value={todoTitle}
                            ref={this.todoTextareaRef}
                            onChange={this.handleTitleChange} />

                        <div className="description-btns">
                            <button ref={this.saveTodoBtnRef} className="card-edit-btn secondary">Save</button>
                            <button onClick={() => this.setState({ isEditTodo: false, todoTitle: '' })}><IoMdClose style={{ color: '#42526e', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} /></button>
                        </div>
                    </form>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currCardId: state.boardModule.currCardId
    }
}

const mapDispatchToProps = {
    onUpdateCard,
}

export const TodoItem = connect(mapStateToProps, mapDispatchToProps)(_TodoItem);

