import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, Context } from '../context';
import { getDataStore, setDataStore } from '../helpers';
import styled from 'styled-components';
import equal from 'deep-equal';
import deepcopy from 'deepcopy';

import BackToDashboardButton from '../components/HeaderButtons/BackToDashboardButton';
import EditInfoButton from '../components/HeaderButtons/EditInfoButton';
import SlideElems from '../components/Elements/SlideElems';
import DeletePresentationModal from '../components/ConfirmModals/DeletePresentationModal';
import DeleteConfirmModal from '../components/ConfirmModals/DeleteConfirmModal';
import AddTextButton from '../components/AddButtons/AddTextButton';
import AddImgButton from '../components/AddButtons/AddImgButton';
import EditImageModal from '../components/EditModals/EditImageModal';
import AddVidButton from '../components/AddButtons/AddVidButton';
import AddCodeButton from '../components/AddButtons/AddCodeButton';
import EditCodeModal from '../components/EditModals/EditCodeModal';
import ChooseThemeButton from '../components/ToolbarButtons/ChooseThemeButton';
import UndoButton from '../components/ToolbarButtons/UndoButton';
import LogoutButton from '../components/LogoutButton';

import Button from 'react-bootstrap/esm/Button';
import EditModal from '../components/EditModals/EditElementModal';
import EditSlidesButton from '../components/ToolbarButtons/EditSlidesButton';
import HistoryButton from '../components/ToolbarButtons/HistoryButton';
import HistoryConfirmModal from '../components/ConfirmModals/HistoryConfirmModal';
import { motion } from 'framer-motion';
import DeleteSlideConfirmModal from '../components/ConfirmModals/DeleteSlideConfirmModal';
import { MOBILE_WIDTH, TRANSITION_SECS } from '../constants';
import EditVidModal from '../components/EditModals/EditVidModal';

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
  gap: 10px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex: 1;
`;

const MainFlexContainer = styled(FlexContainer)`
  @media (max-width: ${MOBILE_WIDTH}) {
    flex-direction: column-reverse;
  }
`;

const SubFlexContainer = styled(FlexContainer)`
  @media (max-width: ${MOBILE_WIDTH}) {
    flex-direction: column;
  }
`;

const Toolbar = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 150px;
  justify-content: center;

  @media (max-width: ${MOBILE_WIDTH}) {
    flex-direction: row;
    border: none;
    width: 100%;
    flex-wrap: wrap;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: auto 5px;
  flex-direction: column;

  @media (max-width: ${MOBILE_WIDTH}) {
    flex-direction: row;
    margin: 0 50px;
  }
`;

const MobileShow = styled(ButtonContainer)`
  display: none;
  @media (max-width: ${MOBILE_WIDTH}) {
    display: flex;
  }
`;

const MobileHide = styled(ButtonContainer)`
  display: flex;
  @media (max-width: ${MOBILE_WIDTH}) {
    display: none;
  }
`;

const MobileContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const VisibleButton = styled(Button)`
  display: ${(p) => p.display};
`;

const Slides = styled.div`
  width: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

const Slide = styled(motion.div)`
  margin: 50px 0;
  aspect-ratio: 10 / 7;
  width: 95%;
  border: lightgray dashed 2px;
  position: relative;
  overflow: hidden;
  max-height: calc(100vh - 200px);

  @media (max-width: ${MOBILE_WIDTH}) {
    margin: 20px 0;
  }
`;

const SlideNumber = styled.p`
  font-size: 1em;
  font-weight: 500;
  position: absolute;
  bottom: 0;
  margin: 20px;

  @media (max-width: ${MOBILE_WIDTH}) {
    font-size: 0.8em;
    margin: 10px;
  }
`;

const Title = styled.h2`
  margin-left: 20px;
`;

const StyledLogoutButton = styled(LogoutButton)`
  display: flex;
