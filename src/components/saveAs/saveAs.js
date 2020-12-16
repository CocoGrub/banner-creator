import React, { useContext } from 'react';
import { store } from '../../store/store';
const SaveAs = () => {
  const globalState = useContext(store);

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
          <a
            href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(globalState))}`}
            download="config.json">
            {`Скачать конфиг в  Json`}
          </a>
        </div>
      </div>
    </div>
  );
};

export default SaveAs;
