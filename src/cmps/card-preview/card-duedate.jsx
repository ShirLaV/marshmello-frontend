import { GrCheckbox } from 'react-icons/gr';
import { GrCheckboxSelected } from 'react-icons/gr';
import { FiClock } from 'react-icons/fi';

export function CardDueDate({ card, groupId, toggleCardComplete }) {
  const getFormatedTime = (dueDate) => {
    const date = new Date(dueDate);
    const day = date.getDate();
    const month = date.toLocaleString('en', { month: 'short' });
    const formatedTime = month + ' ' + day;
    return formatedTime;
  };

  const getDueTimeStyle = (card) => {
    //complete
    if (card.isComplete) return { backgroundColor: '#61BD4F' };
    //due soon
    else if (
      card.dueDate - Date.now() > 0 &&
      card.dueDate - Date.now() < 1000 * 60 * 60 * 24
    )
      return { backgroundColor: '#F2D600' };
    //overdue
    else if (card.dueDate - Date.now() < 0)
      return { backgroundColor: '#EB5A46' };
    //none of the above
    return { backgroundColor: 'inherit', color: 'unset' };
  };

  return (
    <div
      className='due-date-box badge flex align-center'
      style={getDueTimeStyle(card)}
      onClick={(event) => toggleCardComplete(event, groupId, card)}
    >
      <span className='clock-icon  flex align-center'>
        <FiClock />
      </span>
      <span className='check-icon'>
        {card.isComplete ? (
          <GrCheckboxSelected color={'inherit'} />
        ) : (
          <GrCheckbox />
        )}
      </span>
      <span>{getFormatedTime(card.dueDate)}</span>
    </div>
  );
}
