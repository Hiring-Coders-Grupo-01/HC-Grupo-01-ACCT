import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  perspective: 1000px;
  transform: rotateX(15deg);
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

export const Flipper = styled.div`
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
`;

export const Perspective3D = styled.div`
  animation-name: ${qdAnimation};
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-delay: 0.5s;
`;
