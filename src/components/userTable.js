import React from "react";
import { useState} from "react";

export default function UserTable({ users }) {
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const sortedUsers = [...users];

  sortedUsers.sort((a, b) => {
    if (sortBy === "name") {
      const nameA = `${a.name.title} ${a.name.first} ${a.name.last}`;
      const nameB = `${b.name.title} ${b.name.first} ${b.name.last}`;
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    } else if (sortBy === "username") {
      return sortOrder === "asc"
        ? a.login.username.localeCompare(b.login.username)
        : b.login.username.localeCompare(a.login.username);
    }
    return 0;
  });

  const handleSortChange = (newSortBy) => {
    const newSortOrder =
      sortBy === newSortBy && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-lg text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">#</th>
            <th className="px-6 py-3">
              <button onClick={() => handleSortChange("name")}>
                Fullname{" "}
                {sortBy === "name" ? (sortOrder === "asc" ? "▲" : "▼") : null}
              </button>
            </th>
            <th className="px-6 py-3">
              <button onClick={() => handleSortChange("username")}>
                Username{" "}
                {sortBy === "username"
                  ? sortOrder === "asc"
                    ? "▲"
                    : "▼"
                  : null}
              </button>
            </th>
            <th className="px-6 py-3">Thumbnail </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{`${item.name.title} ${item.name.first} ${item.name.last}`}</td>
              <td className="px-6 py-4">{item.login.username}</td>
              <td className="px-6 py-4">
                <img
                  className="rounded-full ml-6"
                  src={item.picture.thumbnail}
                  alt="Thumbnail"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
