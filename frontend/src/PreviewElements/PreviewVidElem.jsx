import React from 'react';
import YouTube from 'react-youtube';
import { Rnd } from 'react-rnd';
import styled from 'styled-components';

import { motion } from 'framer-motion';
import { TRANSITION_SECS } from '../constants';

const StyledYoutube = styled(YouTube)`
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const ResizeContainer = styled(Rnd)`
  position: relative;
  padding: 20px;
`;

const VideoContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const PreviewVidElem = ({ general, url, autoplay, shiftDown, id }) => {
  const videoOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: autoplay ? 1 : 0
    }
  };

  return (
    <ResizeContainer
      key={id}
      default={general}
      bounds={'parent'}
      tabIndex={'0'}
      minWidth={'1%'}
      minHeight={'1%'}
      disableDragging={true}
      enableResizing={false}
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
        />
      </VideoContainer>
    </ResizeContainer>
  );
};

export default PreviewVidElem;
