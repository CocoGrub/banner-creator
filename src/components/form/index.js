import React, { useState } from 'react';

const Form = () => {
  const handleSubmit = () => {};
  const handleChange = () => {};

  const [value, setValue] = useState('');

  return (
    <div className="form-wrapper">
      <form>
        <div className="form-main">
          <div className="form-main-header">
            <span>Добавить заголовок</span>
          </div>
          <div className="form-main-text">
            <textarea value={value} onChange={handleChange} rows="4" />
          </div>
          <div className="form-main-header">
            <span>Добавить текст</span>
          </div>
          <div className="form-main-text">
            <textarea value={value} onChange={handleChange} rows="4" />
          </div>
          <div className="form-main-header">
            <span>Добавить кнопку</span>
          </div>
          <div className="form-main-text">
            <textarea value={value} onChange={handleChange} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
