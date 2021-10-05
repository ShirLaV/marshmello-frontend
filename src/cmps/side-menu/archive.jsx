import React from 'react';
import { connect } from 'react-redux';

import { loadArchivedCards } from '../../store/board.actions.js';
import { Loader } from '../shared/loader.jsx';
import { CardPreviewContent } from '../board/card-preview-content.jsx';

class _Archive extends React.Component {
  state = {
    archivedCards: null,
  };
  componentDidMount() {
    this.loadArchivedCards();
  }
  loadArchivedCards = async () => {
    const boardId = this.props.board._id;
    const archivedCards = await this.props.loadArchivedCards(boardId);
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
                    <button>Send to board</button>
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
    filterBy: state.boardModule.filterBy,
  };
}
const mapDispatchToProps = {
  loadArchivedCards,
};
export const Archive = connect(mapStateToProps, mapDispatchToProps)(_Archive);
