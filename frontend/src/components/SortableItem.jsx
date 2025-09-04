import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styled from 'styled-components';
import { MOBILE_WIDTH } from '../constants';

const StyledDiv = styled.div.attrs((props) => ({
  style: {
    transform: CSS.Transform.toString(props.transform)
  }
}))`
  background: #f0f0f0;
  padding: 20px;
  margin: 5px;
  min-width: 120px;
  min-height: 84px;
  align-content: center;
  border-radius: 5px;
  touch-action: none;

  @media (max-width: ${MOBILE_WIDTH}) {
    min-width: 80px;
    min-height: 56px;
  }
`;

const Num = styled.p`
  text-align: center;
  margin: 0;
  font-weight: 500;
`;

const SortableItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

  const style = {
    transition
  };

  return (
    <StyledDiv transform={transform} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Num>{props.id}</Num>
    </StyledDiv>
  );
};

export default SortableItem;
