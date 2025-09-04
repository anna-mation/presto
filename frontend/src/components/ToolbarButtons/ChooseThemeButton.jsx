import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import ColorPicker from '../ColorPicker';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { HexColorPicker } from 'react-colorful';
import { ToolbarElement } from '../../constants';

const StyledColorPicker = styled(HexColorPicker)`
  width: 100% !important;
  height: 200px !important;
`;

const GradientContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const InnerGradientContainer = styled.div`
  width: 100%;
`;

const FormHeading = styled(Form.Label)`
  font-weight: 500;
`;

const ChooseThemeButton = ({ chooseThemeButton, defaultColor, customColor }) => {
  const [show, setShow] = useState(false);
  const [colorSingle, setColorSingle] = useState('');
  const [colorSingle1, setColorSingle1] = useState('');
  const [colorWhole, setColorWhole] = useState('');
  const [colorWhole1, setColorWhole1] = useState('');
  const [singleType, setSingleType] = useState('solid');
  const [wholeType, setWholeType] = useState('solid');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeColour = (event) => {
    event.preventDefault();
    chooseThemeButton(
      [singleType === 'none' ? '' : colorSingle, singleType === 'solid' ? '' : colorSingle1],
      [colorWhole, wholeType === 'solid' ? '' : colorWhole1]
    );
    handleClose();
  };

  useEffect(() => {
    setColorSingle(customColor[0] || defaultColor[0]);
    setColorSingle1(customColor[1]);

    setColorWhole(defaultColor[0]);
    setColorWhole1(defaultColor[1]);

    if (customColor[1] === '') {
      if (customColor[0] === '') {
        setSingleType('none');
      } else {
        setSingleType('solid');
      }
    } else {
      setSingleType('gradient');
    }
    setWholeType(defaultColor[1] ? 'gradient' : 'solid');
  }, [show]);

  return (
    <>
      <ToolbarElement onClick={handleShow}>Theme 🏡</ToolbarElement>
      <Modal show={show} size='lg' onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Set background color</Modal.Title>
        </Modal.Header>
        <Form onSubmit={changeColour}>
          <Modal.Body>
            <Container>
              <Row>
                <Col>
                  <h3>Current slide</h3>
                  <Form.Group className='mb-3'>
                    <Form.Label>Type</Form.Label>
                    <Form.Control as='select' value={singleType} onChange={(e) => setSingleType(e.target.value)}>
                      <option value='none'>None</option>
                      <option value='solid'>Solid</option>
                      <option value='gradient'>Gradient</option>
                    </Form.Control>
                  </Form.Group>
                  {singleType === 'solid' && (
                    <Form.Group className='mb-3'>
                      <FormHeading>Color</FormHeading>
                      <ColorPicker color={colorSingle} setColor={setColorSingle} />
                    </Form.Group>
                  )}
                  {singleType === 'gradient' && (
                    <Form.Group className='mb-3'>
                      <GradientContainer>
                        <InnerGradientContainer>
                          <FormHeading>Left color</FormHeading>
                          <StyledColorPicker className='color-pick' color={colorSingle} onChange={setColorSingle} />
                        </InnerGradientContainer>
                        <InnerGradientContainer>
                          <FormHeading>Right color</FormHeading>
                          <StyledColorPicker className='color-pick' color={colorSingle1} onChange={setColorSingle1} />
                        </InnerGradientContainer>
                      </GradientContainer>
                    </Form.Group>
                  )}
                </Col>
                <Col>
                  <h3>All slides</h3>
                  <Form.Group className='mb-3'>
                    <Form.Label>Type</Form.Label>
                    <Form.Control as='select' value={wholeType} onChange={(e) => setWholeType(e.target.value)}>
                      <option value='solid'>Solid</option>
                      <option value='gradient'>Gradient</option>
                    </Form.Control>
                  </Form.Group>
                  {wholeType === 'solid' && (
                    <Form.Group className='mb-3'>
                      <FormHeading>Color</FormHeading>
                      <ColorPicker color={colorWhole} setColor={setColorWhole} />
                    </Form.Group>
                  )}
                  {wholeType === 'gradient' && (
                    <Form.Group className='mb-3'>
                      <GradientContainer>
                        <InnerGradientContainer>
                          <FormHeading>Left color</FormHeading>
                          <StyledColorPicker className='color-pick' color={colorWhole} onChange={setColorWhole} />
                        </InnerGradientContainer>
                        <InnerGradientContainer>
                          <FormHeading>Right color</FormHeading>
                          <StyledColorPicker className='color-pick' color={colorWhole1} onChange={setColorWhole1} />
                        </InnerGradientContainer>
                      </GradientContainer>
                    </Form.Group>
                  )}
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' type='submit'>
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ChooseThemeButton;
