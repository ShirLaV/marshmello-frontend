import { GrTextAlignFull } from 'react-icons/gr';
import { ImAttachment } from 'react-icons/im';
import { FaRegComment } from 'react-icons/fa';
import { MemberAvatar } from '../../cmps/shared/member-avatar.jsx';
import { CardChecklists } from './card-checklists';
import { CardDueDate } from '../card-preview/card-duedate.jsx';

export function CardFooter({ card, groupId, toggleCardComplete }) {
  return (
    <div className='card-preview-footer flex align-center'>
      {card.dueDate && (
        <CardDueDate
          card={card}
          groupId={groupId}
          toggleCardComplete={toggleCardComplete}
        />
      )}

      {card.description && (
        <GrTextAlignFull title={'This card has a description'} />
      )}

      {card.comments && (
        <div className='comments-box badge flex align-center'>
          <span className='flex align-center'>
            <FaRegComment />
          </span>
          <span>{card.comments.length}</span>
        </div>
      )}

      {card.attachments && card.attachments.length > 0 && (
        <div className='attachment-box badge flex align-center'>
          <span className='flex align-center'>
            <ImAttachment />
          </span>
          <span>{card.attachments.length}</span>
        </div>
      )}

      {card.checklists && <CardChecklists checklists={card.checklists} />}

      {card.isArchive && <span>Archived</span>}

      {card.members && (
        <div className='card-members-list badge flex'>
          {card.members.map((member, index) => (
            <MemberAvatar member={member} size={'md'} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}
