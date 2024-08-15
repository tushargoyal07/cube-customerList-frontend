import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

interface ImageGridCardProps {
  imageUrl?: string;
  loading: boolean;
}

const ImageGridCard: React.FC<ImageGridCardProps> = ({ imageUrl, loading }) => {
  return (
    <div className='bg-white shadow-md rounded-lg overflow-hidden sm:size-56 size-32 group'>
      {loading ? (
        <div className="w-full sm:size-56 size-32 bg-gray-200 animate-pulse"></div>
      ) : (
        <div className="w-full h-full overflow-hidden">
        <LazyLoadImage
          src={imageUrl}
          alt="Random dog"
          className="w-full sm:size-56 size-32 object-cover h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        </div>
      )}
    </div>
  )
}

export default ImageGridCard