import React, { Component } from 'react';
import { connect } from 'react-redux';

import { HiOutlinePencil } from 'react-icons/hi';
import {GrTextAlignFull} from 'react-icons/gr'

class _CardPreview extends Component {
  state = {
    isCardLabelListOpen: false,
  };

  toggleCardLabelList = () => {
    this.setState({ isCardLabelListOpen: !this.state.isCardLabelListOpen });
  };

  getLabel = (labelId) => {
    const board = this.props.board;
    const label=board.labels.find(label=> label.id===labelId)
    return label
  };

  render() {
    const { card, groupId } = this.props;
    const {isCardLabelListOpen} =this.state
    const backgroundColor = card.style
      ? card.style.bgColor
        ? { backgroundColor: card.style.bgColor }
        : {}
      : {};
    return (
      <div className='card-preview flex space-between'>
        {card.style && (
          <div className='card-preview-header' style={backgroundColor}></div>
        )}
        {card.labelIds && (
          <ul onClick={this.toggleCardLabelList} className={`label-bar-list flex clean-list ${isCardLabelListOpen ? "open" : "close"}`}>
            {card.labelIds.map((labelId) => {
              const label = this.getLabel(labelId);
              return (
                <li className="label-bar" key={labelId} style={{ backgroundColor: label.color }}>
                  {isCardLabelListOpen && <span>{label.title}</span>}
                </li>
              );
            })}
          </ul>
        )}
        <p>{card.title}</p>
        {card.description && <GrTextAlignFull title={"This card has a description"}/>}
        <button className='hover-edit-btn'>
          <HiOutlinePencil />
        </button>
        <div className='card-preview-footer'></div>
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
};

export const CardPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CardPreview);
