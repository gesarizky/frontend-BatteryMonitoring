import React from "react";

const Pagination = ({ page, lastPage, setPage }) => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNextPage = () => {
    if (page < lastPage) {
      setPage((prevState) => prevState + 1);
      scrollTop();
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevState) => prevState - 1);
      scrollTop();
    }
  };

  const handleLastPage = () => {
    setPage(lastPage);
    scrollTop();
  };

  const handleFirstPage = () => {
    setPage(1);
    scrollTop();
  };

  return (
    <div className="d-flex justify-center items-center py-4 px-2 gap-4 text-color-primary text-2xl">
      {page > 1 && (
        <button
          onClick={handleFirstPage}
          className="btn btn-secondary transition-all hover:text-color-accent"
        >
          Go to First Page
        </button>
      )}
      {page > 1 && (
        <button
          onClick={handlePrevPage}
          className="btn btn-secondary transition-all hover:text-color-accent"
        >
          Prev
        </button>
      )}
      <h5>
        <span>
          {page} of {lastPage}
        </span>
      </h5>
      {page < lastPage && (
        <button
          onClick={handleNextPage}
          className="btn btn-secondary transition-all hover:text-color-accent"
        >
          Next
        </button>
      )}
      {page < lastPage && (
        <button
          onClick={handleLastPage}
          className="btn btn-secondary transition-all hover:text-color-accent"
        >
          Go to Last Page
        </button>
      )}
    </div>
  );
};

export default Pagination;
