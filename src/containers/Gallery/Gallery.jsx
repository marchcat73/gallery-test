import React, { useReducer, useCallback } from 'react';
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
    disabled: false
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const { url, disabled, loading } = state;

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
      {loading && <Spin />}
    </div>
  );
};

export { Gallery };
export default Gallery;
