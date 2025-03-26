import React from 'react';

interface PaginationProps {
  nPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const firstPage = () => {
    setCurrentPage(1);
  };

  const lastPage = () => {
    setCurrentPage(nPages);
  };

  const sliceIntoChunks = (arr: number[], currentPage: number, chunkSize: number) => {
    const res: number[][] = [];
    const chunk = arr.slice(currentPage - 1, currentPage - 1 + chunkSize);
    res.push(chunk);
    return res;
  };

  const rows = sliceIntoChunks(pageNumbers, currentPage, 20);

  return (
    <nav className="flex justify-center mt-4">
      {rows.map((row, rowIndex) => (
        <ul key={rowIndex} className="flex items-center space-x-2">
          <li>
            <button
              className="px-3 py-1 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
              onClick={firstPage}
              disabled={currentPage === 1}
            >
              &laquo;
            </button>
          </li>
          <li>
            <button
              className="px-3 py-1 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
          </li>
          {row.map((pgNumber) => (
            <li key={pgNumber}>
              <button
                onClick={() => setCurrentPage(pgNumber)}
                className={`px-3 py-1 rounded ${
                  currentPage === pgNumber
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {pgNumber}
              </button>
            </li>
          ))}
          <li>
            <button
              className="px-3 py-1 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
              onClick={nextPage}
              disabled={currentPage === nPages}
            >
              &gt;
            </button>
          </li>
          <li>
            <button
              className="px-3 py-1 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
              onClick={lastPage}
              disabled={currentPage === nPages}
            >
              &raquo;
            </button>
          </li>
        </ul>
      ))}
    </nav>
  );
};

export default Pagination;
