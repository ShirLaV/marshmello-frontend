import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardHeader } from '../cmps/card-preview/card-header.jsx';
import { CardLabelBarList } from '../cmps/card-preview/card-label-bar-list.jsx';
import { CardFooter } from '../cmps/card-preview/card-footer.jsx';
import { cardEditService } from '../services/card-edit.service.js';
import { Loader } from './shared/loader.jsx';

class _QuickCardEditor extends Component {
  state = {
    card: null,
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
    this.setState({ card });
  };

  render() {
    const { card } = this.state;
    const {
      cardId,
      groupId,
      getLabel,
      isCardLabelListOpen,
      toggleCardComplete,
    } = this.props;
    if (!card) return <Loader />;
    return (
      <div className='quick-card-editor'>
        <div className='card-preview'>
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

            <p>{card.title}</p>

            <CardFooter
              card={card}
              groupId={groupId}
              toggleCardComplete={toggleCardComplete}
            />
          </div>
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

export const QuickCardEditor = connect(mapStateToProps)(_QuickCardEditor);
