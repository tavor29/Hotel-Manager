import React from "react";

export default Sidebar = ({ users }) => {
  return (
    <div className="sidebar">
      <h2>Users</h2>
      {users && users.length > 0 ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <p>No users online</p>
      )}
    </div>
  );
};
