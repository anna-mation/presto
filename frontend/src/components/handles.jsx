import React from 'react';
import styled from 'styled-components';

const StyledHandle = styled.div`
  width: 5px !important;
  height: 5px !important;
  background: rgb(142, 142, 142);
`;

const HandleBL = styled(StyledHandle)`
  transform: translate(7px, 7px);
`;

const HandleBR = styled(StyledHandle)`
  transform: translate(7px, 7px);
`;

const HandleTL = styled(StyledHandle)`
  transform: translate(7px, 7px);
`;

const HandleTR = styled(StyledHandle)`
  transform: translate(7px, 7px);
`;

export const HandleBottomLeft = () => {
  return <HandleBL />;
};

export const HandleBottomRight = () => {
  return <HandleBR />;
};

export const HandleTopLeft = () => {
  return <HandleTL />;
};

export const HandleTopRight = () => {
  return <HandleTR />;
};
