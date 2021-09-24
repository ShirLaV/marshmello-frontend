import React, { Component } from 'react'
import { ProgressBar } from './progress-bar'
import { connect } from 'react-redux'
import { onUpdateCard } from '../../store/board.actions'


export class _ChecklistEdit extends Component {
    state = {
        percentage: 0,
    }

    getTodoPercentage = (todos) => {
        const doneTodos = todos.filter(todo => todo.isDone)
        return (doneTodos.length / todos.length) * 100
    }

    handleChange = ({ target: { name, checked } }) => {
        const { params, board } = this.props
        const action = { ...params, isChecked: checked }
        this.props.onUpdateCard(action, name, board)
        const percentage = this.getTodoPercentage(this.props.checklist.todos)
        this.setState({ percentage })
    }

    render() {
        const { checklist } = this.props
        const { percentage } = this.state
        return (
            <section className="checklist-preview flex column">
                <div className="flex align-center">
                    <span>{percentage}%</span>
                    <ProgressBar completed={percentage} />
                </div>
                {checklist.todos?.map(todo => {
                    return <div className="flex" key={todo.id}>
                        <input type="checkbox" name={todo.id} checked={todo.isDone} onChange={this.handleChange} />
                        <p>{todo.title}</p>
                    </div>
                })}
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

export const ChecklistEdit = connect(mapStateToProps, mapDispatchToProps)(_ChecklistEdit);
