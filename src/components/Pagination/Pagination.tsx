import ReactPaginate from "react-paginate";
import css from './Pagination.module.css'

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={(selectedItem) =>
        onPageChange(selectedItem.selected + 1)
      }
      forcePage={currentPage - 1}
      previousLabel="<"
      nextLabel=">"
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}

export default Pagination;
