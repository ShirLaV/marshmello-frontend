import { GroupPreview } from './group-preview.jsx';

export function GroupList({ groups }) {
  return (
    <section className='group-list-container'>
      {groups && (
        <ul className='group-list clean-list'>
          {groups.map((group) => {
            return <GroupPreview key={group.id} group={group} />;
          })}
        </ul>
      )}
      
    </section>
  );
}
