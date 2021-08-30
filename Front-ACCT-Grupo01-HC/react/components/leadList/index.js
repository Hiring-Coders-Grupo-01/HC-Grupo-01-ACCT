import React, { useState, useEffect } from "react";
import { Container, ClientsContent, Ttile, ClientsName, ClientsGrid } from "./styled";

//services
import api from "../../services/api";

function LeadList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      await api.get("leads").then((response) => {
        if (response.data) {
          setUsers(response.data);
        }
      });
    }
    loadUsers();
  }, []);

  return (
    <Container>
      <Ttile>Contatos Favoritos</Ttile>
      <ClientsGrid>
        {users.map((data, index) => (
          <ClientsContent key={index}>
            <ClientsName>{data.nome}</ClientsName>
          </ClientsContent>
        ))}
      </ClientsGrid>
    </Container>
  );
}

export default LeadList;
