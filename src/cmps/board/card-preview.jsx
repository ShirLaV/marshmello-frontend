import { connect } from 'react-redux';

import { Draggable } from 'react-beautiful-dnd';

import { HiOutlinePencil } from 'react-icons/hi';

import { CardHeader } from '../card-preview/card-header.jsx';
import { CardLabelBarList } from '../card-preview/card-label-bar-list.jsx';
import { CardFooter } from '../card-preview/card-footer.jsx';

function _CardPreview({
  card,
  groupId,
  openCardEdit,
  isCardLabelListOpen,
  toggleCardLabelList,
  toggleCardComplete,
  onToggleQuickCardEditor,
  index,
  getLabel,
}) {
  return (
    <div
    className='card-wrapper'
      style={{ display: card.isArchive ? 'none' : 'unset' }}
    >
      <Draggable draggableId={card.id} index={index}>
        {(provided) => {
          return (
            <li
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
            >
              <div
                className='card-preview flex space-between'
                
                onClick={() => openCardEdit(groupId, card.id)}
              >
                <button
                  className='hover-edit-btn'
                  onClick={(event) =>
                    onToggleQuickCardEditor(event, card, groupId)
                  }
                >
                  <HiOutlinePencil />
                </button>

                {card.style && <CardHeader cardStyle={card.style} />}

                <div className='card-details'>
                  {card.labelIds && (
                    <div onClick={toggleCardLabelList}>
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
            </li>
          );
        }}
      </Draggable>
      </div>
  );
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.currBoard,
  };
}

export const CardPreview = connect(mapStateToProps)(_CardPreview);
