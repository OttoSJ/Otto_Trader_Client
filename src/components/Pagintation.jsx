import Pagination from "react-bootstrap/Pagination";
import { useState } from "react";

import React from "react";

function Pagintation({ paginate, totalCars, carsPerPage }) {
  const [active, setActive] = useState(1);
  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCars / carsPerPage); i++) {
    pageNumbers.push(
      <Pagination.Item
        id="pagination"
        key={i}
        active={i === active}
        onClick={() => {
          paginate(i);
          setActive(i);
        }}
      >
        {i}
      </Pagination.Item>
    );
  }
  return (
    <Pagination className="m-5">{pageNumbers ? pageNumbers : null}</Pagination>
  );
}

export default Pagintation;
