import React, { Component } from 'react';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { AiOutlinePlus } from 'react-icons/ai';

import { GroupPreview } from './group-preview.jsx';
import { AddBoardItem } from '../shared/add-board-item.jsx';

export class GroupList extends Component {
  state = {
    isAddPopOpen: false,
  };

  onToggleAddPop = () => {
    this.setState({ isAddPopOpen: !this.state.isAddPopOpen });
  };

  render() {
    // const [draggedGroups, updateGroups] = useState(finalSpaceCharacters)
    const {
      groups,
      openCardEdit,
      updateBoard,
      toggleCardLabelList,
      isCardLabelListOpen,
    } = this.props;
    const { isAddPopOpen } = this.state;
    return (
      <section className='group-list-container flex'>
        <div className='group-list-wrapper flex'>
          {groups && (
            <DragDropContext>
              <Droppable droppableId='group-list'>
                {(provided) => (
                  <ul
                    className='group-list clean-list flex'
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {groups.map((group, index) => {
                      return (
                        <Draggable
                          key={group.id}
                          draggableId={group.id}
                          index={index}
                        >
                          {(provided) => (
                            <GroupPreview
                              innerRef={provided.innerRef}
                              provided={provided}
                              group={group}
                              openCardEdit={openCardEdit}
                              updateBoard={updateBoard}
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
      </section>
    );
  }
}
