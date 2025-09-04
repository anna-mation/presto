import React from 'react';
import { Rnd } from 'react-rnd';
import styled from 'styled-components';

import { motion } from 'framer-motion';
import { TRANSITION_SECS } from '../constants';

const ResizeContainer = styled(Rnd)`
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

const PreviewImgElem = ({ general, url, alt, shiftDown, id }) => {
  return (
    <ResizeContainer
      key={id}
      default={general}
      bounds={'parent'}
      tabIndex={'0'}
      disableDragging={true}
      enableResizing={false}
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

export default PreviewImgElem;
