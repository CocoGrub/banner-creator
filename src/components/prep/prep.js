import React from 'react';

const Prep = () => {
  // prep = preparation
  return (
    <div className="prep-wrapper">
      <div className="prep">
        <div className="prep-col">
          <button className="prep-element">Загрузить картинку из файла</button>

          <button className="prep-element">Загрузить по URL</button>
        </div>
        <div className="prep-col">
          <button className="prep-element">Заливка цветом</button>
          <button className="prep-element">Градиент</button>
        </div>
      </div>
    </div>
  );
};
export default Prep;
