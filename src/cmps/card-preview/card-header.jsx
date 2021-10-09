export function CardHeader({ cardStyle, title }) {
  return (
    <div className='card-preview-header'>
      {cardStyle.bgColor && (
        <div
          className='header-color'
          style={{ backgroundColor: cardStyle.bgColor }}
        >
          {cardStyle.isFull && <div className='card-header-title'> <p>{title}</p></div>}
        </div>
      )}
      {cardStyle.imgUrl && (
        <div
          className='image-wrapper'
        >
          {!cardStyle.isFull && <img src={cardStyle.imgUrl} alt='card-bg' />}
          {cardStyle.isFull && <div className='card-header-title flex column'
            style={{ backgroundImage: `url("${cardStyle.imgUrl}")` }}
          ><p>{title}</p></div>}
        </div>
      )}
    </div>
  );
}
