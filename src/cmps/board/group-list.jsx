import React, { Component } from 'react';

import { AiOutlinePlus } from 'react-icons/ai';

import { GroupPreview } from './group-preview.jsx';
import { AddBoardItem } from '../shared/add-board-item.jsx';

export class GroupList extends Component {
  state = {
    isAddPopOpen: false,
  };

  onToggleAddPop = () => {
    this.setState({isAddPopOpen: !this.state.isAddPopOpen})  
  };

  render() {
    const {groups} = this.props
    const {isAddPopOpen}=this.state
    return (
      <section className='group-list-container flex'>
        {groups && (
          <ul className='group-list clean-list flex'>
            {groups.map((group) => {
              return <GroupPreview key={group.id} group={group} />;
            })}
          </ul>
        )}
        <div className="add-group-container">

        {!isAddPopOpen && (
          <button className='add-boarditem-btn' onClick={this.onToggleAddPop}>
            <AiOutlinePlus />
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
      </section>
    );
  }
}
