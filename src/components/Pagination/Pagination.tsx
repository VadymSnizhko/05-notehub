import ReactPaginate from 'react-paginate';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  //onPageChange: (selectedItem: { selected: number }) => void;
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
      //onPageChange={onPageChange}
      onPageChange={(selectedItem) => onPageChange(selectedItem.selected + 1)
}
      forcePage={currentPage - 1}
      previousLabel="<"
      nextLabel=">"
    />
  );
}

export default Pagination;