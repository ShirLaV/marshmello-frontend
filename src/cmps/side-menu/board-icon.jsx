import React from "react";
import { connect } from "react-redux";


class _BoardIcon extends React.Component {

    render() {
        const { board } = this.props
        return (
            <div className="icon" style={(board.style.bgColor) ? { backgroundColor: board.style.bgColor } : {}} >
                {board.style.imgUrl && <img src={board.style.imgUrl} alt="" />}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.currBoard,
    }
}

export const BoardIcon = connect(mapStateToProps)(_BoardIcon);