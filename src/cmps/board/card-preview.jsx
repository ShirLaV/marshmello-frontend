import React, { Component } from 'react';
import { connect } from 'react-redux';

import { HiOutlinePencil } from 'react-icons/hi';
import { GrTextAlignFull } from 'react-icons/gr';
import { GrCheckbox } from 'react-icons/gr';
import { GrCheckboxSelected } from 'react-icons/gr';
import { FiClock } from 'react-icons/fi';

import { onUpdateCard } from '../../store/board.actions.js';
import { MemberAvatar } from '../shared/member-avatar.jsx';

class _CardPreview extends Component {
  state = {
    isCardLabelListOpen: false,
  };

  toggleCardLabelList = (event) => {
    event.stopPropagation();
    this.setState({ isCardLabelListOpen: !this.state.isCardLabelListOpen });
  };

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
    else if (card.dueDate - Date.now() < Date.now() * 60 * 60 * 24)
      return { backgroundColor: '#EB5A46' };
    //overdue
    else if (card.dueDate - Date.now() < 0)
      return { backgroundColor: '#F2D600' };
    //none of the above
    return { backgroundColor: 'inherit' };
  };

  toggleCardComplete = (ev, boardId, groupId, cardId) => {
    ev.stopPropagation();
    this.props.onUpdateCard(
      { boardId, groupId, cardId, isComplete: !this.props.card.isComplete },
      'isComplete',
      this.props.board
    );
  };

  render() {
    const { board, card, groupId, openCardEdit } = this.props;
    const { isCardLabelListOpen } = this.state;
    const backgroundColor = card.style
      ? card.style.bgColor
        ? { backgroundColor: card.style.bgColor }
        : {}
      : {};
    return (
      <div
        className='card-preview flex space-between'
        onClick={() => openCardEdit(board._id, groupId, card.id)}
      >
        {card.style && (
          <div className='card-preview-header' style={backgroundColor}></div>
        )}
        {card.labelIds && (
          <ul
            onClick={this.toggleCardLabelList}
            className={`label-bar-list flex clean-list ${
              isCardLabelListOpen ? 'open' : 'close'
            }`}
          >
            {card.labelIds.map((labelId) => {
              const label = this.getLabel(labelId);
              return (
                <li
                  className='label-bar'
                  key={labelId}
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
                this.toggleCardComplete(event, board._id, groupId, card.id)
              }
            >
              <span className='clock-icon flex align-center'>
                <FiClock />
              </span>
              <span className='check-icon'>
                {card.isComplete ? <GrCheckboxSelected /> : <GrCheckbox />}
              </span>
              <span>{this.getFormatedTime(card.dueDate)}</span>
            </div>
          )}

          {card.description && (
            <GrTextAlignFull title={'This card has a description'} />
          )}
          {card.members && (
            <div className='card-members-list flex'>
              {card.members.map((member) => (
                <MemberAvatar member={member} size={'md'} key={member.id} />
              ))}
            </div>
          )}
        </div>
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
  // loadBoard,
  onUpdateCard,
};

export const CardPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CardPreview);
