import styled from "styled-components";

export const Container = styled.div`
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const LinkA = styled.a`
  color: #f2cc00;
  text-decoration: none;

  &:after {
    width: 45px;
    height: 45px;
    color: #f2cc00;
    font-size: 20px;
    content: "⤲";
    line-height: 45px;
  }

  &:hover {
    color: #fff;
  }
`;
