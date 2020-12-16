import React, { useContext, useEffect } from 'react';
import { store } from '../../store/store';
import { updateTextAC } from '../../store/actions';
const Form = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const [value, setValue] = React.useState({
    header: '',
    paragraph: '',
    button: '',
  });
  const handleChange = (e) => {
    setValue({
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(updateTextAC(value));
  }, [value, dispatch]);
  const { header, paragraph, button } = value;
  return (
    <div className="form-wrapper">
      <form>
        <div className="form-main">
          <div className="form-main-header">
            <span>Добавить заголовок</span>
          </div>
          <div className="form-main-text">
            <textarea name="header" value={header} onChange={handleChange} rows="4" />
          </div>
          <div className="form-main-header">
            <span>Добавить текст</span>
          </div>
          <div className="form-main-text">
            <textarea name="paragraph" value={paragraph} onChange={handleChange} rows="4" />
          </div>
          <div className="form-main-header">
            <span>Добавить кнопку</span>
          </div>
          <div className="form-main-text">
            <textarea name="button" value={button} onChange={handleChange} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
