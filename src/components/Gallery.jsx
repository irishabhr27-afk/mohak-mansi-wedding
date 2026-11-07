import { useState } from 'react'

const photos = [
  {
    id: 1,
    title: 'The Beginning',
    category: 'OUR STORY',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000',
  },
  {
    id: 2,
    title: 'Beautiful Moments',
    category: 'MEMORIES',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1000',
  },
  {
    id: 3,
    title: 'Together Forever',
    category: 'LOVE',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1000',
  },
  {
    id: 4,
    title: 'Celebration',
    category: 'FESTIVITIES',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1000',
  },
  {
    id: 5,
    title: 'A Special Day',
    category: 'MOMENTS',
    image: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=1000',
  },
  {
    id: 6,
    title: 'Forever Begins',
    category: 'TOGETHER',
    image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=1000',
  },
]

function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  return (
    <section className="gallery-section" id="gallery">
      <p className="eyebrow">CAPTURING OUR JOURNEY</p>

      <h2>Moments of Forever</h2>

      <p className="gallery-intro">
        A collection of moments, memories and beautiful beginnings.
      </p>

      <div className="gallery-grid">
        {photos.map((photo) => (
          <button
            className="gallery-item"
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            aria-label={`View ${photo.title}`}
          >
            <img src={photo.image} alt={photo.title} loading="lazy" />

            <div className="gallery-overlay">
              <span>{photo.category}</span>
              <h3>{photo.title}</h3>
            </div>
          </button>
        ))}
      </div>

      {selectedPhoto && (
        <div
          className="gallery-lightbox"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="gallery-close"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close image"
          >
            ×
          </button>

          <img
            src={selectedPhoto.image}
            alt={selectedPhoto.title}
            onClick={(event) => event.stopPropagation()}
          />

          <p>{selectedPhoto.title}</p>
        </div>
      )}
    </section>
  )
}

export default Gallery