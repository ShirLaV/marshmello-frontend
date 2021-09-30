import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { AiOutlinePlus } from 'react-icons/ai';

import {
  loadBoard,
  onUpdateBoard,
  onUpdateCard,
  resetBoard,
} from '../store/board.actions.js';

import { CardEdit } from '../cmps/card-edit.jsx';
import { AddBoardItem } from '../cmps/shared/add-board-item.jsx';
import { GroupList } from '../cmps/board/group-list.jsx';
import { BoardHeader } from '../cmps/board/board-header.jsx';
import { OverlayScreen } from '../cmps/overlay-screen.jsx';
import { QuickCardEditor } from '../cmps/quick-card-editor.jsx';
import { Loader } from '../cmps/shared/loader.jsx';
import { activityTxtMap } from '../services/activity.service.js';

class _BoardDetails extends Component {
  state = {
    isCardLabelListOpen: false,
    isAddPopOpen: false,
    quickCardEditor: {
      cardToEdit: null,
      groupId: '',
      position: {}
    },
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
  onToggleQuickCardEditor = (event, card, groupId) => {
    event.stopPropagation();
    const parentElement = event.currentTarget.parentNode;
    var position = parentElement.getBoundingClientRect();
    this.setState({ quickCardEditor: { cardToEdit: card, groupId, position } });
  };
  toggleCardComplete = (ev, groupId, card) => {
    ev.stopPropagation();
    const cardToUpdate = { ...card };
    cardToUpdate.isComplete = !card.isComplete;
    const activity = (cardToUpdate.isComplete) ? {txt: activityTxtMap.completeCard(), card: cardToUpdate, groupId: groupId} : {txt: activityTxtMap.unCompleteCard(), card: cardToUpdate, groupId: groupId}
    this.props.onUpdateCard(cardToUpdate, groupId, this.props.board, activity);
  };
  getLabel = (labelId) => {
    const label = this.props.board.labels.find((label) => label.id === labelId);
    return label;
  };
  handleOnDragEnd = (result) => {
    const { destination, source, type } = result;
    if (!destination) return;
    const boardToChange = { ...this.props.board };
    //group dragged -
    if (type === 'group') {
      const draggedGroup = boardToChange.groups.splice(source.index, 1);
      boardToChange.groups.splice(destination.index, 0, ...draggedGroup);
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
      if (destinationGroup.cards)
        destinationGroup.cards.splice(destination.index, 0, ...card);
      else destinationGroup.cards = [card];
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
    const activity = { txt: activityTxtMap.archiveList(groupToUpdate.title) }
    const action = { type: 'UPDATE_GROUP', group: groupToUpdate };
    this.props.onUpdateBoard(action, this.props.board, activity);
  };

  render() {
    const { board } = this.props;
    const { isCardLabelListOpen, isAddPopOpen, quickCardEditor } = this.state;
    if (!board) return <Loader />;
    return (
      <div className='board-details flex column'>
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
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className='flex'
                  >
                    {board.groups && (
                      <GroupList
                        groups={board.groups}
                        openCardEdit={this.openCardEdit}
                        updateBoard={this.updateBoard}
                        toggleCardLabelList={this.toggleCardLabelList}
                        isCardLabelListOpen={isCardLabelListOpen}
                        toggleCardComplete={this.toggleCardComplete}
                        toggleGroupArchive={this.toggleGroupArchive}
                        onToggleQuickCardEditor={this.onToggleQuickCardEditor}
                        getLabel={this.getLabel}
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
            </div>
          </section>
        </DragDropContext>

        {quickCardEditor.cardToEdit && (
          <QuickCardEditor
            cardId={quickCardEditor.cardToEdit.id}
            groupId={quickCardEditor.groupId}
            position={quickCardEditor.position}
            getLabel={this.getLabel}
            toggleCardComplete={this.toggleCardComplete}
            isCardLabelListOpen={isCardLabelListOpen}
            onToggleQuickCardEditor={this.onToggleQuickCardEditor}
            openCardEdit={this.openCardEdit}
          />
        )}
        {quickCardEditor.cardToEdit && (
          <div
            onClick={(event) => this.onToggleQuickCardEditor(event, null, '')}
          >
            <OverlayScreen />
          </div>
        )}
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
