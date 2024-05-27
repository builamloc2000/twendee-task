import { fetchUsers } from "./api-services/userService";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import UserTable from "./components/userTable";
import Paggination from "./components/paggination";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const resultsParam = searchParams.get("results");

  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const results = resultsParam ? parseInt(resultsParam, 10) : 10;

  const [currentPage, setCurrentPage] = useState(page);
  const [usersPerPage, setUsersPerPage] = useState(results);

  useEffect(() => {
    if (pageParam !== null) {
      setCurrentPage(page);
    }
    if (resultsParam !== null) {
      setUsersPerPage(results);
    }
  }, [pageParam, resultsParam]);
  const receiveDataFromChild = (page, userPerPage) => {
    setSearchParams({ page: page, results: userPerPage });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  const users = useSelector((state) => state.user.data);

 

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirsUser = indexOfLastUser - usersPerPage;

  const currentUsers = users
    ? users.slice(indexOfFirsUser, indexOfLastUser)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSelectChange = (event) => {
    const newResults = parseInt(event.target.value, 10);
    setUsersPerPage(newResults);
    setSearchParams({ page: currentPage, results: newResults });
  };

  return (
    <>
      {users ? (
        <div className="w-full  flex-col ">
          <div className="flex justify-center w-full mt-10">
            <div className="flex w-9/12 justify-end mb-4">
              <p className="">Show rows</p>
              <select
                name="rows"
                id="cars"
                onChange={handleSelectChange}
                value={usersPerPage}
                className="rounded-lg ml-5 outline-none"
              >
                <option value="10">10</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <div className="w-9/12">
              <UserTable users={currentUsers} />
              <Paggination
                usersPerPage={usersPerPage}
                totalUsers={users.length}
                paginate={paginate}
                sendData={receiveDataFromChild}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-5xl mt-10 ">Loading...</div>
      )}
    </>
  );
}
