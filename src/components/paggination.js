import { useState, useEffect } from "react";

export default function Paggination({
  usersPerPage,
  totalUsers,
  paginate,
  sendData,
}) {
  const [selectedPage, setSelectedPage] = useState(1);
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumber.push(i);
  }
  const handleClick = (number) => {
    setSelectedPage(number);
    paginate(number);
    sendData(number, usersPerPage);
  };

  return (
    <div className="flex justify-end space-x-2 mt-3">
      {pageNumber.map((number) => (
        <div
          key={number}
          className={`cursor-pointer px-3 py-1 rounded ${
            selectedPage === number ? "bg-blue-500 text-white" : "bg-blue-200"
          }`}
          onClick={() => handleClick(number)}
        >
          {number}
        </div>
      ))}
    </div>
  );
}
