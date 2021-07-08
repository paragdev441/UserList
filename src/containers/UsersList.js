import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import UsersAPI from "../API/UsersAPI";
import UserField from "../components/UserField";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(async () => {
    const { data } = await UsersAPI.get("/users");
    setUsers(data);
  }, []);

  /**
   * FIltering users based on filterType and search query
   * fetch data
   * if filterType === 'all' => whole list of users
   * if filterType !== 'all' => ffilter based on filterType and search query
   *
   * if Data is empty in this case, then we print Not found else print the filteredData
   */
  const filterUsers = async () => {
    let { data } = await UsersAPI.get("/users");
    if (filterType !== "all" || query.length !== 0) {
      data = data.filter((user) => {
        return user[filterType] === query;
      });
    }

    if (data.length === 0) {
      setUsers(null);
    } else {
      setUsers(data);
    }
  };

  const filters = () => {
    return (
      <div className="filter-block">
        <div>Filter</div>
        <div style={{ marginLeft: "10px" }}>
          <select onChange={({ target }) => setFilterType(target.value)}>
            <option value="all">All</option>
            <option value="email">Email</option>
            <option value="username">Username</option>
            <option value="phone">Phone</option>
          </select>
        </div>
        <div style={{ marginLeft: "10px" }}>
          <input
            value={query}
            onChange={({ target }) => setQuery(target.value.trim())}
            placeholder="Search"
          />
        </div>
        <div style={{ marginLeft: "10px" }}>
          <button onClick={filterUsers}>Search</button>
        </div>
      </div>
    );
  };

  const tableHead = () => {
    return (
      <thead>
        <tr>
          <th>S. No</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
    );
  };

  return (
    <>
      <h1>UserList</h1>
      {filters()}
      <Table style={{ width: "100%" }} responsive>
        {tableHead()}
        <tbody style={{ width: "100%", textAlign: "center" }}>
          {users === null ? (
            <div>Not Found</div>
          ) : users.length === 0 ? (
            <div>Loading...</div>
          ) : (
            users.map((user, index) => <UserField user={user} sNo={index} />)
          )}
        </tbody>
      </Table>
    </>
  );
};

export default UsersList;
