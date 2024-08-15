'use client';
import React, { useState, useEffect } from 'react';
import CustomerCard from './components/CustomerCard';
import CustomerPage from './components/CustomerPage';
import Pagination from './components/Pagination';
import './styles.css';
import axios from 'axios';

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

export default function Home() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());
  const customersPerPage: number = 10;

  useEffect(() => {
    // Simulating fetching 1000 customers
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const responses = await Promise.all(
          Array(10).fill(null).map(() => axios.get('https://randomuser.me/api'))
        );
        const newCustomers = responses.map(response => {
          const user = response.data.results[0];
          console.log(user, 'user');
          return {
            id: user.login.uuid,
            name: `${user.name.first} ${user.name.last}`,
            email: user.email,
            location: user.location,
            picture: user.picture
          };
        });
        setCustomers(prevCustomers => [...prevCustomers, ...newCustomers]);
        setLoadedPages(prevPages => new Set(prevPages.add(currentPage)));
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
      setLoading(false);
    };
    fetchCustomers();

    // const dummyCustomers: Customer[] = Array.from({ length: 1000 }, (_, i) => ({
    //   id: i + 1,
    //   name: `Customer ${i + 1}`,
    //   title: `Title ${i + 1}`,
    //   email: `customer${i + 1}@example.com`,
    // }));
    // setCustomers(dummyCustomers);
  }, [currentPage]);



  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <main className=' h-screen flex flex-col'>
      <h1 className="text-center font-bold text-lg p-2 border-b sticky top-0 bg-white z-10">Customer List</h1>
      <div className="sm:flex flex-grow sm:overflow-hidden">
        <div className="sm:w-2/6 flex flex-col sm:overflow-hidden ">
          <div className="flex-grow overflow-y-auto custom-scrollbar">
            {(
              customers
                .slice((currentPage - 1) * customersPerPage, currentPage * customersPerPage)
                .map((customer) => (
                  <CustomerCard
                    key={customer.id}
                    customer={customer}
                    loading={loading}
                    onClick={() => handleCustomerClick(customer)}
                  />
                ))
            )}
          </div>
          <div className="p-4 ">
            <Pagination
              customersPerPage={customersPerPage}
              totalCustomers={1000}
              paginate={setCurrentPage}
              currentPage={currentPage}
            />
          </div>

        </div>
        <div className="sm:w-4/5 overflow-y-auto border-l">
          <CustomerPage customer={selectedCustomer} />
        </div>
      </div>
    </main>
  );
}
