import React from "react";
import { connect } from "react-redux";


class _Archive extends React.Component {

    render() {
        return(
            <div>
                <p>Archive</p>
                {/* <CardPreview /> */}
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        board: state.boardModule.currBoard,
        filterBy: state.boardModule.filterBy
    }
}

export const Archive = connect(mapStateToProps)(_Archive);
