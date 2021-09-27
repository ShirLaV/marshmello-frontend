import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Draggable } from 'react-beautiful-dnd';

import { HiOutlinePencil } from 'react-icons/hi';
import { GrTextAlignFull } from 'react-icons/gr';
import { GrCheckbox } from 'react-icons/gr';
import { GrCheckboxSelected } from 'react-icons/gr';
import { FiClock } from 'react-icons/fi';
import { BsCheckBox } from 'react-icons/bs';

import { onUpdateCard } from '../../store/board.actions.js';
import { MemberAvatar } from '../shared/member-avatar.jsx';

class _CardPreview extends Component {
  getLabel = (labelId) => {
    const board = this.props.board;
    const label = board.labels.find((label) => label.id === labelId);
    return label;
  };

  getFormatedTime = (dueDate) => {
    const date = new Date(dueDate);
    const day = date.getDay();
    const month = date.toLocaleString('en', { month: 'short' });
    const formatedTime = month + ' ' + day;
    return formatedTime;
  };

  getDueTimeStyle = (card) => {
    //complete
    if (card.isComplete) return { backgroundColor: '#61BD4F' };
    //due soon
    else if (card.dueDate - Date.now() < 1000 * 60 * 60 * 24)
      return { backgroundColor: '#F2D600' };
    //overdue
    else if (card.dueDate - Date.now() < 0)
      return { backgroundColor: '#EB5A46' };
    //none of the above
    return { backgroundColor: 'inherit', color: 'unset' };
  };

  toggleCardComplete = (ev, boardId, groupId, cardId) => {
    ev.stopPropagation();
    this.props.onUpdateCard(
      { boardId, groupId, cardId, isComplete: !this.props.card.isComplete },
      'isComplete',
      this.props.board
    );
  };

  getChecklistStr = (checklists) => {
    let todosCount = 0;
    let doneTodosCount = 0;
    checklists.forEach((checklist) => {
      checklist.todos.forEach((todo) => {
        todosCount++;
        if (todo.isDone) doneTodosCount++;
      });
    });
    return doneTodosCount + '/' + todosCount;
  };

  render() {
    const {
      board,
      card,
      groupId,
      openCardEdit,
      isCardLabelListOpen,
      toggleCardLabelList,
      index,
    } = this.props;
    return (
      <Draggable draggableId={card.id} index={index}>
        {(provided) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
            >
              <div
                className='card-preview flex space-between'
                onClick={() => openCardEdit(board._id, groupId, card.id)}
              >
                {card.style && (
                  <div className='card-preview-header'>
                    {card.style.bgColor && (
                      <div
                        className='header-color'
                        style={{ backgroundColor: card.style.bgColor }}
                      ></div>
                    )}
                    {card.style.imgUrl && <img src={card.style.imgUrl} />}
                  </div>
                )}

                <div className='card-details'>
                  {card.labelIds && (
                    <ul
                      onClick={toggleCardLabelList}
                      className={`label-bar-list flex clean-list ${
                        isCardLabelListOpen ? 'open' : 'close'
                      }`}
                    >
                      {card.labelIds.map((labelId, index) => {
                        const label = this.getLabel(labelId);
                        return (
                          <li
                            className='label-bar'
                            key={index}
                            style={{ backgroundColor: label.color }}
                          >
                            {isCardLabelListOpen && label.title && (
                              <span>{label.title}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  <p>{card.title}</p>

                  <button className='hover-edit-btn'>
                    <HiOutlinePencil />
                  </button>

                  <div className='card-preview-footer flex align-center'>
                    {card.dueDate && (
                      <div
                        className='due-date-box flex align-center'
                        style={this.getDueTimeStyle(card)}
                        onClick={(event) =>
                          this.toggleCardComplete(
                            event,
                            board._id,
                            groupId,
                            card.id
                          )
                        }
                      >
                        <span className='clock-icon flex align-center'>
                          <FiClock />
                        </span>
                        <span className='check-icon'>
                          {card.isComplete ? (
                            <GrCheckboxSelected color={'inherit'} />
                          ) : (
                            <GrCheckbox />
                          )}
                        </span>
                        <span>{this.getFormatedTime(card.dueDate)}</span>
                      </div>
                    )}

                    {card.description && (
                      <GrTextAlignFull title={'This card has a description'} />
                    )}

                    {card.checklists && (
                      <div className='checklist-box flex align-center'>
                        <BsCheckBox />
                        <span>{this.getChecklistStr(card.checklists)}</span>
                      </div>
                    )}

                    {card.members && (
                      <div className='card-members-list flex'>
                        {card.members.map((member, index) => (
                          <MemberAvatar
                            member={member}
                            size={'md'}
                            key={index}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Draggable>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.currBoard,
  };
}
const mapDispatchToProps = {
  // loadBoard,
  onUpdateCard,
};

export const CardPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CardPreview);
