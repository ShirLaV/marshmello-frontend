import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GroupList } from '../cmps/board/group-list.jsx';
import { BoardHeader } from '../cmps/board/board-header.jsx';
import { loadBoard, onUpdateBoard } from '../store/board.actions.js';

class _BoardDetails extends Component {
  state = {
    boardStyle: {},
    isCardLabelListOpen: false,
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
          backgroundImage: `url("${style.imgUrl}")`,
        },
      });
  };
  openCardEdit = (boardId, groupId, cardId) => {
    this.props.history.push(`/board/${boardId}/${groupId}/${cardId}`);
  };
  updateBoard = (action) => {
    console.log('action in board details', action)
    this.props.onUpdateBoard(action, this.props.board);
  };
  toggleCardLabelList = (event) => {
    console.log('toggling')
    event.stopPropagation();
    this.setState({ isCardLabelListOpen: !this.state.isCardLabelListOpen });
  };
  render() {
    const { board } = this.props;
    const {isCardLabelListOpen}=this.state;
    if (Object.keys(board).length === 0) return <div>Loading...</div>;
    const { boardStyle } = this.state;
    return (
      <div className='board-details' style={boardStyle}>
        <BoardHeader />
        <GroupList
          groups={board.groups}
          openCardEdit={this.openCardEdit}
          updateBoard={this.updateBoard}
          toggleCardLabelList={this.toggleCardLabelList}
          isCardLabelListOpen={isCardLabelListOpen}
        />
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
  onUpdateBoard,
};

export const BoardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardDetails);
