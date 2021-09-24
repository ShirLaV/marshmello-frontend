import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GroupList } from '../cmps/board/group-list.jsx';
import { BoardHeader } from '../cmps/board/board-header.jsx';
import { loadBoard } from '../store/board.actions.js';

class _BoardDetails extends Component {
  state = {
    boardStyle: {},
  };
  componentDidMount() {
    const { boardId } = this.props.match.params;
    this.loadBoard(boardId);
  }
  componentDidUpdate(prevProps) {
    const prevBoard = prevProps.board;
    const board = this.props.board;
    if (prevBoard !== board) {
      if (board.style) this.setBoardStyle(board.style);
    }
  }
  loadBoard = (boardId) => {
    this.props.loadBoard(boardId);
  };
  setBoardStyle = (style) => {
    if (style.bgColor)
      this.setState({
        boardStyle: {
          ...this.state.boardStyle,
          backgroundColor: style.bgColor,
        },
      });
    else
      this.setState({
        boardStyle: {
          ...this.state.boardStyle,
          backgroundImg: `url:("${style.imgUrl}")`,
        },
      });
  };
  render() {
    const { board } = this.props;
    console.log('state:', this.state);
    if (Object.keys(board).length === 0) return <div>Loading...</div>;
    const members = board.members ? board.members : null;
    const { boardStyle } = this.state;
    return (
      <div className='board-details' style={boardStyle}>
        <BoardHeader title={board.title} members={members} />

        <GroupList groups={board.groups} />
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
