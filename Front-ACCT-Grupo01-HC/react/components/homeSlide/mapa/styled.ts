import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  width: 200px;
  height: 200px;
  perspective: 500px;
  transform: rotateX(10deg);
`;

export const Flipper = styled.div`
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
`;
const qdAnimation = keyframes`
    0% {
    transform: translateX(0px);
  }

  25% {
    transform: translateX(20px) rotateY(15deg);
  }

  50% {
    transform: translateX(0px);
  }

  75% {
    transform: translateX(-20px) rotateY(-15deg);
  }

  100% {
    transform: translateX(0px);
  }
`;

export const MapaQuadrado = styled.img`
  width: 200px;
  height: 200px;
  animation-name: ${qdAnimation};
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-delay: 0.5s;
`;
