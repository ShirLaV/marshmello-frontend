import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BsCheck } from 'react-icons/bs';
import { onUpdateCard } from '../../store/board.actions';
import { MemberAvatar } from '../shared/member-avatar';
import { cardEditService } from '../../services/card-edit.service';
import { activityTxtMap } from '../../services/activity.service';
import { socketService } from '../../services/socket.service';
import { userService } from '../../services/user.service';
import { utilService } from '../../services/util.service';

function _PopperMemberPreview({
  member,
  currCardId,
  onUpdateCard,
  user,
  onAddUserMention,
}) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const groupId = cardEditService.getGroupId(currCardId);
    const card = cardEditService.getCardById(currCardId, groupId);
    const isMemberChecked = card.members?.find((m) => m._id === member._id);
    setIsChecked(isMemberChecked);
  }, [currCardId, member._id]);

  const handleMemberClick = () => {
    setIsChecked(!isChecked);
    const res = cardEditService.handleMemberChange(member._id);
    const activity = isChecked
      ? {
        txt: activityTxtMap.removeMemberFromCard(member.fullname),
        currCardId,
      }
      : { txt: activityTxtMap.addMemberToCard(member.fullname), currCardId };
    onUpdateCard(...res, activity);
    const groupId = res[1]
    const board = res[2];
    const card = res[0];
    const mention = {
      id: utilService.makeId(),
      user,
      action: isChecked ? 'Removed' : 'Added',
      board: {boardId: board._id, title: board.title},
      card: {cardId: card.id, title: card.title},
      groupId,
      createdAt: Date.now()
    };
    socketService.emit('send-mention', ({userId: member._id, mention}))
    userService.addUserMention(member._id, mention)
  };

  return (
    <div className='popper-member-preview flex' onClick={handleMemberClick}>
      <div className='list-item-layover'></div>
      <div style={{ width: 32 }}>
        <MemberAvatar member={member} />
      </div>
      <div className='popper-member-name'>
        <p>{member.fullname}</p>
      </div>
      {isChecked && (
        <div className='popper-member-check'>
          <BsCheck />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currCardId: state.boardModule.currCardId,
    user: state.userModule.user,
  };
};

const mapDispatchToProps = {
  onUpdateCard

};

export const PopperMemberPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_PopperMemberPreview);
