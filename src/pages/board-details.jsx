import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GroupList } from '../cmps/board/group-list.jsx';
import { loadBoard } from '../store/board.actions.js';

class _BoardDetails extends Component {
  componentDidMount() {
    const { boardId } = this.props.match.params;
    this.loadBoard(boardId);
  }
  loadBoard = (boardId) => {
    this.props.loadBoard(boardId);
  };
  render() {
      const {board} = this.props;
      if(!board) return <div>Loading...</div>
    return (
      <div>
          <div className="board-header"></div>
        <h1>{board.title}</h1>
        <GroupList groups={board.groups}/>
        {/* <pre>{JSON.stringify(board, null, 2)}</pre> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.currBoard,
  };
}
const mapDispatchToProps = {
  loadBoard,
};

export const BoardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardDetails);
