import React, { useEffect, useState } from 'react';
import PreviewTextElem from './PreviewTextElem';
import PreviewImgElem from './PreviewImgElem';
import PreviewVidElem from './PreviewVidElem';
import PreviewCodeElem from './PreviewCodeElem';

const PreviewSlideElems = ({
  slide,
  slideIndex
}) => {
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
          width: `${elem.size?.width ?? 100}%`,
        };

        const generalProps = {
          general,
          shiftDown,
          id: `${slideIndex}-${id}`
        };

        if (elem.type === 'text') {
          const typeProps = {
            ...generalProps,
            font: data.font,
            text: data.text,
            fontSize: data.fontSize,
            color: data.color
          };

          return <PreviewTextElem key={id} {...typeProps} />;
        } else if (elem.type === 'image') {
          const typeProps = {
            ...generalProps,
          };
          return <PreviewImgElem key={id} url={data.url} alt={data.alt} {...typeProps} />;
        } else if (elem.type === 'video') {
          const typeProps = {
            ...generalProps,
            url: data.url,
            autoplay: data.autoplay,
            index: id,
            elem
          };
          return <PreviewVidElem key={id} {...typeProps} />;
        } else if (elem.type === 'code') {
          const typeProps = {
            ...generalProps,
            value: data.code,
            size: data.fontSize,
            elem
          };
          return <PreviewCodeElem key={id} {...typeProps} />;
        } else {
          return null;
        }
      })}
    </>
  );
};

export default PreviewSlideElems;
