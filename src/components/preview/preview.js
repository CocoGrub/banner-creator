import React, { useContext } from 'react';
import { store } from '../../store/store';
const Preview = () => {
  const globalState = useContext(store);

  const { header, paragraph, button, backgroundImage, backgroundColor } = globalState.state;
  let color = '';
  if (backgroundColor) {
    if (typeof backgroundColor === 'string') {
      color = backgroundColor;
    }
    if (typeof backgroundColor === 'object') {
      const { angle } = backgroundColor;
      const color1 = backgroundColor.palette[0].color;
      const color2 = backgroundColor.palette[1].color;
      let color3 = '';
      if (backgroundColor.palette.length === 2) {
        //если градиент с 2-мя параметрами
        color = `linear-gradient(${angle}deg,${color1},${color2}`;
      }

      if (backgroundColor.palette.length > 2) {
        //если градиент с 3-мя параметрами
        color3 = backgroundColor.palette[2].color;
        color = `linear-gradient(${angle}deg,${color1},${color2},${color3})`;
      }
    }
  }

  return (
    <div className="preview-component">
      <div className="main-preview" style={{ background: color, position: 'absolute', zIndex: 1 }}>
        <div
          className="main-preview-image"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            zIndex: 2,
            position: 'absolute',
            width: '100%',
          }}>
          <div className="main-preview-content">
            <div className="main-preview-header">
              <h2>{header}</h2>
            </div>
            <div className="main-preview-parag">{paragraph}</div>
            {button ? (
              <div className="main-preview-button">
                <button>{button}</button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
