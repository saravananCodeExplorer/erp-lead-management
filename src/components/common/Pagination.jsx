 import React from "react";
const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
}) => {
  return (
    <div className="pagination">

      <select
        value={rowsPerPage}
        onChange={(e) =>
          setRowsPerPage(Number(e.target.value))
        }
      >
        <option value={10}>10 rows</option>
        <option value={25}>25 rows</option>
        <option value={50}>50 rows</option>
      </select>

      <div className="pagination-controls">
        <button
          className="btn-secondary btn-sm"
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          className="btn-secondary btn-sm"
          disabled={currentPage >= totalPages || totalPages === 0}
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default Pagination;