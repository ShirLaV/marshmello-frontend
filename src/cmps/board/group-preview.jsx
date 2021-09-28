import React, { Component } from 'react';

import { Draggable, Droppable } from 'react-beautiful-dnd';

import { BsThreeDots } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { CardPreview } from './card-preview.jsx';

import { GroupActions } from '../shared/popover-children/group-actions.jsx';
import { AddBoardItem } from '../shared/add-board-item.jsx';
import { DynamicPopover } from '../shared/dynamic-popover.jsx';

export class GroupPreview extends Component {
  state = {
    isAddPopOpen: false,
    groupTitle: '',
    isPopoverOpen: false,
  };

  groupEditRef = React.createRef();

  componentDidMount() {
    this.setState({
      ...this.state,
      groupTitle: this.props.group.title,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.group !== this.props.group) {
      this.setState({
        ...this.state,
        groupTitle: this.props.group.title,
      });
    }
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

  render() {
    const {
      group,
      openCardEdit,
      toggleCardLabelList,
      isCardLabelListOpen,
      index,
      toggleCardComplete,
      toggleGroupArchive,
      onToggleAddPop
    } = this.props;
    const { isAddPopOpen, groupTitle, isPopoverOpen } = this.state;
    // console.log('groupTitle', groupTitle)
    return (
      <div className='group-wrapper'>
        <Draggable draggableId={group.id} index={index}>
          {(provided, snapshot) => (
            <div
              className='group-preview flex column'
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              // style={{
              //   transform: snapshot.isDragging ? 'rotate(45deg)' : 'rotate(0deg)',
              // }}
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

                <div
                  className='relative'
                  ref={this.groupEditRef}
                  onClick={() =>
                    this.setState({ isPopoverOpen: !isPopoverOpen })
                  }
                >
                  <button>
                    <BsThreeDots />
                  </button>
                  {isPopoverOpen && (
                    <DynamicPopover
                      onClose={() => this.setState({ isPopoverOpen: false })}
                      ref={this.groupEditRef}
                      title='List actions'
                    >
                      <GroupActions groupId={group.id} onToggleAddPop={onToggleAddPop} toggleGroupArchive={toggleGroupArchive}/>
                    </DynamicPopover>
                  )}
                </div>
              </div>
              <Droppable droppableId={group.id}>
                {(provided) => (
                  <ul
                    className='card-list clean-list'
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {group.cards &&
                      group.cards.map((card, index) => {
                        return (
                          <CardPreview
                            key={card.id}
                            card={card}
                            index={index}
                            groupId={group.id}
                            openCardEdit={openCardEdit}
                            toggleCardLabelList={toggleCardLabelList}
                            isCardLabelListOpen={isCardLabelListOpen}
                            toggleCardComplete={toggleCardComplete}
                          />
                        );
                      })}
                    {provided.placeholder}
                    {isAddPopOpen && (
                      <AddBoardItem
                        onToggleAddPop={this.onToggleAddPop}
                        type={'card'}
                        groupId={group.id}
                      />
                    )}
                  </ul>
                )}
              </Droppable>

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
              </div>
            </div>
          )}
        </Draggable>
      </div>
    );
  }
}
