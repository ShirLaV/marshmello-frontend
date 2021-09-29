import { GrTextAlignFull } from 'react-icons/gr';
import { ImAttachment } from 'react-icons/im';

import { MemberAvatar } from '../../cmps/shared/member-avatar.jsx';
import { CardChecklists } from './card-checklists';
import { CardDueDate } from '../card-preview/card-duedate.jsx';

export function CardFooter({card, groupId, toggleCardComplete}) {

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

        {card.attachments && card.attachments.length > 0 && (
          <div className='attachment-box flex align-center'>
            <span className='flex align-center'>
              <ImAttachment />
            </span>
            <span>{card.attachments.length}</span>
          </div>
        )}

        {card.checklists && (
            <CardChecklists checklists={card.checklists} />
        )}

        {card.members && (
          <div className='card-members-list flex'>
            {card.members.map((member, index) => (
              <MemberAvatar
                member={member}
                size={'md'}
                key={index}
              />
            ))}
          </div>
        )}
      </div>
    )
}