`;

const Edit = () => {
  const { presentationId, slideId } = useParams();

  // Current presentation data object: {title, desc, thumbnail, history, slides}
  const [presentation, setPresentation] = useState(null);
  // Slides array of current presentation
  const [slides, afterSetSlides] = useState(null);
  // Title of presentation
  const [presentationTitle, setPresentationTitle] = useState('');
  const [atLastSlide, setAtLastSlide] = useState(false);
  const [atFirstSlide, setAtFirstSlide] = useState(false);
  // Show presentation deletion modal
  const [showDelete, setShowDelete] = useState(false);
  // Show slide deletion modal
  const [showDeleteSlide, setShowDeleteSlide] = useState(false);
  // State variable to store the deleted element index
  const [deleteElemIndex, setDeleteElemIndex] = useState(null);
  // Show edit presentation modal for text
  const [showEditModal, setShowEditModal] = useState(false);
  // Show edit presentation modal for images
  const [showEditImageModal, setShowEditImageModal] = useState(false);
  // Show edit presentation modal for code blocks
  const [showEditCodeModal, setShowEditCodeModal] = useState(false);
  // Show edit presentation modal for code blocks
  const [showEditVidModal, setShowEditVidModal] = useState(false);
  // State variable to store the element index
  const [editingElementIndex, setEditingElementIndex] = useState(null);
  // Show confirm history clear modal
  const [showHistoryConfirm, setShowHistoryConfirm] = useState(false);
  // State variable to store the default background color
  const [defaultBackgroundColor, setDefaultBackgroundColor] = useState('');
  // State variable to store if the arrow keys should work
  const [arrowKeysDisable, setArrowKeysDisable] = useState(false);

  const { getters, setters } = useContext(Context);
  const token = getters.token;
  const setErrorMsg = setters.setErrorMsg;
  const navigate = useNavigate();

  // Current slide number
  const [slideNum, setSlideNum] = useState(parseInt(slideId));

  // Update URL when slideNum changes
  useEffect(() => {
    navigate(`/edit/${presentationId}/${slideNum}`);
  }, [navigate, slideNum]);

  useEffect(() => {
    if (showEditModal || showEditImageModal || showEditCodeModal || showEditVidModal || showHistoryConfirm) {
      setArrowKeysDisable(true);
    } else {
      setArrowKeysDisable(false);
    }
  }, [showEditModal, showEditImageModal, showEditCodeModal, showEditVidModal, showHistoryConfirm]);
  // Listen for arrow keys to change slides
  useEffect(() => {
    const handleKey = (event) => {
      if (event.keyCode === 37 && !atFirstSlide && !arrowKeysDisable) {
        setSlideNum((s) => s - 1);
      }
      // right arrow
      if (event.keyCode === 39 && !atLastSlide && !arrowKeysDisable) {
        setSlideNum((s) => s + 1);
      }
    };

    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [atFirstSlide, atLastSlide, arrowKeysDisable]);

  const setSlides = (newSlides) => {
    // save old slides to history
    if (slides && (!presentation.history[0] || !equal(presentation.history[0].data, newSlides))) {
      const oldSlides = deepcopy(slides);
      const time = new Date().toLocaleString();
      const updatedHistory = [{ timestamp: time, data: oldSlides }, ...presentation.history];

      setPresentation((prevPresentation) => ({
        ...prevPresentation,
        history: updatedHistory
      }));
    }
    afterSetSlides(newSlides);
  };

  // clear presentation history
  const clearHistory = () => {
    setPresentation({ ...presentation, history: [] });
  };

  // revert presentation history
  const revertHistory = (index) => {
    const updated = { ...presentation };
    if (updated.history[1]) {
      const history = updated.history;
      for (let i = 0; i < index; i++) {
        history.shift();
      }
      updated.slides = deepcopy(history[0].data);
      setPresentation(updated);
    }
  };

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
      saveToStore();
      setSlides(presentation.slides);
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

  // Editing the title, desc, image of the entire presentation
  const onPresentationEdit = (title, desc, image) => {
    setPresentationTitle(title);
    setPresentation({ ...presentation, title, desc, thumbnail: image });
  };

  // Deleting the entire presentation
  const deletePresentation = async () => {
    const presentations = await getDataStore(setErrorMsg, token);
    // Filter out the presentation with the specified presentationId
    const filteredPresentations = {};
    for (const key in presentations) {
      if (key !== presentationId) {
        // Exclude the presentation with the specified ID
        filteredPresentations[key] = presentations[key];
      }
    }
    // Update the backend with the filtered presentations
    setDataStore(filteredPresentations, setErrorMsg, token);

    navigate('/dashboard');
  };

  // Creating an individual slide
  const createSlide = () => {
    setPresentation({
      ...presentation,
      slides: [...slides, { backgroundColor: ['', ''] }]
    });

    setSlideNum((s) => s + 1);
  };

  // Deleting an individual slide
  const deleteSlide = () => {
    const updatedSlides = [...presentation.slides];
    updatedSlides.splice(slideNum, 1);

    setPresentation({ ...presentation, slides: updatedSlides });

    // Only move backwards if we ware not deleting the first slide
    if (!atFirstSlide) {
      setSlideNum((s) => s - 1);
    } else if (slides.length === 1) {
      setAtLastSlide(true);
    }
  };

  // Helper function to get the next available ID for a new element in the given slide
  const getNextId = (slide) => {
    const elemIds = Object.keys(slide);
    return elemIds.length !== 1 ? Number(elemIds[elemIds.length - 2]) + 1 : 0;
  };

  // Adding in a text box on a single slide
  const addElem = (newElem) => {
    const updated = { ...presentation };
    const specificSlide = updated.slides[slideNum];

    specificSlide[getNextId(specificSlide)] = newElem;

    // Update the presentation state with the modified data
    setPresentation(updated);
  };

  const onDeleteElement = (index) => {
    const updated = { ...presentation };
    const specificSlide = updated.slides[slideNum];

    delete specificSlide[index];

    // Update the presentation state with the modified data
    setPresentation(updated);
  };

  const onDoubleClickForText = (index) => {
    setShowEditModal(true);
    setEditingElementIndex(index);
  };

  const editElem = (newElem, indexOpt) => {
    // Use the stored index from state
    const index = indexOpt || editingElementIndex;

    const updated = { ...presentation };
    const specificSlide = updated.slides[slideNum];

    // Replace the existing element at the specified index with the newTextBox
    specificSlide[index] = newElem;

    // Update the presentation state with the modified data
    setPresentation(updated);
  };

  const onDoubleClickForImage = (index) => {
    setShowEditImageModal(true);
    setEditingElementIndex(index);
  };

  // Changes position and size of element on drag/resize
  const onChange = (index, x, y, width, height) => {
    const updated = { ...presentation };
    const specificElem = updated.slides[slideNum][index];
    specificElem.pos.x = x;
    specificElem.pos.y = y;
    specificElem.size.width = width;
    specificElem.size.height = height;
    setPresentation(updated);
  };

  const onDoubleClickForCode = (index) => {
    setShowEditCodeModal(true);
    setEditingElementIndex(index);
  };

  const onDoubleClickForVid = (index) => {
    setShowEditVidModal(true);
    setEditingElementIndex(index);
  };

  const swapSlides = (newOrder) => {
    const updated = { ...presentation };

    const reorderedData = [];
    newOrder.forEach((index) => {
      reorderedData.push(slides[index - 1]);
    });

    updated.slides = reorderedData;

    // Update the presentation state with the modified data
    setPresentation(updated);
  };

  // sets new background colors
  const chooseThemeButton = (colorSingle, colorWhole) => {
    setDefaultBackgroundColor(colorWhole);

    const presentationData = { ...presentation };
    const specificSlide = presentationData.slides[slideNum];
    specificSlide.backgroundColor = colorSingle;

    presentationData.defaultBackgroundColor = colorWhole;

    setPresentation({ ...presentationData });
  };

  // chooses correct object for slide bg color
  const getBackground = (slide) => {
    const color = slide.backgroundColor[0] ? slide.backgroundColor : defaultBackgroundColor;
    return { backgroundImage: `linear-gradient(to right, ${color[0]}, ${color[1] || color[0]})` };
  };

  // check if we should delete the slide or delete the presentation
  const checkDeleteSlide = () => {
    // If we are on the first and only slide
    if (atFirstSlide && slides.length === 1) {
      setShowDelete(true);
    } else {
      setShowDeleteSlide(true);
    }
  };

  return (
    <>
      <DeletePresentationModal
        show={showDelete}
        handleClose={() => setShowDelete(false)}
        deletePresentation={deletePresentation}
      />
      <DeleteConfirmModal
        show={deleteElemIndex}
        handleClose={() => setDeleteElemIndex(null)}
        deleteElem={() => onDeleteElement(deleteElemIndex)}
      />
      <DeleteSlideConfirmModal
        show={showDeleteSlide}
        handleClose={() => setShowDeleteSlide(false)}
        deleteSlide={deleteSlide}
      />
      <HistoryConfirmModal
        show={showHistoryConfirm}
        handleClose={() => setShowHistoryConfirm(false)}
        clearHistory={clearHistory}
      />
      {slides && slides[slideNum] && slides[slideNum][editingElementIndex] && (
        <>
          <EditModal
            show={showEditModal}
            handleClose={() => setShowEditModal(false)}
            editModal={editElem}
            elem={slides[slideNum][editingElementIndex]}
            deleteElem={() => setDeleteElemIndex(editingElementIndex)}
          />
          <EditImageModal
            show={showEditImageModal}
            handleClose={() => setShowEditImageModal(false)}
            editImageModal={editElem}
            elem={slides[slideNum][editingElementIndex]}
            deleteElem={() => setDeleteElemIndex(editingElementIndex)}
          />
          <EditCodeModal
            show={showEditCodeModal}
            handleClose={() => setShowEditCodeModal(false)}
            editCodeModal={editElem}
            elem={slides[slideNum][editingElementIndex]}
            deleteElem={() => setDeleteElemIndex(editingElementIndex)}
          />
          <EditVidModal
            show={showEditVidModal}
            handleClose={() => setShowEditVidModal(false)}
            editVideo={editElem}
            elem={slides[slideNum][editingElementIndex]}
            deleteElem={() => setDeleteElemIndex(editingElementIndex)}
          />
        </>
      )}
      <EditContainer>
        <EditHeader>
          <FlexContainer>
            <BackToDashboardButton name='back-to-dashboard' />
            <Title>{presentationTitle}</Title>
          </FlexContainer>
          <EditInfoButton presentation={presentation} onPresentationEdit={onPresentationEdit} />
          <Button
            variant='primary'
            name='delete-presentation'
            onClick={() => {
              setShowDelete(true);
            }}
          >
            Delete
          </Button>
          <StyledLogoutButton />
        </EditHeader>
        <MainFlexContainer>
          <Toolbar>
            <UndoButton undo={() => revertHistory(1)} />
            <br />
            <AddTextButton addTextBox={addElem} statusForTextBlock={setArrowKeysDisable} />
            <AddImgButton addImgBox={addElem} statusForImgBlock={setArrowKeysDisable} />
            <AddVidButton addVidBox={addElem} statusForVidBlock={setArrowKeysDisable} />
            <AddCodeButton addCodeBox={addElem} statusForCodeBlock={setArrowKeysDisable} />
            <br />
            {slides && <EditSlidesButton swapSlides={swapSlides} numSlides={slides.length} />}
            <HistoryButton
              showConfirm={() => setShowHistoryConfirm(true)}
              history={presentation.history}
              revertHistory={(index) => revertHistory(index)}
            />
            {slides && slides[slideNum] && (
              <ChooseThemeButton
                chooseThemeButton={chooseThemeButton}
                defaultColor={defaultBackgroundColor}
                customColor={slides[slideNum].backgroundColor}
              />
            )}
          </Toolbar>
          <SubFlexContainer>
            <MobileHide>
              <VisibleButton
                variant='primary'
                display={atFirstSlide ? 'none' : 'block'}
                onClick={() => setSlideNum((s) => s - 1)}
                title='Previous slide'
                aria-label='Previous slide'
              >
                ⬅
              </VisibleButton>
              <Button variant='light' onClick={checkDeleteSlide} title='Delete slide' aria-label='Delete slide'>
                ✖️
              </Button>
            </MobileHide>
            <Slides>
              {slides && slides[slideNum] && (
                <Slide animate={() => getBackground(slides[slideId])} transition={{ duration: TRANSITION_SECS }}>
                  <SlideNumber name='slide-number'>{slideNum + 1}</SlideNumber>
                  {slides[slideId] && (
                    <SlideElems
                      slide={slides[slideId]}
                      onDeleteElement={setDeleteElemIndex}
                      onDoubleClickForText={onDoubleClickForText}
                      onDoubleClickForImage={onDoubleClickForImage}
                      onChange={onChange}
                      onDoubleClickForCode={onDoubleClickForCode}
                      onDoubleClickForVid={onDoubleClickForVid}
                      editElem={editElem}
                      statusForCodeBlock={setArrowKeysDisable}
                      slideIndex={slideId}
                    />
                  )}
                </Slide>
              )}
            </Slides>
            <MobileContainer>
              <MobileShow>
                <Button variant='light' onClick={checkDeleteSlide} title='Delete slide' aria-label='Delete slide'>
                  ✖️
                </Button>
                <VisibleButton
                  variant='primary'
                  display={atFirstSlide ? 'none' : 'block'}
                  onClick={() => setSlideNum((s) => s - 1)}
                  title='Previous slide'
                  aria-label='Previous slide'
                >
                  ⬅
                </VisibleButton>
              </MobileShow>
              <ButtonContainer>
                <VisibleButton
                  variant='primary'
                  display={atLastSlide ? 'none' : 'block'}
                  onClick={() => setSlideNum((s) => s + 1)}
                  title='Next slide'
                  aria-label='Next slide'
                >
                  ➡
                </VisibleButton>
                <Button variant='light' onClick={createSlide} title='Add slide' aria-label='Add slide'>
                  ➕
                </Button>
              </ButtonContainer>
            </MobileContainer>
          </SubFlexContainer>
        </MainFlexContainer>
      </EditContainer>
    </>
  );
};

export default Edit;
