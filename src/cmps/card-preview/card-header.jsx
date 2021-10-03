export function CardHeader({ cardStyle }) {
  return (
    <div className='card-preview-header'>
      {cardStyle.bgColor && (
        <div
          className='header-color'
          style={{ backgroundColor: cardStyle.bgColor }}
        ></div>
      )}
      {cardStyle.imgUrl && <div className="image-wrapper"><img src={cardStyle.imgUrl} /></div>}
    </div>
  );
}
