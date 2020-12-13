import React from 'react';

const SaveAs = () => {
  return (
    <div className="saveas-wrapper">
      <div className="saveas-main">
        <h2>Сохранить как...</h2>
        <div className="saveas-main-element">
          <button>Скопировать JSX в буфер обмена</button>
        </div>
        <div className="saveas-main-element">
          <button>Сохранить картинку в PNG</button>
        </div>
        <div className="saveas-main-element">
          <button>Сохранить конфиг в JSON</button>
        </div>
      </div>
    </div>
  );
};

export default SaveAs;
