import React from 'react'
import { connect } from 'react-redux'
import { BoardPreview } from '../cmps/board-preview'
import { loadBoards } from '../store/board.actions'


class _BoardSelect extends React.Component {
    state = {
    }

    componentDidMount() {
        this.props.loadBoards()
    }


    render() {
        const { boards } = this.props
        console.log('Boards: ', boards);
        return (
            <div className="boards-select">
                <h2>Workspace</h2>
                {boards.map(board => 
                    <BoardPreview key={board._id} board={board} />
                    )}
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
