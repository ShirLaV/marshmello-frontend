export function GroupActions({onToggleAddPop}) {
  return (
    <div className='group-actions flex column'>
      <button onClick={onToggleAddPop}>Add card...</button>
      <button>Archive this list...</button>
    </div>
  );
}
