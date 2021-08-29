import styled from "styled-components";

export const FormContainer = styled.div`
  width: 70%;
  margin: auto;

  @media (max-width: 1024px) {
    width: 50%;
  }
`;

export const Paragraph = styled.p`
  color: #040404;
  font-size: 22.4px;
`;

export const Form = styled.form``;

export const Grid2Labels = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const LabelsGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
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
  border: none;
  height: 22px;
  width: 225px;

  textarea:focus,
  input:focus,
  select:focus {
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const LastInput = styled.input`
  border-radius: 3px;
  border: none;
  height: 109px;
  width: 100%;

  textarea:focus,
  input:focus,
  select:focus {
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
  }
`;

export const Button = styled.button`
  outline-style: none;
  border: 2px solid #5974c7;
  border-radius: 3px;
  cursor: pointer;

  height: 37px;
  width: 84px;
  padding: 6px 15px 5px;
  margin-top: 40px;

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
