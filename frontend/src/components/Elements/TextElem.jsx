import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import { enableResizing, resizeHandleComponent, TRANSITION_SECS } from '../../constants';
import styled from 'styled-components';

import { motion } from 'framer-motion';

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
  border: rgb(234, 234, 234) solid 1px;
  position: relative;
`;

const TextElem = ({
  general,
  handleDelete,
  handleDouble,
  handleDrag,
  handleResize,
  font,
  text,
  fontSize,
  color,
  shiftDown
}) => {
  const [elemActive, setElemActive] = useState(false);

  return (
    <ResizeContainer
      position={{ x: general.x, y: general.y }}
      size={{ width: general.width, height: general.height }}
      default={general}
      bounds={'parent'}
      tabIndex={'0'}
      enableResizing={elemActive ? enableResizing : false}
      resizeHandleComponent={resizeHandleComponent}
      onBlur={() => {
        setElemActive(false);
      }}
      onFocus={() => {
        setElemActive(true);
      }}
      onContextMenu={(event) => {
        event.preventDefault();
        handleDelete();
      }}
      onDoubleClick={handleDouble}
      onResizeStop={(e, direction, ref, delta, position) => {
        handleResize(position.x, position.y, parseFloat(ref.style.width), parseFloat(ref.style.height));
      }}
      onDragStop={(e, data) => {
        handleDrag(data.x, data.y);
      }}
      minWidth={'1%'}
      minHeight={'1%'}
      lockAspectRatio={shiftDown}
    >
      <TextContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: TRANSITION_SECS }}>
        <StyledText fontFamily={font} fontSize={fontSize} color={color}>
          {text}
        </StyledText>
      </TextContainer>
    </ResizeContainer>
  );
};

export default TextElem;
