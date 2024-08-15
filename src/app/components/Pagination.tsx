interface PaginationProps {
    customersPerPage: number;
    totalCustomers: number;
    paginate: (pageNumber: number) => void;
    currentPage: number;
  }
  
  function Pagination({ customersPerPage, totalCustomers, paginate, currentPage }: PaginationProps) {
    const totalPages = Math.ceil(totalCustomers / customersPerPage);
  
    const getPageNumbers = (): (number | string)[] => {
      const pageNumbers: (number | string)[] = [];
      
      if (totalPages <= 7) {
        // If there are 7 or fewer pages, show all
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Always add first page
        pageNumbers.push(1);
        
        if (currentPage <= 3) {
          // Near the start
          pageNumbers.push(2, 3, '...', totalPages);
        } else if (currentPage >= totalPages - 2) {
          // Near the end
          pageNumbers.push('...',  totalPages - 2, totalPages - 1, totalPages);
        } else {
          // Middle
          pageNumbers.push( '...', currentPage, currentPage + 1, '...', totalPages);
        }
      }
      
      return pageNumbers;
    };
  
    return (
      <nav className="mt-2">
        <ul className="flex flex-wrap justify-center items-center">
          <li className="mx-1 mb-2">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              className="px-2 py-0 border rounded bg-white"
              disabled={currentPage === 1}
            >
              &lt;
            </button>
          </li>
          {getPageNumbers().map((number, index) => (
            <li key={index} className="mx-1 mb-2">
              {typeof number === 'number' ? (
                <button
                  onClick={() => paginate(number)}
                  className={`px-2 py-0 rounded border ${
                    currentPage === number ? 'bg-gray-500 text-white' : 'bg-white'
                  }`}
                >
                  {number}
                </button>
              ) : (
                <span className="px-2 py-0">{number}</span>
              )}
            </li>
          ))}
          <li className="mx-1 mb-2">
            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              className="px-2 py-0 rounded border bg-white"
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </li>
        </ul>
      </nav>
    );
  }
  export default Pagination