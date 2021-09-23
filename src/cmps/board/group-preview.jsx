import { CardPreview } from './card-preview.jsx';

export function GroupPreview({ group }) {
  return (
    <div className='group-preview'>
      <div className='group-header flex space-between align-center'>
        <p>{group.title}</p>
        <button>Edit</button>
      </div>
      {group.cards && (
        <ul className='card-list clean-list'>
          {group.cards.map((card) => {
            return <CardPreview key={card.id} card={card} />;
          })}
        </ul>
      )}
      <div className='group-footer flex space-between align-center'>
        <button>
            + Add a card
        </button>
      </div>
    </div>
  );
}
