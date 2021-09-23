import { GroupPreview } from './group-preview.jsx';

export function GroupList({ groups }) {
  return (
    <section className='group-list-container'>
      <ul className='group-list clean-list'>
        {groups &&
          groups.map((group) => {
            return (
              <GroupPreview group={group}/>
              //   <li key={group.id} className='group-preview'>
              //     <p>{group.title}</p>
              //     {group.cards.map((card) => {
              //         return <CardPreview card={card}/>
              //     })}
              //   </li>
            );
          })}
      </ul>

      {/* {user && user.isAdmin && <Link to='/toy/add' className='app-btn flex align-center justify-center'>
        Add Toy
      </Link>}
      {!toys && <Loader />}
      {toys && toys.length <= 0 && 'No Toys to show'}
      {toys && toys.length > 0 && (
        <ul className=''>
          {toys.map((toy) => {
            return (
              <ToyPreview key={toy._id} toy={toy} onRemoveToy={onRemoveToy} user={user}/>
            );
          })}
        </ul>
      )} */}
    </section>
  );
}
