import React, { useContext, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import { exportComponentAsPNG } from 'react-component-export-image';
import { store } from '../../store/store';

// создаем ref на компонент для библиотеки, экспортирующей компонент как PNG
const ComponentToPrint = React.forwardRef((props, ref) => (
  <div className="preview-component" ref={ref}>
    <div className="main-preview" style={{ background: props.color }}>
      <div
        className="main-preview-image"
        style={{
          backgroundImage: `url(${props.backgroundImage})`,
        }}>
        <div className="main-preview-content">
          <div className="main-preview-header">
            <h2>{props.header}</h2>
          </div>
          <div className="main-preview-parag">{props.paragraph}</div>
          {props.button ? (
            <div className="main-preview-button">
              <button>{props.button}</button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  </div>
));

const Preview = () => {
  const globalState = useContext(store);
  const componentRef = useRef();

  const { header, paragraph, button, backgroundImage, backgroundColor } = globalState.state;
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

  //функция для сохранения разметки в буфер обмена
  const saveHtml = () => {
    let html = ReactDOMServer.renderToString(<ComponentToPrint />);
    let inputHTML = document.createElement('input');
    document.body.appendChild(inputHTML);
    inputHTML.setAttribute('id', 'inputHTML_id');
    document.getElementById('inputHTML_id').value = html;
    inputHTML.select();
    document.execCommand('copy');
    document.body.removeChild(inputHTML);
    alert('HTML скопирован в буфер обмена');
  };

  return (
    <>
      <ComponentToPrint
        ref={componentRef}
        header={header}
        color={color}
        paragraph={paragraph}
        button={button}
        backgroundImage={backgroundImage}
      />
      <div className="saveas-wrapper">
        <div className="saveas-main">
          <h2>Сохранить как...</h2>
          <div className="saveas-main-element">
            <button onClick={saveHtml}>Скопировать HTML в буфер обмена</button>
          </div>
          <div className="saveas-main-element">
            {/* сохраняем конфиг из стейта в JSON */}
            <a
              href={`data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(globalState),
              )}`}
              download="config.json">
              <button>Загрузить конфиг как JSON</button>
            </a>
          </div>
          <div className="saveas-main-element">
            <button onClick={() => exportComponentAsPNG(componentRef)}>Экспортировать в PNG</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;
