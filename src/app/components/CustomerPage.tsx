import React, { useState, useEffect } from 'react'
import ImageGridCard from './ImageGridCard'
import axios from 'axios'
import { LazyLoadComponent } from 'react-lazy-load-image-component';

// interface Customer {
//   id: number;
//   name: string;
//   title: string;
//   email: string;
// }

interface Customer {
  id: string;
  name: string;
  email: string;
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
  };
  picture: {
    large: string;
  };
}

interface CustomerPageProps {
  customer: Customer | null;
}

const CustomerPage: React.FC<CustomerPageProps> = ({ customer }) => {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true;
    const fetchImages = async () => {
      setLoading(true)
      setImages([])
      try {
        const imagePromises = Array(9).fill(null).map(() =>
          axios.get('https://dog.ceo/api/breeds/image/random')
        )
        const responses = await Promise.all(imagePromises)
        if(isMounted){
          const newImages = responses.map(response => response.data.message)
          setImages(newImages)
          setLoading(false)
        } 
      } catch (error) {
        console.error('Error fetching images:', error)
        if(isMounted)
            setLoading(false)
      }
    }
    if (customer) {
      fetchImages()
      const interval = setInterval(fetchImages, 10000)
      return () => {
        clearInterval(interval)
        isMounted = false
      }
    } else {
      setImages([])
      setLoading(true)
    }
  }, [customer])

  if (!customer) {
    return (
      <div className='p-10 text-center h-full flex items-center justify-center'>
        <h2 className='text-xl font-semibold'>Please select a customer to view details</h2>
      </div>
    )
  }

  return (
    
    <div className='p-10'>
      <div className="flex flex-col gap-6 items-center mb-10">
        <h1 className='text-3xl font-bold'>{customer.name}</h1>
        <h3 className='text-md text-gray-500'>{customer.email}</h3>
        <p className='text-md text-gray-500'>
          {`${customer.location.street.number} ${customer.location.street.name}, ${customer.location.city}, ${customer.location.state}, ${customer.location.country}`}
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-16 sm:p-10 md:p-20">
      {Array(9).fill(null).map((_, index) => (
          <ImageGridCard key={index} imageUrl={images[index]} loading={loading} />
        ))}
      </div>
    </div>
    
  )
}

export default CustomerPage