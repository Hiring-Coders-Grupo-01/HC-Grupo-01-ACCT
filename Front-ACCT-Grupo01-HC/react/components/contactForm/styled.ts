import styled from "styled-components";

export const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300;700&display=swap");

  * {
    font-family: "Open Sans Condensed", sans-serif;
  }

  background: url("https://acct.global/wp-content/uploads/2021/01/bg-form.jpg") no-repeat bottom center scroll;
  background-size: cover;
  width: 100%;
  height: 802px;

  line-height: 1.2;
  list-style: none;

  font-weight: bold;

  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;
