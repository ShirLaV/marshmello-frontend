import React, { Component } from 'react';

import { BsThreeDots } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { CardPreview } from './card-preview.jsx';

import { AddBoardItem } from '../shared/add-board-item.jsx';

export class GroupPreview extends Component {
  state = {
    isAddPopOpen: false,
  };

  onToggleAddPop = () => {
    this.setState({ isAddPopOpen: !this.state.isAddPopOpen });
  };

  render() {
    const { group, openCardEdit } = this.props;
    const { isAddPopOpen } = this.state;
    return (
      <div className='group-preview'>
        <div className='group-header flex space-between align-center'>
          <h4>{group.title}</h4>
          <button>
            <BsThreeDots />
          </button>
        </div>
        {group.cards && (
          <ul className='card-list clean-list'>
            {group.cards.map((card) => {
              return (
                <CardPreview
                  key={card.id}
                  card={card}
                  groupId={group.id}
                  openCardEdit={openCardEdit}
                />
              );
            })}
          </ul>
        )}
        <div className='group-footer flex space-between align-center'>
          {!isAddPopOpen && (
            <button className='add-boarditem-btn flex align-center' onClick={this.onToggleAddPop}>
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
