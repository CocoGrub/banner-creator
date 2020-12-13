import React, { useState } from 'react';

const Form = () => {
  const handleSubmit = () => {};
  const handleChange = () => {};

  const [value, setValue] = useState('');

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Сочинение:
          <textarea value={value} onChange={handleChange} />
        </label>
        <input type="submit" value="Отправить" />
      </form>
    </div>
  );
};

export default Form;
