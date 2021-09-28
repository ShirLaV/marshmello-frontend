export function CardContent() {
  return (
    <div className='card-content'>
      {card.style && (
        <div className='card-preview-header'>
          {card.style.bgColor && (
            <div
              className='header-color'
              style={{ backgroundColor: card.style.bgColor }}
            ></div>
          )}
          {card.style.imgUrl && <img src={card.style.imgUrl} />}
        </div>
      )}

      <div className='card-details'>
        {card.labelIds && (
          <ul
            onClick={toggleCardLabelList}
            className={`label-bar-list flex clean-list ${
              isCardLabelListOpen ? 'open' : 'close'
            }`}
          >
            {card.labelIds.map((labelId) => {
              const label = this.getLabel(labelId);
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
        )}

        <p>{card.title}</p>

        <div className='card-preview-footer flex align-center'>
          {card.dueDate && (
            <div
              className='due-date-box flex align-center'
              style={this.getDueTimeStyle(card)}
              onClick={(event) => toggleCardComplete(event, groupId, card)}
            >
              <span className='clock-icon flex align-center'>
                <FiClock />
              </span>
              <span className='check-icon'>
                {card.isComplete ? (
                  <GrCheckboxSelected color={'inherit'} />
                ) : (
                  <GrCheckbox />
                )}
              </span>
              <span>{this.getFormatedTime(card.dueDate)}</span>
            </div>
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
            <div className='checklist-box flex align-center'>
              <BsCheckBox />
              <span>{this.getChecklistStr(card.checklists)}</span>
            </div>
          )}

          {card.members && (
            <div className='card-members-list flex'>
              {card.members.map((member, index) => (
                <MemberAvatar member={member} size={'md'} key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
