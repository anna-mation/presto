import React from 'react';
import { ToolbarElement } from '../../constants';

const UndoButton = ({ undo }) => {
  return (
    <>
      <ToolbarElement onClick={undo}>Undo ↩️</ToolbarElement>
    </>
  );
};

export default UndoButton;
