import React, { Component } from 'react';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


import { GroupPreview } from './group-preview.jsx';

export class GroupList extends Component {


  // handleOnDragEnd = (result, groups,  ) => {
  //   const {sourse, destination} = result;
  //   console.log('result', result)
  //   if(!destination) return;
  //   const items = Array.from(this.state.draggedGroup.cards);
  //   // const [reorderedItem] = items.splice(result.source.index, 1);
  //   // items.splice(result.destination.index, 0, reorderedItem);
  //   // const group = { ...this.state.draggedGroup, cards: items };
  //   // const action = { type: 'UPDATE_GROUP', group };
  //   // this.props.updateBoard(action);
  //   // this.setState((prevState) => ({ ...prevState, draggedGroup: group }));
  // };

  render() {
    // const [draggedGroups, updateGroups] = useState(finalSpaceCharacters)
    const {
      groups,
      openCardEdit,
      updateBoard,
      toggleCardLabelList,
      isCardLabelListOpen,
    } = this.props;
    // const { isAddPopOpen } = this.state;
    return (
      <ul className='group-list clean-list flex'>
        {groups.map((group, index) => {
          return (
            <GroupPreview
              key={group.id}
              index={index}
              group={group}
              openCardEdit={openCardEdit}
              updateBoard={updateBoard}
              toggleCardLabelList={toggleCardLabelList}
              isCardLabelListOpen={isCardLabelListOpen}
            />
          );
        })}
      </ul>
    );
  }
}
