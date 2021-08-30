import styled from "styled-components";

export const Container = styled.div`
  max-width: 90%;
  margin: 15px auto 35px auto;
`;

export const Ttile = styled.h2`
  text-align: center;
  text-transform: uppercase;

  font-size: 1.4rem;

  &:after {
    content: "_";
    color: #fcc200;
  }
`;

export const ClientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 550px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const ClientsContent = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  padding: 5px;
  margin: 1.5% auto 1.5% auto;
  width: 95%;

  &:hover {
    background-color: #d1d1d1;
  }
`;

export const ClientsName = styled.p`
  font-size: 0.9rem;
  margin-left: 25px;
`;
