import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, Context } from '../context';
import { getDataStore, setDataStore } from '../helpers';
import styled from 'styled-components';
import LogoutButton from '../components/LogoutButton';

import BackToDashboardButton from '../components/HeaderButtons/BackToDashboardButton';

import Button from 'react-bootstrap/esm/Button';
import PreviewSlideElems from '../PreviewElements/PreviewSlideElems';
import { motion } from 'framer-motion';
import { TRANSITION_SECS } from '../constants';

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const EditHeader = styled.div`
  display: flex;
  min-height: 70px;
  background-color: #0c6dfd;
  font-size: 2em;
  padding-left: 10px;
  padding-top: 3px;
  color: white;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-between;
`;

const EditBody = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: auto 5px;
`;

const VisibleButton = styled(Button)`
  visibility: ${(p) => (p.visibility === 'true' ? 'visible' : 'hidden')};
`;

const Slides = styled.div`
  width: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Slide = styled(motion.div)`
  margin: 50px 0;
  aspect-ratio: 10 / 7;
  width: 95%;
  border: lightgray dashed 2px;
  position: relative;
  overflow: hidden;
  max-height: calc(100vh - 200px);
`;

const SlideNumber = styled.p`
  font-size: 1em;
  font-weight: 500;
  position: absolute;
  bottom: 0;
  margin: 20px;
`;

const StyledLogoutButton = styled(LogoutButton)`
  display: flex;
`;

const Preview = () => {
  const { presentationId, slideId } = useParams();

  // Current presentation data object: {title, desc, thumbnail, history, slides}
  const [presentation, setPresentation] = useState(null);
  // Slides array of current presentation
  const [slides, setSlides] = useState(null);
  // Title of presentation
  const [presentationTitle, setPresentationTitle] = useState('');
  const [atLastSlide, setAtLastSlide] = useState(false);
  const [atFirstSlide, setAtFirstSlide] = useState(false);
  const [defaultBackgroundColor, setDefaultBackgroundColor] = useState('');

  const { getters, setters } = useContext(Context);
  const token = getters.token;
  const setErrorMsg = setters.setErrorMsg;
  const navigate = useNavigate();

  // Current slide number
  const [slideNum, setSlideNum] = useState(parseInt(slideId));

  // Update URL when slideNum changes
  useEffect(() => {
    navigate(`/preview/${presentationId}/${slideNum}`);
  }, [navigate, slideNum]);

  // Listen for arrow keys to change slides
  useEffect(() => {
    const handleKey = (event) => {
      if (event.keyCode === 37 && !atFirstSlide) {
        setSlideNum((s) => s - 1);
      }
      // right arrow
      if (event.keyCode === 39 && !atLastSlide) {
        setSlideNum((s) => s + 1);
      }
    };

    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [atFirstSlide, atLastSlide]);

  // Load presentation at page load
  useEffect(() => {
    const fetchPresentation = async () => {
      const projects = await getDataStore(setErrorMsg, token);
      const userPresentation = projects[presentationId];
      if (userPresentation) {
        setPresentation(userPresentation);
        setPresentationTitle(userPresentation.title);
        setDefaultBackgroundColor(userPresentation.defaultBackgroundColor);
      } else {
        setErrorMsg(`Presentation with ID ${presentationId} not found.`);
      }
    };

    fetchPresentation();
  }, [presentationId]);

  // Update lastSlide and firstSlide
  useEffect(() => {
    if (slides && slideNum === slides.length - 1) {
      setAtLastSlide(true);
    } else {
      setAtLastSlide(false);
    }
    if (slides && slideNum === 0) {
      setAtFirstSlide(true);
    } else {
      setAtFirstSlide(false);
    }
  }, [slideNum, slides]);

  // Update slides variable
  useEffect(() => {
    if (presentation) {
      // TODO: move save function to more efficient place
      saveToStore();
      if (presentation.slides) setSlides(presentation.slides);
    }
  }, [presentation]);

  // Save presentation to database
  const saveToStore = async () => {
    const updated = await getDataStore(setErrorMsg, token);
    updated[presentationId] = presentation;
    setDataStore(updated, setErrorMsg, token);
  };

  if (!presentation) {
    return <div>Loading...</div>;
  }

  // chooses correct object for slide bg color
  const getBackground = (slide) => {
    const color = slide.backgroundColor[0] ? slide.backgroundColor : defaultBackgroundColor;
    return { backgroundImage: `linear-gradient(to right, ${color[0]}, ${color[1] || color[0]})` };
  };

  return (
    <>
      <EditContainer>
        <EditHeader>
          <BackToDashboardButton />
          <h2>{presentationTitle}</h2>
          <StyledLogoutButton />
        </EditHeader>
        <EditBody>
          <ButtonContainer>
            <VisibleButton
              variant='primary'
              visibility={(!atFirstSlide).toString()}
              onClick={() => setSlideNum((s) => s - 1)}
            >
              ⬅
            </VisibleButton>
          </ButtonContainer>
          <Slides>
            {slides && (
              <Slide animate={() => getBackground(slides[slideId])} transition={{ duration: TRANSITION_SECS }}>
                <SlideNumber>{slideNum + 1}</SlideNumber>
                {slides[slideId] && <PreviewSlideElems slide={slides[slideId]} slideIndex={slideId} />}
              </Slide>
            )}
          </Slides>
          <ButtonContainer>
            <VisibleButton
              variant='primary'
              visibility={(!atLastSlide).toString()}
              onClick={() => setSlideNum((s) => s + 1)}
            >
              ➡
            </VisibleButton>
          </ButtonContainer>
        </EditBody>
      </EditContainer>
    </>
  );
};

export default Preview;
