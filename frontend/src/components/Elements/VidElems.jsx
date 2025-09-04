import React, { useState } from 'react';
import YouTube from 'react-youtube';
import { Rnd } from 'react-rnd';
import { enableResizing, resizeHandleComponent, TRANSITION_SECS, MOBILE_WIDTH } from '../../constants';
import styled from 'styled-components';

import { motion } from 'framer-motion';

const StyledYoutube = styled(YouTube)`
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: ${(props) => props.disable};
`;

const ResizeContainer = styled(Rnd)`
  border: rgb(234, 234, 234) solid 1px;
  position: relative;
  padding: 30px;

  @media (max-width: ${MOBILE_WIDTH}) {
    padding: 10px;
  }
`;

const VideoContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const VidElem = ({ general, handleDelete, handleDrag, handleResize, handleDouble, url, autoplay, shiftDown }) => {
  const [elemActive, setElemActive] = useState(false);

  const videoOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: autoplay ? 1 : 0
    }
  };

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
      onResizeStop={(e, direction, ref, delta, position) => {
        handleResize(position.x, position.y, parseFloat(ref.style.width), parseFloat(ref.style.height));
      }}
      onDragStop={(e, data) => {
        handleDrag(data.x, data.y);
      }}
      onContextMenu={(event) => {
        event.preventDefault();
        handleDelete();
      }}
      onDoubleClick={handleDouble}
      minWidth={'1%'}
      minHeight={'1%'}
      lockAspectRatio={shiftDown}
    >
      <VideoContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: TRANSITION_SECS }}>
        <StyledYoutube
          videoId={url}
          opts={videoOpts}
          className='youtube-video'
          onReady={(event) => {
            // Access to player in all event handlers via event.target
            event.target.pauseVideo();
          }}
          disable={elemActive ? 'none' : 'auto'}
        />
      </VideoContainer>
    </ResizeContainer>
  );
};

export default VidElem;
