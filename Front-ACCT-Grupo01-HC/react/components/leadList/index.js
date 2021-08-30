import React, { useState, useEffect } from "react";

//services
import api from "../../services/api";

function LeadList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      await api.get().then((response) => {
        if (response.data) {
          setUsers(response.data);
        }
      });
    }
    loadUsers();
  }, []);

  return (
    <div>
      <h1>wee</h1>

      {users.map((data) => (
        <div>
          <p>{data.nome}</p>
        </div>
      ))}
    </div>
  );
}

export default LeadList;
