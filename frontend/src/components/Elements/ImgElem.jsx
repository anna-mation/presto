import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import { enableResizing, resizeHandleComponent, TRANSITION_SECS } from '../../constants';
import styled from 'styled-components';

import { motion } from 'framer-motion';

const ResizeContainer = styled(Rnd)`
  border: rgb(234, 234, 234) solid 1px;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const ImageContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const ImgElem = ({ general, handleDelete, handleDouble, handleDrag, handleResize, url, alt, shiftDown }) => {
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
      <ImageContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: TRANSITION_SECS }}>
        <Image src={url} alt={alt} />
      </ImageContainer>
    </ResizeContainer>
  );
};

export default ImgElem;
