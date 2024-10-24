import s from "./Paginator.module.css";

type PaginatorPropsType = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
};

const Paginator = ({ page, totalPages, setPage }: PaginatorPropsType) => {

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pages: JSX.Element[] = [];

    // Always show the first page
    if (page > 1) {
      pages.push(
        <span key={1} onClick={() => handlePageChange(1)} className={s.page}>
          1
        </span>
      );
    }

    // Show ellipsis if necessary
    if (page > 3) {
      pages.push(
        <span key="start-ellipsis" className={s.dots}>
          ...
        </span>
      );
    }

    // Show previous page
    if (page > 2) {
      pages.push(
        <span key={page - 1} onClick={() => handlePageChange(page - 1)} className={s.page}>
          {page - 1}
        </span>
      );
    }

    // Show current page
    pages.push(
      <span key={page} className={s.currentPage}>
        {page}
      </span>
    );

    // Show next page
    if (page < totalPages - 1) {
      pages.push(
        <span key={page + 1} onClick={() => handlePageChange(page + 1)} className={s.page}>
          {page + 1}
        </span>
      );
    }

    // Show ellipsis if necessary
    if (page < totalPages - 2) {
      pages.push(
        <span key="end-ellipsis" className={s.dots}>
          ...
        </span>
      );
    }

    // Always show the last page if it's not already shown
    if (totalPages > 1 && page !== totalPages) {
      pages.push(
        <span key={totalPages} onClick={() => handlePageChange(totalPages)} className={s.page}>
          {totalPages}
        </span>
      );
    }

    return pages;
  };
  return (
    <div className={s.paginatorWrap}>
      <div className={s.paginator}>{renderPageNumbers()}</div>
    </div>
  );
};

export default Paginator;
