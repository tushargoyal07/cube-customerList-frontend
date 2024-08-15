import React from 'react'
import LazyLoad from 'react-lazy-load';
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

interface CustomerCardProps {
  customer: Customer;
  loading: boolean;
  onClick: () => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, loading,onClick}) => {
  return (
    <div 
      className='card shadow-sm p-4 cursor-pointer border-b hover:bg-gray-300 transition-colors'
      onClick={onClick}
    >{loading ? <div className="card w-2/6 bg-gray-200 p-3 rounded h-6 animate-pulse"></div> :

      <div className="flex flex-col gap-2 text-black">
<LazyLoadComponent>
        <h2 className="text-lg font-semibold ">{customer.name}</h2>
        <div className="text-sm ">{customer.email}</div>
        <div className="text-xs ">{`${customer.location.city}, ${customer.location.country}`}</div>
        </LazyLoadComponent>
      </div>}
    </div>
  )
}

export default CustomerCard