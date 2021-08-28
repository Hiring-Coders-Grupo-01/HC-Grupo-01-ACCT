import styled, { keyframes } from "styled-components";

export const pcAnimation = keyframes`
    from {
    transform: rotateX(90deg);
    }

    to {
    transform: rotateX(0deg);
    }
`;

export const ladyPCAnimation = keyframes`
    0% {
    transform: translateX(-50px);
    opacity: 0;
  }

  50% {
    transform: translateX(-50px);
    opacity: 0;
  }

  100% {
    transform: translateX(0px);
    opacity: 1;
  }
`;

export const leftImgAnimation = keyframes`
    0% {
    transform: translateX(+25px);
    opacity: 0;
  }

  50% {
    transform: translateX(+25px);
    opacity: 0;
  }

  100% {
    transform: translateX(0px);
    opacity: 1;
  }
`;

export const rightImgAnimation = keyframes`
    0% {
    transform: translateX(-25px);
    opacity: 0;
  }

  50% {
    transform: translateX(-25px);
    opacity: 0;
  }

  100% {
    transform: translateX(0px);
    opacity: 1;
  }
`;

export const Container = styled.div``;

export const Perspective = styled.div`
  width: 100%;
  height: 100%;
  perspective: 1000px;
`;

export const Section = styled.div``;

export const Pc = styled.img`
  z-index: 9;
  animation-name: ${pcAnimation};
  animation-duration: 2s;
  transform-style: preserve-3d;

  width: 576px;
  position: absolute;
  top: 0px;
  right: 400px;
`;

export const Lady = styled.img`
  z-index: 9;
  animation-name: ${pcAnimation};
  animation-duration: 2s;
  transform-style: preserve-3d;

  height: 294px;
  position: absolute;
  top: 150px;
  right: 825px;
`;

export const Gentleman = styled.img`
  z-index: 9;
  animation-name: ${pcAnimation};
  animation-duration: 2s;
  transform-style: preserve-3d;

  height: 324px;
  position: absolute;
  top: 150px;
  right: 400px;
`;

export const LadyComputer = styled.img`
  z-index: 9;
  height: 242px;
  position: absolute;
  top: -137px;
  right: 475px;
  animation: ${ladyPCAnimation} 2s forwards ease-in-out;
`;

export const Cacto = styled.img`
  z-index: 8;
  position: absolute;

  animation: ${rightImgAnimation} 3s forwards ease-in-out;

  height: 100px;
  top: 175px;
  right: 450px;
`;

export const Pontinho = styled.img`
  z-index: 8;
  position: absolute;

  animation: ${rightImgAnimation} 3s forwards ease-in-out;

  height: 100px;
  top: 175px;
  right: 400px;
`;

export const PontinhoAmarelo = styled.img`
  z-index: 8;
  position: absolute;

  animation: ${rightImgAnimation} 3s forwards ease-in-out;

  height: 100px;
  top: 270px;
  right: 850px;
`;

export const Cotonete = styled.img`
  z-index: 8;
  position: absolute;

  animation: ${leftImgAnimation} 3s forwards ease-in-out;

  height: 330px;
  top: -15px;
  right: 845px;
`;

export const Pedra = styled.img`
  z-index: 8;
  position: absolute;

  animation: ${leftImgAnimation} 3s forwards ease-in-out;

  height: 150px;
  top: 235px;
  right: 800px;
`;

export const Folha = styled.img`
  z-index: 8;
  position: absolute;

  animation: ${leftImgAnimation} 3s forwards ease-in-out;

  height: 300px;
  top: -50px;
  right: 350px;
`;
