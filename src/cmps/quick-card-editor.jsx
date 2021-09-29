import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardHeader } from '../cmps/card-preview/card-header.jsx';
import { CardLabelBarList } from '../cmps/card-preview/card-label-bar-list.jsx';
import { CardFooter } from '../cmps/card-preview/card-footer.jsx';
import { cardEditService } from '../services/card-edit.service.js';
import { Loader } from './shared/loader.jsx';
import { onUpdateCard } from '../store/board.actions';

class _QuickCardEditor extends Component {
  state = {
    card: null,
    cardTitle: '',
  };
  componentDidMount() {
    const { cardId, groupId } = this.props;
    this.uploadCard(cardId, groupId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.board !== this.props.board) {
      const { cardId, groupId } = this.props;
      this.uploadCard(cardId, groupId);
    }
  }

  uploadCard = (cardId, groupId) => {
    const card = cardEditService.getCardById(cardId, groupId);
    this.setState({ card, cardTitle: card.title });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState((prevState) => ({ ...prevState, [name]: value }));
  };
  handleFocus = (event) => {
    event.target.select();
  };
  onSave = (event) => {
    const cardToSave = { ...this.state.card };
    cardToSave.title = this.state.cardTitle;
    this.props.onUpdateCard(cardToSave, this.props.groupId, this.props.board);
    this.props.onToggleQuickCardEditor(event, null, '')
  };

  render() {
    const { card, cardTitle } = this.state;
    const {
      groupId,
      getLabel,
      isCardLabelListOpen,
      toggleCardComplete,
      position,
    } = this.props;
    if (!card) return <Loader />;
    return (
      <div
        className='quick-card-editor'
        style={{
          position: 'fixed',
          top: position.top,
          left: position.left,
        }}
      >
        <div className='card-preview' style={{ width: position.width }}>
          {card.style && <CardHeader cardStyle={card.style} />}

          <div className='card-details'>
            {card.labelIds && (
              <div>
                <CardLabelBarList
                  labelIds={card.labelIds}
                  getLabel={getLabel}
                  isCardLabelListOpen={isCardLabelListOpen}
                />
              </div>
            )}

            <textarea
              className='clean-input'
              type='text'
              value={cardTitle}
              name='cardTitle'
              onChange={this.handleChange}
              autoFocus
              onFocus={this.handleFocus}
            />

            <CardFooter
              card={card}
              groupId={groupId}
              toggleCardComplete={toggleCardComplete}
            />
          </div>
        </div>
        <button onClick={this.onSave} className="card-edit-btn secondary">Save</button>
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
  onUpdateCard,
};

export const QuickCardEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(_QuickCardEditor);
