export function CardHeader({ cardStyle, title }) {
  return (
    <div className='card-preview-header'>
      {cardStyle.bgColor && (
        <div
          className='header-color'
          style={{ backgroundColor: cardStyle.bgColor }}
        >
          {cardStyle.isFull && <p>{title}</p>}
        </div>
      )}
      {cardStyle.imgUrl && (
        <div className='image-wrapper'>
          <img src={cardStyle.imgUrl} />
          {cardStyle.isFull && <p>{title}</p>}
        </div>
      )}
    </div>
  );
}
