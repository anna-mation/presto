import React, { useEffect, useState } from 'react';
import { enableResizing, MOBILE_WIDTH, resizeHandleComponent, TRANSITION_SECS } from '../../constants';
import { Rnd } from 'react-rnd';

import Editor from 'react-simple-code-editor';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import styled from 'styled-components';

import { motion } from 'framer-motion';

const ResizeContainer = styled(Rnd)`
  border: rgb(234, 234, 234) solid 1px;
  position: relative;
  padding: 30px;
  @media (max-width: ${MOBILE_WIDTH}) {
    padding: 10px;
  }
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

const CodeElem = ({
  general,
  handleDelete,
  handleDouble,
  handleDrag,
  handleResize,
  editCode,
  statusForCodeBlock,
  elem,
  value,
  size,
  shiftDown
}) => {
  const [elemActive, setElemActive] = useState(false);
  const [code, setCode] = useState('');

  const saveChanges = (newCode) => {
    const newCodeBlock = {
      type: 'code',
      pos: { x: elem.pos.x, y: elem.pos.y },
      size: { height: elem.size.height, width: elem.size.width },
      data: { code: newCode, fontSize: size }
    };

    editCode(newCodeBlock);
  };

  useEffect(() => {
    setCode(value);
  }, [value]);

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
      <CodeContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: TRANSITION_SECS }}>
        <StyledEditor
          value={code}
          className='hljs'
          onBlur={() => {
            saveChanges(code);
            statusForCodeBlock(false);
          }}
          onFocus={() => {
            statusForCodeBlock(true);
          }}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => hljs.highlightAuto(code).value}
          padding={10}
          onMouseDown={(e) => e.stopPropagation()}
          fontSize={size}
        />
      </CodeContainer>
    </ResizeContainer>
  );
};

export default CodeElem;
