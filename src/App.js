import React, { useState } from "react";
import "./App.css";

const BASE_URL = "http://51.20.106.95:8080/api/users";

function App() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [userResult, setUserResult] = useState("");

  const createUser = async () => {
    const randomId = Math.floor(Math.random() * 100000);
    const name = "User" + randomId;
    const email = `user${randomId}@example.com`;

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    const data = await res.json();
    console.log("User created:", data);
    getAllUsers();
  };

  const getAllUsers = async () => {
    const res = await fetch(BASE_URL);
    const users = await res.json();
    setUsers(users);
  };

  const getUserById = async () => {
    const res = await fetch(`${BASE_URL}/${userId}`);

    if (res.status === 404) {
      setUserResult("User not found.");
      return;
    }

    const user = await res.json();
    setUserResult(`Name: ${user.name}, Email: ${user.email}`);
  };

  const deleteUser = async () => {
    await fetch(`${BASE_URL}/${deleteId}`, { method: "DELETE" });
    console.log("User deleted:", deleteId);
    getAllUsers();
  };

  return (
    <div className="container">
      <h1>User API Client</h1>

      <div className="card">
        <h2>Create User</h2>
        <button className="btn" onClick={createUser}>
          Create Random User
        </button>
      </div>

      <div className="card">
        <h2>Get All Users</h2>
        <button className="btn" onClick={getAllUsers}>
          Fetch
        </button>
        <div id="userListWrapper">
          <ul className="list">
            {users.map((u) => (
              <li key={u.id}>
                ID: {u.id}, Name: {u.name}, Email: {u.email}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card">
        <h2>Get User By ID</h2>
        <div className="input-group">
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="User ID"
          />
          <button className="btn" onClick={getUserById}>
            Fetch
          </button>
        </div>
        <p id="userResult">{userResult}</p>
      </div>

      <div className="card">
        <h2>Delete User</h2>
        <div className="input-group">
          <input
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            placeholder="User ID"
          />
          <button className="btn danger" onClick={deleteUser}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
