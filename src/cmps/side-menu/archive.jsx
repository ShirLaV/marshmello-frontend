import React from 'react';
import { connect } from 'react-redux';

import { loadArchivedCards, onUpdateCard } from '../../store/board.actions.js';
import { Loader } from '../shared/loader.jsx';
import { CardPreviewContent } from '../board/card-preview-content.jsx';

class _Archive extends React.Component {
  state = {
    archivedCards: null,
  };
  componentDidMount() {
    this.loadArchivedCards();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.board !== this.props.board) {
      this.loadArchivedCards();
    }
  }
  loadArchivedCards = async () => {
    const boardId = this.props.board._id;
    const archivedCards = await this.props.loadArchivedCards(boardId);
    this.setState({ archivedCards });
  };
  onUnarchiveCard = (card) => {
    delete card.isArchive;
    this.props.onUpdateCard(card, card.groupId, this.props.board);
    const archivedCards = [...this.state.archivedCards];
    const cardIdx = archivedCards.findIndex(
      (currCard) => card.id === currCard.id
    );
    archivedCards.splice(cardIdx, 1);
    this.setState({ archivedCards });
  };
  render() {
    const { archivedCards } = this.state;
    const {
      isCardLabelListOpen,
      toggleCardLabelList,
      getLabel,
      toggleCardComplete,
      openCardEdit,
    } = this.props;
    return (
      <div className='archive'>
        {!archivedCards && <Loader />}
        {archivedCards && archivedCards.length === 0 && (
          <div>No archived cards...</div>
        )}
        {archivedCards && archivedCards.length > 0 && (
          <ul className='archived-cards-list clean-list flex column align-center'>
            {archivedCards.map((card, index) => {
              return (
                <li key={card.id}>
                  <CardPreviewContent
                    card={card}
                    groupId={card.groupId}
                    toggleCardLabelList={toggleCardLabelList}
                    isCardLabelListOpen={isCardLabelListOpen}
                    getLabel={getLabel}
                    toggleCardComplete={toggleCardComplete}
                    openCardEdit={openCardEdit}
                  />
                  <div className='archived-btns'>
                    <button onClick={() => this.onUnarchiveCard(card)}>
                      Send to board
                    </button>
                    <button>Delete</button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
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
  loadArchivedCards,
  onUpdateCard
};
export const Archive = connect(mapStateToProps, mapDispatchToProps)(_Archive);
