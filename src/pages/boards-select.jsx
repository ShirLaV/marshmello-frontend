import React from 'react'
import { connect } from 'react-redux'
import { BoardList } from '../cmps/board-list'
import { BoardAdd } from '../cmps/board/board-add'
import { BoardPreview } from '../cmps/board-preview'
import { loadBoards, setAddingBoard } from '../store/board.actions'



class _BoardSelect extends React.Component {
    state = {
    }

    componentDidMount() {
        this.props.loadBoards()
    }

    getStarredBoards = () => {
        return this.props.boards.filter(board => board.isStarred)
    }

    setAddBoard = () => {
        console.log('isAddingBoard: ', this.props.isAddingBoard)
        this.props.setAddingBoard(true)
    }

    render() {
        const { boards, isAddingBoard } = this.props
        console.log('Boards: ', boards);
        console.log('isAddingBoard ', isAddingBoard);
        return (
            <div className="boards-select">
                <div className="starred-boards">
                <h2>Starred Boards</h2>
                <BoardList boards={this.getStarredBoards()} />
                </div>
                <div className="workspace">
                <h2>Workspace</h2>
                <BoardList boards={boards} />
                <div className="board-preview" onClick={() => this.setAddBoard()}>
                    <h2>Add New Board</h2>
                </div>
                    {isAddingBoard && <BoardAdd />}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards,
        isAddingBoard: state.boardModule.isAddingBoard
    }
}

const mapDispatchToProps = {
    loadBoards,
    setAddingBoard
}

export const BoardSelect = connect(mapStateToProps, mapDispatchToProps)(_BoardSelect)
