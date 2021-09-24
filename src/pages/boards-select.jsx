import React from 'react'
import { connect } from 'react-redux'
import { BoardList } from '../cmps/board-list'
import { BoardPreview } from '../cmps/board-preview'
import { loadBoards } from '../store/board.actions'


class _BoardSelect extends React.Component {
    state = {
    }

    componentDidMount() {
        this.props.loadBoards()
    }

    getStarredBoards = () => {
        return this.props.boards.filter(board => board.isStarred)
    }

    render() {
        const { boards } = this.props
        console.log('Boards: ', boards);
        return (
            <div className="boards-select">
                <div className="starred-boards">
                <h2>Starred Boards</h2>
                <BoardList boards={this.getStarredBoards()} />
                </div>
                <div className="workspace">
                <h2>Workspace</h2>
                <BoardList boards={boards} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards
    }
}

const mapDispatchToProps = {
    loadBoards
}

export const BoardSelect = connect(mapStateToProps, mapDispatchToProps)(_BoardSelect)
