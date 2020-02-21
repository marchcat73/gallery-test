import React, { useReducer } from 'react';
import { Input, Button } from 'antd';
import './Gallery.scss';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_URL':
      return { ...state, url: action.payload };
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
    url: ''
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { url, loading, error, data } = state;

  const onChangeHandler = e => {
    const { name, value } = e.target;
    const payload = { [name]: value };
    const { url } = payload;
    dispatch({ type: 'SET_URL', payload: url });
  };

  console.log(url);

  return (
    <div className="gallery">
      <div className="gallery__header">
        <form className="gallery__form">
          <Input
            name="url"
            placeholder="Введите url файла json с данными"
            value={url}
            onChange={onChangeHandler}
          />
          <Button type="primary">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export { Gallery };
export default Gallery;
