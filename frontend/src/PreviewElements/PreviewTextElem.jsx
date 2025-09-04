import React from 'react';
import { Rnd } from 'react-rnd';
import styled from 'styled-components';

import { motion } from 'framer-motion';
import { TRANSITION_SECS } from '../constants';

const StyledText = styled.span`
  font-family: ${(p) => p.fontFamily};
  font-size: ${(p) => p.fontSize}em;
  color: ${(p) => p.color};
  user-select: none;
`;

const TextContainer = styled(motion.div)`
  overflow: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ResizeContainer = styled(Rnd)`
  position: relative;
`;

const PreviewTextElem = ({ general, font, text, fontSize, color, shiftDown, id }) => {
  return (
    <ResizeContainer
      key={id}
      default={general}
      bounds={'parent'}
      tabIndex={'0'}
      minWidth={'1%'}
      minHeight={'1%'}
      lockAspectRatio={shiftDown}
      disableDragging={true}
      enableResizing={false}
    >
      <TextContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: TRANSITION_SECS }}>
        <StyledText fontFamily={font} fontSize={fontSize} color={color}>
          {text}
        </StyledText>
      </TextContainer>
    </ResizeContainer>
  );
};

export default PreviewTextElem;
