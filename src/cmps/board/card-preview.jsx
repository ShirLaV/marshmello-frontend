import { HiOutlinePencil  } from 'react-icons/hi';

export function CardPreview({ card }) {
  return (
    <div className='card-preview flex space-between'>
      <p>{card.title}</p>
      <button className="hover-edit-btn"><HiOutlinePencil /></button>
    </div>
  );
}
