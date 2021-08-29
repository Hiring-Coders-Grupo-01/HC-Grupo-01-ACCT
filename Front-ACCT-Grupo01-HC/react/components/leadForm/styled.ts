import styled from "styled-components";

export const FormContainer = styled.div`
  margin: auto;
  width: 50%;

  display: flex;
  flex-direction: column;
  //border: 1.5px solid #5974c7;

  @media (max-width: 1024px) {
    width: 50%;
  }
`;

export const Paragraph = styled.p`
  color: #040404;
  font-size: 22.4px;
  text-align: center;
`;

export const LabelsGroup = styled.div`
  display: flex;
  flex-direction: column;

  margin: 15px auto auto auto;
  width: 90%;
`;

export const Label = styled.label`
  color: #292929;
  font-size: 16px;

  margin-bottom: 5px;

  span {
    color: #5974c7;
  }
`;

export const Input = styled.input`
  border-radius: 3px;
  border: 0.5px solid #5974c7;
  box-shadow: 10px #719ece;
  height: 22px;
  width: 100%;
  padding: 5px;
  font-size: 0.8rem;

  &:focus {
    outline: none !important;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const Button = styled.button`
  outline-style: none;
  border: 2px solid #5974c7;
  border-radius: 3px;
  cursor: pointer;

  height: 37px;
  width: 50%;
  padding: 6px 15px 5px;
  margin: 25px auto 25px auto;

  background-color: #fff;
  color: #5974c7;
  font-weight: bold;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #5974c7;
    color: #fff;
  }
`;
