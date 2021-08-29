import styled from "styled-components";

export const Container = styled.div`
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const LinkA = styled.a`
  text-decoration: none;

  path {
    fill: #f2cc00 !important;
  }

  path:hover {
    fill: #fff !important;
  }
`;
