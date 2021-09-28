import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AiOutlinePlus } from 'react-icons/ai';

import { CardEdit } from '../cmps/card-edit.jsx';
import { AddBoardItem } from '../cmps/shared/add-board-item.jsx';
import { GroupList } from '../cmps/board/group-list.jsx';
import { BoardHeader } from '../cmps/board/board-header.jsx';
import {
  loadBoard,
  onUpdateBoard,
  onUpdateCard,
  resetBoard,
} from '../store/board.actions.js';
import { Route } from 'react-router';
import { Loader } from '../cmps/shared/loader.jsx';

class _BoardDetails extends Component {
  state = {
    isCardLabelListOpen: false,
    isAddPopOpen: false,
  };
  componentDidMount() {
    const { boardId } = this.props.match.params;
    this.loadBoard(boardId);
  }
  componentWillUnmount() {
    this.props.resetBoard();
  }
  loadBoard = (boardId) => {
    this.props.loadBoard(boardId);
  };
  openCardEdit = (groupId, cardId) => {
    this.props.history.push(`${this.props.board._id}/${groupId}/${cardId}`);
  };
  updateBoard = (action) => {
    this.props.onUpdateBoard(action, this.props.board);
  };
  toggleCardLabelList = (event) => {
    event.stopPropagation();
    this.setState({ isCardLabelListOpen: !this.state.isCardLabelListOpen });
  };

  toggleCardComplete = (ev, groupId, card) => {
    ev.stopPropagation();
    const cardToUpdate = { ...card };
    cardToUpdate.isComplete = !card.isComplete;
    this.props.onUpdateCard(cardToUpdate, groupId, this.props.board);
  };

  handleOnDragEnd = (result) => {
    const { destination, source, type } = result;
    if (!destination) return;
    const boardToChange = { ...this.props.board };
    //group dragged -
    if (type === 'group') {
      const draggedGroup = boardToChange.groups.splice(source.index, 1);
      console.log('draggedGroupd', draggedGroup);
      boardToChange.groups.splice(destination.index, 0, ...draggedGroup);
      // console.log('changed board', boardToChange)
      // console.log('original board', this.props.board)
      this.props.onUpdateBoard({ type: '' }, boardToChange);
      return;
    }
    const sourceGroup = {
      ...boardToChange.groups.find((group) => group.id === source.droppableId),
    };
    const card = sourceGroup.cards.splice(source.index, 1);
    //card dragged in the same group -
    if (source.droppableId === destination.droppableId) {
      sourceGroup.cards.splice(destination.index, 0, ...card);
      const action = { type: 'UPDATE_GROUP', group: sourceGroup };
      this.props.onUpdateBoard(action, boardToChange);
    }
    //card dragged to another group
    else {
      const destinationGroup = {
        ...boardToChange.groups.find(
          (group) => group.id === destination.droppableId
        ),
      };
      destinationGroup.cards.splice(destination.index, 0, ...card);
      boardToChange.groups = boardToChange.groups.map((currGroup) => {
        if (currGroup.id === source.droppableId) return sourceGroup;
        if (currGroup.id === destination.droppableId) return destinationGroup;
        return currGroup;
      });
      this.props.onUpdateBoard({ type: '' }, boardToChange);
    }
  };

  onToggleAddPop = () => {
    this.setState({ isAddPopOpen: !this.state.isAddPopOpen });
  };

  toggleGroupArchive = (groupId) => {
    const groupToUpdate = {
      ...this.props.board.groups.find((group) => groupId === group.id),
    };
    groupToUpdate.isArchive = groupToUpdate.isArchive
      ? !groupToUpdate.isArchive
      : true;
    const action = { type: 'UPDATE_GROUP', group: groupToUpdate };
    this.props.onUpdateBoard(action, this.props.board);
  };

  render() {
    const { board } = this.props;
    const { isCardLabelListOpen, isAddPopOpen, boardStyle, openedCardEdit } =
      this.state;
    if (!board) return <Loader />
    return (
      <div className='board-details flex column'>
        {/* <div className='board-details' style={boardStyle}> */}
        <Route path='/board/:boardId/:groupId/:cardId' component={CardEdit} />
        <BoardHeader />
        <DragDropContext onDragEnd={this.handleOnDragEnd}>
          <section className='group-list-container flex'>
            <div className='group-list-wrapper flex'>
              <Droppable
                droppableId={board._id}
                direction='horizontal'
                type='group'
              >
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="flex">
                    {board.groups && (
                      <GroupList
                        groups={board.groups}
                        openCardEdit={this.openCardEdit}
                        updateBoard={this.updateBoard}
                        toggleCardLabelList={this.toggleCardLabelList}
                        isCardLabelListOpen={isCardLabelListOpen}
                        toggleCardComplete={this.toggleCardComplete}
                        toggleGroupArchive={this.toggleGroupArchive}
                      />
                    )}
                    {provided.placeholder}
                    
              <div className='add-group-container'>
                {!isAddPopOpen && (
                  <button
                    className='add-boarditem-btn flex align-center'
                    onClick={this.onToggleAddPop}
                  >
                    <i className='flex align-center'>
                      <AiOutlinePlus />
                    </i>
                    <span>Add a list</span>
                  </button>
                )}
                {isAddPopOpen && (
                  <AddBoardItem
                    onToggleAddPop={this.onToggleAddPop}
                    type={'group'}
                  />
                )}
              </div>
                  </div>
                )}
              </Droppable>
{/* 
              <div className='add-group-container'>
                {!isAddPopOpen && (
                  <button
                    className='add-boarditem-btn flex align-center'
                    onClick={this.onToggleAddPop}
                  >
                    <i className='flex align-center'>
                      <AiOutlinePlus />
                    </i>
                    <span>Add a list</span>
                  </button>
                )}
                {isAddPopOpen && (
                  <AddBoardItem
                    onToggleAddPop={this.onToggleAddPop}
                    type={'group'}
                  />
                )}
              </div> */}
            </div>
          </section>
        </DragDropContext>
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
  onUpdateCard,
  resetBoard,
};

export const BoardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BoardDetails);
