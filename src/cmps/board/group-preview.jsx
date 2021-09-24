import React, { Component } from 'react';

import { BsThreeDots } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { CardPreview } from './card-preview.jsx';

import {AddBoardItem} from '../shared/add-board-item.jsx'

export class GroupPreview extends Component {
  state = {
    isAddPopOpen: false,
  };

  onToggleAddPop = () => {
    this.setState({isAddPopOpen: !this.state.isAddPopOpen})  
  };

  render() {
    const { group } = this.props;
    const { isAddPopOpen } = this.state;
    return (
      <div className='group-preview'>
        <div className='group-header flex space-between align-center'>
          <p>{group.title}</p>
          <button>
            <BsThreeDots />
          </button>
        </div>
        {group.cards && (
          <ul className='card-list clean-list'>
            {group.cards.map((card) => {
              return <CardPreview key={card.id} card={card} />;
            })}
          </ul>
        )}
        <div className='group-footer flex space-between align-center'>
          {!isAddPopOpen && (
            <button className="add-boarditem-btn" onClick={this.onToggleAddPop}>
              <AiOutlinePlus />
              <span>Add a card</span>
            </button>
          )}
          {isAddPopOpen && (
            <AddBoardItem onToggleAddPop={this.onToggleAddPop} type={'card'} groupId={group.id}/>
          )}
        </div>
      </div>
    );
  }
}
