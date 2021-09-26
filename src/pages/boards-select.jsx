import React from 'react'
import { connect } from 'react-redux'
import { BoardList } from '../cmps/board-list'
import { AiFillStar } from 'react-icons/ai'
import { SiTrello } from 'react-icons/si'

import { loadBoards, setAddingBoard, onUpdateBoard } from '../store/board.actions'



class _BoardSelect extends React.Component {
    state = {
    }

    componentDidMount() {
        this.props.loadBoards()
    }

    getStarredBoards = () => {
        return this.props.boards.filter(board => board.isStarred)
    }

    toggleStarredBoard = () => {
        
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
            <div className="boards-select main-container">
                <h2> <AiFillStar /> Starred Boards</h2>
                <div className="starred-boards">
                    <BoardList boards={this.getStarredBoards()} />
                </div>
                <h2> <SiTrello /> Workspace</h2>
                <div className="workspace">
                    <BoardList boards={boards} toggleStarred={this.toggleStarred} />
                    <div className="board-preview create-board-btn" onClick={() => this.setAddBoard()}>
                        <h4>Create New Board</h4>
                    </div>
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
    setAddingBoard,
    onUpdateBoard
}

export const BoardSelect = connect(mapStateToProps, mapDispatchToProps)(_BoardSelect)
