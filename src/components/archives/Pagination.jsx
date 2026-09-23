import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 24,
  onPageChange,
  itemName = 'photographs',
}) {
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate pagination items with ellipses
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, 'ellipsis-right', totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        'ellipsis-left',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      'ellipsis-left',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      'ellipsis-right',
      totalPages,
    ];
  };

  const pages = getPageNumbers();

  return (
    <nav
      className="archive-pagination-wrap"
      role="navigation"
      aria-label="Photographs pagination"
    >
      <div className="archive-pagination-info">
        Showing <strong>{startItem}–{endItem}</strong> of <strong>{totalItems}</strong> {itemName}
      </div>

      {totalPages > 1 && (
        <div className="archive-pagination-controls">
          <button
            type="button"
            className="archive-page-btn archive-page-prev"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
            <span>Prev</span>
          </button>

          <div className="archive-page-numbers">
            {pages.map((p, index) => {
              if (typeof p === 'string') {
                return (
                  <span
                    key={`${p}-${index}`}
                    className="archive-page-ellipsis"
                    aria-hidden="true"
                  >
                    …
                  </span>
                );
              }

              const isCurrent = p === currentPage;
              return (
                <button
                  key={p}
                  type="button"
                  className={`archive-page-btn archive-page-num ${isCurrent ? 'is-active' : ''}`}
                  onClick={() => onPageChange(p)}
                  aria-current={isCurrent ? 'page' : undefined}
                  aria-label={`Page ${p}`}
                >
                  {p}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="archive-page-btn archive-page-next"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Next page"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </nav>
  );
}
