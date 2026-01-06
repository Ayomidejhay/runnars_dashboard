"use client";

import React from "react";
import Image from "next/image";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      {/* Rows Per Page */}
      <div className="flex justify-end items-center my-2 gap-2">
        <label htmlFor="rows" className="text-sm text-gray-600">
          Rows per page:
        </label>
        <select
          id="rows"
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="text-sm font-bold text-deepblue px-2 py-1"
        >
          {[5, 10, 20, 50].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-2 items-center">
          <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            <Image src="/prev.svg" alt="prev" height={32} width={32} />
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <Image src="/next.svg" alt="next" height={32} width={32} />
          </button>
        </div>
      )}
    </div>
  );
};

export default PaginationControls;
