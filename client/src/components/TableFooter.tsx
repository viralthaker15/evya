/// <reference types="vite-plugin-svgr/client" />
import ArrowLeft from "../assets/arrow-left.svg?react";
import ArrowRight from "../assets/arrow-right.svg?react";

type TableFooterProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const TableFooter = ({
  currentPage,
  totalPages,
  onPageChange,
}: TableFooterProps) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-between items-center p-4 bg-white border-t">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3.5 py-2 border rounded-md text-slate-700 disabled:opacity-50 flex justify-between align-middle"
      >
        <ArrowLeft className="mt-0.5 mr-1.5" />
        Previous
      </button>
      <div className="flex space-x-2">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-1 border rounded-md ${
              number === currentPage
                ? "text-purple-500 bg-purple-50"
                : "text-gray-500"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded-md text-slate-700 disabled:opacity-50 flex justify-between align-middle"
      >
        Next
        <ArrowRight className="mt-0.5 ml-1.5" />
      </button>
    </div>
  );
};

export default TableFooter;
