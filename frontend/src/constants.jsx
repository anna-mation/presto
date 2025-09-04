import styled from 'styled-components';
import { HandleBottomLeft, HandleBottomRight, HandleTopLeft, HandleTopRight } from './components/handles';
import Button from 'react-bootstrap/esm/Button';

export const BACKEND_PORT = 5005;
export const resizeHandleComponent = {
  bottomLeft: HandleBottomLeft(),
  bottomRight: HandleBottomRight(),
  topLeft: HandleTopLeft(),
  topRight: HandleTopRight()
};
export const enableResizing = {
  bottom: false,
  left: false,
  right: false,
  top: false,
  bottomLeft: true,
  bottomRight: true,
  topLeft: true,
  topRight: true
};
export const TRANSITION_SECS = 0.5;
export const ToolbarElement = styled(Button)`
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 1.2em;
  background-color: #ebf3ff;
  border: none;
  color: black;
  padding: 10px;
  max-width: 175px;
`;
export const MOBILE_WIDTH = '700px';
