import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { onRemoveBoard } from '../../store/board.actions'

class _RemoveBoard extends React.Component {

    removeBoard = async () => {
        const { board, onRemoveBoard } = this.props
        await onRemoveBoard(board._id)
        this.props.history.push('/board')
    }

    checkIfAllowed = () => {
        const { board, user } = this.props
        return (user.isAdmin || board.createdBy._id === user._id)
    }

    render() {
        return (
            <section className="remove-board flex column">
                {this.checkIfAllowed() && <>
                    <p>Remove this board from workspace?</p>
                    <p>This action is IRREVERSIBLE</p>
                    <button className="remove-btn nav-button" onClick={() => this.removeBoard()}>Remove</button>
                </>}
                {!this.checkIfAllowed() && <p>You Are not allowed to perform this action</p>}

            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.currBoard,
        user: state.userModule.user
    }
}
const mapDispatchToProps = {
    onRemoveBoard
};

export const RemoveBoard = connect(mapStateToProps, mapDispatchToProps)(withRouter(_RemoveBoard));