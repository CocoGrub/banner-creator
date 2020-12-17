import React, { useContext, useEffect } from 'react';
import { store } from '../../store/store';
import { updateTextAC } from '../../store/actions';
const Form = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const [value, setValue] = React.useState({
    header: {
      text: '',
      color: '#000000',
    },
    paragraph: { text: '', color: '#000000' },
    button: {
      text: '',
      color: '#000000',
      buttonColor: '#000000',
    },
  });

  //Все изменения инпутов обрабатываются этой функцией. variable = это свойство изменямого стейта
  const handleChange = (e, variable) => {
    setValue({
      ...value,
      [e.target.name]: { ...value[e.target.name], [variable]: e.target.value },
    });
  };
  //при каждом изменении стейта, диспатчим их в глобальный стор
  useEffect(() => {
    dispatch(updateTextAC(value));
  }, [value, dispatch]);

  const { header, paragraph, button } = value;
  return (
    <div className="form-wrapper">
      <form>
        <div className="form-main">
          <div className="form-main-header">
            <span>Заголовок</span>
            <label htmlFor="header">цвет </label>
            {/* интегрируем стандартый HTML color пикер */}
            <input
              name="header"
              type="color"
              value={header.color}
              onChange={(e) => handleChange(e, 'color')}
            />
          </div>
          <div className="form-main-text">
            <textarea
              name="header"
              value={header.text}
              onChange={(e) => handleChange(e, 'text')}
              rows="4"
            />
          </div>
          <div className="form-main-header">
            <span>Параграф</span>
            <label htmlFor="paragraph">цвет </label>
            <input
              name="paragraph"
              type="color"
              value={paragraph.color}
              onChange={(e) => handleChange(e, 'color')}
            />
          </div>
          <div className="form-main-text">
            <textarea
              name="paragraph"
              value={paragraph.text}
              onChange={(e) => handleChange(e, 'text')}
              rows="4"
            />
          </div>
          <div className="form-main-header">
            <span>Кнопка</span>
            <label htmlFor="button">цвет </label>
            <input
              name="button"
              type="color"
              value={button.color}
              onChange={(e) => handleChange(e, 'color')}
            />
            <label htmlFor="buttonColor">цвет кнопки</label>
            <input
              name="button"
              type="color"
              value={button.buttonColor}
              onChange={(e) => handleChange(e, 'buttonColor')}
            />
          </div>
          <div className="form-main-text">
            <textarea name="button" value={button.text} onChange={(e) => handleChange(e, 'text')} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
