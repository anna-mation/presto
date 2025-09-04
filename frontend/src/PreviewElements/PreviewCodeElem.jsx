import React, { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';

import Editor from 'react-simple-code-editor';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import styled from 'styled-components';

import { motion } from 'framer-motion';
import { TRANSITION_SECS } from '../constants';

const ResizeContainer = styled(Rnd)`
  position: relative;
  padding: 20px;
`;

const CodeContainer = styled(motion.div)`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
`;

const StyledEditor = styled(Editor)`
  font-family: 'Fira code', 'Fira Mono', monospace;
  font-size: ${(p) => p.fontSize}em;
`;

const PreviewCodeElem = ({ general, value, size, shiftDown, id }) => {
  const [code, setCode] = useState('');
  useEffect(() => {
    setCode(value);
  }, [value]);

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
      <CodeContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: TRANSITION_SECS }}>
        <StyledEditor
          value={code}
          className='hljs'
          readOnly
          highlight={(code) => hljs.highlightAuto(code).value}
          padding={10}
          onMouseDown={(e) => e.stopPropagation()}
          fontSize={size}
        />
      </CodeContainer>
    </ResizeContainer>
  );
};

export default PreviewCodeElem;
