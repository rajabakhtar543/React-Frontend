import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import './CheckUsers.css'; // Importing CSS file
import axios from 'axios';

const CheckUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(true); // State to track sidebar visibility

  // Function to toggle sidebar visibility
  const Toggle = () => {
    setIsOpen(!isOpen);
  };

  // Fetch users data from API
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-users");

      // Check the structure of the API response
      console.log("API Response:", data);
      console.log("API1 Response:", users);
      console.log("API2 Response:", filteredUsers);

      // Assuming the key is 'users' (confirm this based on the logged response)
      setUsers(data.User);  // Access the correct key from the response
      setFilteredUsers(data.User); // Set filtered users as well
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  // Search logic
  const searchUser = () => {
    if (searchValue.trim() === '') {
      // If search bar is empty, show all users
      setFilteredUsers(users);
    } else {
      // Filter users based on ID or email
      const filtered = users.filter(
        (user) =>
          user._id.toString() === searchValue || user.email.toLowerCase() === searchValue.toLowerCase()
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <div className="home-container">
    <Sidebar isOpen={isOpen} Toggle={Toggle} />
   <div className="main-content">
   <Navbar Toggle={Toggle} /> 

        <div className="container">
          <h1 className="text-center mb-4">All Users</h1>

          {/* Search Bar */}
          <div className="search-bars mb-3">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Enter ID or Email to search"
              value={searchValue}
              onChange={handleSearch}
            />
            <button className="buttons" onClick={searchUser}>
              Search
            </button>
          </div>

          {/* User Table */}
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.address}</td>
                      <td>{user.phone}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckUsers;
