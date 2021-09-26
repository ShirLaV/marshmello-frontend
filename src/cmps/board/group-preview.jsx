import React, { Component } from 'react';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { BsThreeDots } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { CardPreview } from './card-preview.jsx';

import { AddBoardItem } from '../shared/add-board-item.jsx';

export class GroupPreview extends Component {
  state = {
    isAddPopOpen: false,
    groupTitle: '',
    draggedGroup: [],
  };

  componentDidMount() {
    this.setState({ ...this.state, groupTitle: this.props.group.title, draggedGroup: this.props.group });
  }

  onToggleAddPop = () => {
    this.setState({ isAddPopOpen: !this.state.isAddPopOpen });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState((prevState) => ({ ...prevState, [name]: value }));
  };

  onChangeGroupTitle = () => {
    const group = this.props.group;
    group.title = this.state.groupTitle;
    const action = { type: 'UPDATE_GROUP', group };
    this.props.updateBoard(action);
  };

  handleFocus = (event) => event.target.select();

  handleOnDragEnd = (result) => {
    const items = Array.from(this.state.draggedGroup.cards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    const group={...this.state.draggedGroup, cards: items}
    const action = {type: 'UPDATE_GROUP', group}
    this.props.updateBoard(action)
    this.setState((prevState)=>({...prevState, draggedGroup: group}))
  };

  render() {
    const {
      provided,
      innerRef,
      group,
      openCardEdit,
      toggleCardLabelList,
      isCardLabelListOpen,
    } = this.props;
    const { isAddPopOpen, groupTitle, draggedGroup } = this.state;
    return (
      <div
        className='group-preview'
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={innerRef}
      >
        <div className='group-header flex space-between align-center'>
          <input
            className='clean-input'
            type='text'
            value={groupTitle}
            name='groupTitle'
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            onBlur={this.onChangeGroupTitle}
          />
          <button>
            <BsThreeDots />
          </button>
        </div>
        {draggedGroup.cards && (
          <DragDropContext onDragEnd={this.handleOnDragEnd}>
            <Droppable droppableId='card-list'>
              {(provided) => (
                <ul
                  className='card-list clean-list'
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {draggedGroup.cards.map((card, index) => {
                    return (
                      <Draggable
                        key={card.id}
                        draggableId={card.id}
                        index={index}
                      >
                        {(provided) => (
                          <CardPreview
                            innerRef={provided.innerRef}
                            provided={provided}
                            card={card}
                            groupId={group.id}
                            openCardEdit={openCardEdit}
                            toggleCardLabelList={toggleCardLabelList}
                            isCardLabelListOpen={isCardLabelListOpen}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        )}
        <div className='group-footer flex space-between align-center'>
          {!isAddPopOpen && (
            <button
              className='add-boarditem-btn flex align-center'
              onClick={this.onToggleAddPop}
            >
              <i className='flex align-center'>
                <AiOutlinePlus />
              </i>
              <span>Add a card</span>
            </button>
          )}
          {isAddPopOpen && (
            <AddBoardItem
              onToggleAddPop={this.onToggleAddPop}
              type={'card'}
              groupId={group.id}
            />
          )}
        </div>
      </div>
    );
  }
}
