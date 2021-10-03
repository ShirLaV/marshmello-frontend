import React, { Component } from 'react';
import { connect } from 'react-redux';

class _LabelEdit extends Component {
  state = {
    newLabel: {
      name: '',
    },
  };
  componentDidMount() {
    this.loadLabel();
  }
  loadLabel = () => {
    if (this.props.label) {
      this.setState({ newLabel: { name: label.name } });
    }
  };
  handleChange = ({ target: { name, value } }) => {
    this.setState((prevState) => ({ ...prevState, [name]: value }));
  };
  render() {
    const { name } = this.state.newLabel;
    return (
      <div>
        <label id='name'>Name</label>
        <input
          className='clean-input'
          id='name'
          type='text'
          autoFocus
          value={name}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    board: state.boardModule.currBoard,
  };
};

export const LabelEdit = connect(mapStateToProps)(_LabelEdit);
