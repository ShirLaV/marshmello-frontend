import { connect } from 'react-redux';

import { Draggable } from 'react-beautiful-dnd';

import {CardPreviewContent} from './card-preview-content.jsx'

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
      onClick={() => openCardEdit(groupId, card.id)}
    >
      <Draggable draggableId={card.id} index={index}>
        {(provided) => {
          return (
            <li
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
            >
              <CardPreviewContent 
                card={card}
                groupId={groupId}
                openCardEdit={openCardEdit}
                isCardLabelListOpen={isCardLabelListOpen}
                toggleCardLabelList={toggleCardLabelList}
                toggleCardComplete={toggleCardComplete}
                onToggleQuickCardEditor={onToggleQuickCardEditor}
                getLabel={getLabel}
              />
             
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
