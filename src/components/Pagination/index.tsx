import { FC } from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  handlePageClick: (event) => void;
  pageCount: number;
  currentPage: number;
}

export const Pagination: FC<PaginationProps> = (props) => {
  const { handlePageClick, pageCount, currentPage } = props;

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplaayed={5}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
      containerClassName="pagination"
      previousLinkClassName="pagination__link"
      nextLinkClassName="pagination__link"
      disabledClassName="pagination__link--disabled"
      activeClassName="pagination__link--active"
      forcePage={currentPage}
    />
  );
};
