import React from 'react';
import { connect } from 'react-redux';

import { onUpdateBoard, onUpdateCard, onAddCard } from '../../store/board.actions.js';

import { GrClose } from 'react-icons/gr';
import { utilService } from '../../services/util.service';

class _AddBoardItem extends React.Component {
  state = {
    newItem: {
      title: '',
    },
  };

  async componentDidMount() {
    this.textInput.focus();
  }

  handleChange = (ev) => {
    const { target } = ev;
    let newItem = this.state.newItem;
    newItem[target.name] = target.value;
    this.setState({ newItem });
  };

  onAddItem = (ev) => {
    ev.preventDefault();
    const { newItem } = this.state;
    newItem.id = utilService.makeId();
    if (this.props.type === 'group') {
      const action = { type: 'ADD_GROUP', group: newItem };
      this.props.onUpdateBoard(action, this.props.board);
    }
    else if (this.props.type === 'card') {
      const newCard = newItem;
      this.props.onAddCard( newCard, this.props.groupId, this.props.board);
    }
    this.setState({newItem: {title: ''}})
  };

  render() {
    const { title } = this.state.newItem;
    const { onToggleAddPop } = this.props;
    const renderedType = this.props.type === 'card' ? this.props.type : 'list';
    return (
      <section className='add-board-item'>
        <form onSubmit={this.onAddItem}>
          <textarea
            placeholder={`Enter a title for this ${renderedType}`}
            ref={(input) => {
              this.textInput = input;
            }}
            value={title}
            name='title'
            onChange={this.handleChange}
          />
          <div className='form-btns flex align-center'>
            <button type='submit'>Add {renderedType}</button>
            <button onClick={onToggleAddPop} className="flex align-center">
              <GrClose />
            </button>
          </div>
        </form>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.currBoard,
  };
}

const mapDispatchToProps = {
  onUpdateBoard,
  onUpdateCard,
  onAddCard
};

export const AddBoardItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AddBoardItem);
