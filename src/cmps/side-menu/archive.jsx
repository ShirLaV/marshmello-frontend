import React from 'react';
import { connect } from 'react-redux';

import { loadArchivedCards, onUpdateCard, onRemoveCard, onUnArchiveCard } from '../../store/board.actions.js';
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
    if (prevProps.board.archivedCards !== this.props.board.archivedCards) {
      this.loadArchivedCards();
    }
  }
  loadArchivedCards =  () => {
    const {board} =this.props
    const archivedCards = board.archivedCards ? board.archivedCards : [];
    this.setState({ archivedCards });
  };
  // loadArchivedCards = async () => {
  //   const boardId = this.props.board._id;
  //   const archivedCards = await this.props.loadArchivedCards(boardId);
  //   this.setState({ archivedCards });
  // };
  onUnarchiveCard = (card) => {
    this.props.onUnArchiveCard(card, this.props.board);
  };
  onDeleteCard=(card)=>{
    this.props.onRemoveCard(card, this.props.board)
  }
  render() {
    const { archivedCards } = this.state;
    const {
      isCardLabelListOpen,
      toggleCardLabelList,
      getLabel,
      toggleCardComplete,
      openCardEdit,
    } = this.props;
    console.log('archivedCards in archive page', archivedCards)
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
                    <button onClick={()=>this.onDeleteCard(card)}>Delete</button>
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
  onUpdateCard,
  onRemoveCard,
  onUnArchiveCard
};
export const Archive = connect(mapStateToProps, mapDispatchToProps)(_Archive);
