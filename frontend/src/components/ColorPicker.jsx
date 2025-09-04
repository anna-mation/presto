import React from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';

import styled from 'styled-components';

const ColorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ColorInputContainer = styled.div`
  width: 120px;
  max-height: 40px;
`;

const ColorInput = styled(HexColorInput)`
  text-transform: uppercase;
  text-align: center;
`;

const ColorPicker = ({ color, setColor }) => {
  return (
    <ColorContainer>
      <HexColorPicker className='color-pick' color={color} onChange={setColor} />
      <ColorInputContainer className='input-group'>
        <span className='input-group-text'>#</span>
        <ColorInput className='form-control' color={color} onChange={setColor} />
      </ColorInputContainer>
    </ColorContainer>
  );
};

export default ColorPicker;
