import React, { useContext, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import { exportComponentAsPNG } from 'react-component-export-image';
import { store } from '../../store/store';

// создаем ref на компонент для библиотеки, экспортирующей компонент как PNG
const ComponentToPrint = React.forwardRef((props, ref) => {
  return (
    <a href={props.url} target="_blank" rel="noopener noreferrer">
      <div className="preview-component" ref={ref}>
        <div className="main-preview" style={{ background: props.color }}>
          <div
            className="main-preview-image"
            style={{
              backgroundImage: `url(${props.backgroundImage})`,
              backgroundPosition: '50%' + props.position + '%',
            }}>
            <div className="main-preview-content">
              <div className="main-preview-header">
                <h2 style={{ color: props.header.color }}>{props.header.text}</h2>
              </div>
              <div className="main-preview-parag" style={{ color: props.paragraph.color }}>
                {props.paragraph.text}
              </div>

              <div className="main-preview-button">
                {props.button.text ? (
                  <button
                    style={{
                      backgroundColor: props.button.buttonColor,
                      color: props.button.color,
                    }}>
                    {props.button.text}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
});

const Preview = () => {
  const globalState = useContext(store);
  const componentRef = useRef();

  const {
    header,
    paragraph,
    button,
    backgroundImage,
    backgroundColor,
    position,
  } = globalState.state;
  let color = '';
  //проверяем бекграунд на градиент или цвет
  if (backgroundColor) {
    if (typeof backgroundColor === 'string') {
      color = backgroundColor;
    }
    if (typeof backgroundColor === 'object') {
      const { angle } = backgroundColor;
      const color1 = backgroundColor.palette[0].color;
      const color2 = backgroundColor.palette[1].color;
      let color3 = '';
      //если градиент с 2-мя параметрами
      if (backgroundColor.palette.length === 2) {
        color = `linear-gradient(${angle}deg,${color1},${color2}`;
      }
      //если градиент с 3-мя параметрами
      if (backgroundColor.palette.length > 2) {
        color3 = backgroundColor.palette[2].color;
        color = `linear-gradient(${angle}deg,${color1},${color2},${color3})`;
      }
    }
  }

  //Вынесем дубликат кода в отдельную функцию
  const saveAnything = (x, y) => {
    const inputHTML = document.createElement('input');
    document.body.appendChild(inputHTML);
    inputHTML.setAttribute('id', 'inputHTML_id');
    document.getElementById('inputHTML_id').value = x;
    inputHTML.select();
    document.execCommand('copy');
    document.body.removeChild(inputHTML);
    alert(`${y} скопирован в буфер обмена`);
  };

  //функция для сохранения разметки в буфер обмена(костыль,надо найти решение получше)
  const saveHtml = () => {
    const html = ReactDOMServer.renderToString(
      <ComponentToPrint
        ref={componentRef}
        header={header}
        color={color}
        paragraph={paragraph}
        button={button}
        backgroundImage={backgroundImage.background}
        position={position}
        url={backgroundImage.url}
      />,
    );
    saveAnything(html, 'HTML');
  };

  const SaveJSON = () => {
    const html = JSON.stringify(globalState);
    saveAnything(html, 'JSON');
  };
  return (
    <>
      <ComponentToPrint
        ref={componentRef}
        header={header}
        position={position}
        color={color}
        paragraph={paragraph}
        button={button}
        backgroundImage={backgroundImage.background}
        url={backgroundImage.url}
      />
      <div className="saveas-wrapper">
        <div className="saveas-main">
          <h2>Сохранить как...</h2>
          <div className="saveas-main-element">
            <button className="custom-button" onClick={saveHtml}>
              Скопировать HTML в буфер обмена
            </button>
          </div>
          <div className="saveas-main-element">
            {/* сохраняем конфиг из стейта в JSON */}

            <button className="custom-button" onClick={() => SaveJSON()}>
              Скопировать JSON в буфер обмена
            </button>
          </div>
          <div className="saveas-main-element">
            <button className="custom-button" onClick={() => exportComponentAsPNG(componentRef)}>
              Экспортировать в PNG
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;
