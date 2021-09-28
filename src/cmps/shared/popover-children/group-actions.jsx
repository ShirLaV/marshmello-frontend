export function GroupActions({groupId , onToggleAddPop, toggleGroupArchive}) {
  return (
    <div className='group-actions flex column'>
      <button onClick={onToggleAddPop}>Add card...</button>
      <button onClick={()=>toggleGroupArchive(groupId)}>Archive this list...</button>
    </div>
  );
}
