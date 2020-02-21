import React, { useReducer } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Input, Button } from 'antd';
import './Gallery.scss';

const validator = new SimpleReactValidator();

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
    url: '',
    disabled: true
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { url, loading, error, data, disabled } = state;

  const onChangeHandler = e => {
    if (validator.allValid()) {
      dispatch({ type: 'SET_BUTTON_DISABLED_FALSE' });
    }

    dispatch({ type: 'SET_URL', payload: e.target.value });
  };

  const clearForm = () => {
    dispatch({ type: 'CLEAR_FORM' });
    dispatch({ type: 'SET_BUTTON_DISABLED_TRUE' });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    console.log(url);
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
          {validator.message('url', url, 'required|url')}
          <Button type="primary" htmlType="submit" disabled={disabled}>
            Submit
          </Button>
          <Button type="primary" onClick={clearForm}>
            Clear
          </Button>
        </form>
      </div>
    </div>
  );
};

export { Gallery };
export default Gallery;
