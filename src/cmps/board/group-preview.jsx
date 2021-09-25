import React, { Component } from 'react';

import { BsThreeDots } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { CardPreview } from './card-preview.jsx';

import { AddBoardItem } from '../shared/add-board-item.jsx';

export class GroupPreview extends Component {
  state = {
    isAddPopOpen: false,
    groupTitle: '',
  };

  componentDidMount() {
    this.setState({ ...this.state, groupTitle: this.props.group.title });
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
    const { group, openCardEdit ,toggleCardLabelList, isCardLabelListOpen} = this.props;
    const { isAddPopOpen, groupTitle } = this.state;
    return (
      <div className='group-preview'>
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
        {group.cards && (
          <ul className='card-list clean-list'>
            {group.cards.map((card) => {
              return (
                <CardPreview
                  key={card.id}
                  card={card}
                  groupId={group.id}
                  openCardEdit={openCardEdit}
                  toggleCardLabelList={toggleCardLabelList}
                  isCardLabelListOpen={isCardLabelListOpen}

                />
              );
            })}
          </ul>
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
