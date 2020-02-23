import React, { useReducer, useCallback, useLayoutEffect, useRef } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { Input, Button, Spin } from 'antd';
import './Gallery.scss';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_URL':
      return { ...state, url: action.payload };
    case 'SET_BUTTON_DISABLED_FALSE':
      return { ...state, disabled: false };
    case 'SET_BUTTON_DISABLED_TRUE':
      return { ...state, disabled: true };
    case 'CLEAR_FORM':
      return { ...state, url: '' };
    case 'FETCH':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, data: action.payload, loading: false, error: false };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: true };
    case 'SET_CONTENT_WIDTH':
      return { ...state, contentWidth: action.payload };
    default:
      throw new Error();
  }
};

const Gallery = () => {
  const initialState = {
    loading: false,
    error: false,
    data: [],
    url:
      'https://don16obqbay2c.cloudfront.net/frontend-test-task/gallery-images.json',
    disabled: false,
    contentWidth: 0
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const { url, disabled, loading, contentWidth } = state;

  const contentRef = useRef(null);

  const onChangeHandler = e => {
    // const isValidUrl = url => {
    //   // eslint-disable-next-line no-useless-escape
    //   const objRE = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
    //   return objRE.test(url);
    // };

    if (
      e.target.value ===
      'https://don16obqbay2c.cloudfront.net/frontend-test-task/gallery-images.json'
    ) {
      dispatch({ type: 'SET_BUTTON_DISABLED_FALSE' });
    } else {
      dispatch({ type: 'SET_BUTTON_DISABLED_TRUE' });
    }

    dispatch({ type: 'SET_URL', payload: e.target.value });
  };

  const clearForm = () => {
    dispatch({ type: 'CLEAR_FORM' });
    dispatch({ type: 'SET_BUTTON_DISABLED_TRUE' });
  };

  const fetchImages = useCallback(() => {
    const fetchApi = async () => {
      try {
        dispatch({ type: 'FETCH' });
        const res = await fetch(`${url}`);
        const { galleryImages } = await res.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: galleryImages });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR' });
        throw new Error(`Error: ${error}`);
      }
    };
    fetchApi();
  }, [url]);

  const onSubmitHandler = e => {
    e.preventDefault();
    fetchImages();
    clearForm();
  };

  useLayoutEffect(() => {
    let animationFrameID = null;
    const observer = new ResizeObserver(entries => {
      const newWidth = entries[0].contentRect.width;
      if (contentWidth !== newWidth) {
        // put in an animation frame to stop "benign errors" from
        // ResizObserver https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
        animationFrameID = window.requestAnimationFrame(() => {
          dispatch({
            type: 'SET_CONTENT_WIDTH',
            payload: Math.floor(newWidth)
          });
        });
      }
    });

    observer.observe(contentRef.current);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrameID);
    };
  });

  console.log(loading);

  return (
    <div className="gallery">
      <div className="gallery__header">
        <form className="gallery__form" onSubmit={onSubmitHandler}>
          <Input
            placeholder="Введите url файла json с данными"
            value={url}
            onChange={onChangeHandler}
          />
          <Button type="primary" htmlType="submit" disabled={disabled}>
            Submit
          </Button>
          <Button type="primary" onClick={clearForm}>
            Clear
          </Button>
        </form>
      </div>
      {!contentWidth ? (
        <div className="gallery__content" ref={contentRef}>
          &nbsp;
        </div>
      ) : (
        <div className="gallery__content" ref={contentRef}>
          {loading && (
            <div className="gallery__spinner">
              <Spin />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { Gallery };
export default Gallery;
