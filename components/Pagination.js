import React, { useEffect, useState } from "react";

import ReactPaginate from "react-paginate";

function PaginatedItems({ itemsPerPage, getCurrentItems, items }) {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items?.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    getCurrentItems(currentItems);
  }, [items, itemOffset]);
  return (
    <div className="flex justify-center items-center ">
      <ReactPaginate
        className="flex justify-center items-center gap-2 md:gap-4 font-semibold "
        pageClassName=""
        pageLinkClassName="px-2 py-2 md:px-4 md:py-3 border border-[#C3C3C3] rounded opacity-70"
        activeLinkClassName="bg-common text-white border border-[#C3C3C3] rounded opacity-100"
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default PaginatedItems;
