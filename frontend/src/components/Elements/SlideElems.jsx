import React, { useEffect, useState } from 'react';
import TextElem from './TextElem';
import ImageElem from './ImgElem';
import VidElem from './VidElems';
import CodeElem from './CodeElem';

const SlideElems = ({
  slide,
  onDeleteElement,
  onDoubleClickForText,
  onDoubleClickForImage,
  onChange,
  editElem,
  onDoubleClickForCode,
  onDoubleClickForVid,
  statusForCodeBlock,
  slideIndex
}) => {
  const handleDeleteElement = (id) => {
    onDeleteElement(id);
  };

  const handleDoubleClick = (id) => {
    onDoubleClickForText(id);
  };

  const handleDoubleClickImage = (id) => {
    onDoubleClickForImage(id);
  };

  const handleDoubleClickCode = (index) => {
    onDoubleClickForCode(index);
  };

  const handleDoubleClickVid = (index) => {
    onDoubleClickForVid(index);
  };

  const [shiftDown, setShiftDown] = useState(false);
  // Listen for shift keys for aspect ratio
  useEffect(() => {
    const handleKeyUp = (event) => {
      if (event.keyCode === 16) {
        setShiftDown(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.keyCode === 16) {
        setShiftDown(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <>
      {Object.keys(slide).map((id) => {
        const elem = slide[id];
        const data = elem.data;
        const general = {
          x: elem.pos?.x ?? 0,
          y: elem.pos?.y ?? 0,
          height: `${elem.size?.height ?? 100}%`,
          width: `${elem.size?.width ?? 100}%`
        };
        const generalProps = {
          general,
          handleDelete: () => handleDeleteElement(id),
          handleDrag: (x, y) => onChange(id, x, y, elem.size.width, elem.size.height),
          handleResize: (x, y, width, height) => onChange(id, x, y, width, height),
          shiftDown
        };

        const uniqueId = `${slideIndex}-${id}`;

        if (elem.type === 'text') {
          const typeProps = {
            ...generalProps,
            handleDouble: () => handleDoubleClick(id),
            font: data.font,
            text: data.text,
            fontSize: data.fontSize,
            color: data.color
          };

          return <TextElem key={uniqueId} {...typeProps} />;
        } else if (elem.type === 'image') {
          const typeProps = {
            ...generalProps,
            handleDouble: () => handleDoubleClickImage(id)
          };
          return <ImageElem key={uniqueId} url={data.url} alt={data.alt} {...typeProps} />;
        } else if (elem.type === 'video') {
          const typeProps = {
            ...generalProps,
            handleDouble: () => handleDoubleClickVid(id),
            url: data.url,
            autoplay: data.autoplay
          };
          return <VidElem key={uniqueId} {...typeProps} />;
        } else if (elem.type === 'code') {
          const typeProps = {
            ...generalProps,
            handleDouble: () => handleDoubleClickCode(id),
            editCode: (newCodeBlock) => editElem(newCodeBlock, id),
            statusForCodeBlock,
            value: data.code,
            size: data.fontSize,
            elem
          };
          return <CodeElem key={uniqueId} {...typeProps} />;
        } else {
          return null;
        }
      })}
    </>
  );
};

export default SlideElems;
