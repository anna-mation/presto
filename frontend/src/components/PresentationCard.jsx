import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { MOBILE_WIDTH } from '../constants';

const StyledCard = styled(Card)`
  width: calc(33% - 10px);
  aspect-ratio: 2 / 1;
  margin-bottom: 20px;
  min-width: 100px;
  cursor: pointer;

  @media (max-width: ${MOBILE_WIDTH}) {
    width: calc(50% - 10px);
  }
`;

const CardHeader = styled.div`
  width: 100%;
  padding-top: 25%;
  position: relative;
`;

const CardImage = styled(Card.Img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: ${MOBILE_WIDTH}) {
    display: block;
  }
`;

const SmallerButton = styled(Button)`
  font-size: 0.8rem;
  margin: auto 2px;
`;

const PresentationCard = ({ projectId, projects }) => {
  const navigate = useNavigate();
  const [previewHover, setPreviewHover] = useState(false);

  return (
    <StyledCard
      onClick={() => {
        if (!previewHover) navigate(`/edit/${projectId}/0`);
      }}
      key={projectId}
    >
      <CardHeader>
        <CardImage
          alt={`presentation ${projectId} thumbnail image`}
          src={!projects[projectId].thumbnail ? '../default_pfp.png' : projects[projectId].thumbnail}
        />
      </CardHeader>
      <Card.Body>
        <FlexBox>
          <Card.Title>{projects[projectId].title}</Card.Title>
          <SmallerButton
            variant='primary'
            onMouseEnter={() => setPreviewHover(true)}
            onMouseLeave={() => setPreviewHover(false)}
            onClick={() => navigate(`/preview/${projectId}/0`)}
          >
            Preview
          </SmallerButton>
        </FlexBox>
        <Card.Text>{projects[projectId].desc}</Card.Text>
      </Card.Body>
    </StyledCard>
  );
};

export default PresentationCard;
