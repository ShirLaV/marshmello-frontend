import { CardHeader } from '../card-preview/card-header.jsx';
import { CardLabelBarList } from '../card-preview/card-label-bar-list.jsx';
import { CardFooter } from '../card-preview/card-footer.jsx';
import { HiOutlinePencil } from 'react-icons/hi';

export function CardPreviewContent({
  card,
  groupId,
  onToggleQuickCardEditor,
  toggleCardComplete,
  getLabel,
  toggleCardLabelList,
  isCardLabelListOpen,
}) {
  return (
    <div
      className='card-preview flex space-between'
    >
      {!card.isArchive && (
        <button
          className='hover-edit-btn'
          onClick={(event) => onToggleQuickCardEditor(event, card, groupId)}
        >
          <HiOutlinePencil />
        </button>
      )}

      {card.style && <CardHeader cardStyle={card.style} title={card.title} />}

      {(!card.style || !card.style.isFull) && (
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
      )}
    </div>
  );
}
