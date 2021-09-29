// import React, { Component } from 'react';

import { GroupPreview } from './group-preview.jsx';

export function GroupList({
  groups,
  openCardEdit,
  updateBoard,
  toggleCardLabelList,
  isCardLabelListOpen,
  toggleCardComplete,
  toggleGroupArchive,
  onToggleQuickCardEditor,
  getLabel
}) {
  return (
    <ul className='group-list clean-list flex'>
      {groups.map((group, index) => {
        return (
          <GroupPreview
            key={group.id}
            index={index}
            group={group}
            openCardEdit={openCardEdit}
            updateBoard={updateBoard}
            toggleCardLabelList={toggleCardLabelList}
            isCardLabelListOpen={isCardLabelListOpen}
            toggleCardComplete={toggleCardComplete}
            toggleGroupArchive={toggleGroupArchive}
            onToggleQuickCardEditor={onToggleQuickCardEditor}
            getLabel={getLabel}
          />
        );
      })}
    </ul>
  );
}
