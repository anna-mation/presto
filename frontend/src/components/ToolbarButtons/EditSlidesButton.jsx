import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import styled from 'styled-components';
import SortableItem from '../SortableItem';
import { MOBILE_WIDTH, ToolbarElement } from '../../constants';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10;
  padding: 10;

  @media (max-width: ${MOBILE_WIDTH}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const RearrangeModal = ({ swapSlides, numSlides }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [order, setOrder] = useState(Array.from({ length: numSlides }, (unused, index) => index + 1));

  useEffect(() => {
    // Update the order array
    setOrder(Array.from({ length: numSlides }, (unused, index) => index + 1));
  }, [show]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setOrder((order) => {
        const oldIndex = order.indexOf(active.id);
        const newIndex = order.indexOf(over.id);

        return arrayMove(order, oldIndex, newIndex);
      });
    }
  };

  return (
    <>
      <ToolbarElement onClick={handleShow}>Slides 🔀</ToolbarElement>
      <Modal show={show} onHide={handleClose} size='lg' centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Rearrange slides</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={order} strategy={rectSortingStrategy}>
              <Grid>
                {order.map((id) => (
                  <SortableItem key={id} id={id} />
                ))}
              </Grid>
            </SortableContext>
          </DndContext>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            variant='primary'
            onClick={() => {
              handleClose();
              swapSlides(order);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RearrangeModal;
