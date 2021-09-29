export function CardLabelBarList({ labelIds, getLabel, isCardLabelListOpen }) {

    return (
        <ul
        className={`label-bar-list flex clean-list ${
          isCardLabelListOpen ? 'open' : 'close'
        }`}
      >
        {labelIds.map((labelId) => {
          const label = getLabel(labelId);
          return (
            <li
              className='label-bar'
              key={label.id}
              style={{ backgroundColor: label.color }}
            >
              {isCardLabelListOpen && label.title && (
                <span>{label.title}</span>
              )}
            </li>
          );
        })}
      </ul>
    );
  }