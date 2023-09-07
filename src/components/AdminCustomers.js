import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import "./AdminCustomers.css";
function AdminCustomers() {
  const [loading, setloading] = useState(true);
  const [users, setusers] = useState([]);
  document.title = "Admin/Customers";
  const fetchAllUsers = () => {
    axios.get("http://localhost:8080/auth/all").then((response) => {
      setusers(response.data);
      setloading(false);
    });
  };
  useEffect(() => {
    fetchAllUsers();
    const intervalId = setInterval(() => {
      fetchAllUsers();
    }, 2500);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="cus-continer">
      <h1>CUSTOMERS</h1>
      <div className="customerstable">
        <table>
          <thead>
            <tr>
              <th>User Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Joined At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i}>
                <td>{user.userId}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.username}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.email}</td>
                <td>{new Date(user.userCreatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminCustomers;
