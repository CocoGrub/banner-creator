import React, { useContext, useEffect, useState } from 'react';
import { store } from '../../store/store';
import { updateColorAC, updateImageAC, updateImagePositionAC } from '../../store/actions';
import { SketchPicker } from 'react-color';
import { GradientPickerPopover } from 'react-linear-gradient-picker';
import 'react-color-gradient-picker/dist/index.css';

//необходимые операции для библиотеки градиента
const rgbToRgba = (rgb, a = 1) => rgb.replace('rgb(', 'rgba(').replace(')', `, ${a})`);

const WrappedSketchPicker = ({ onSelect, ...rest }) => {
  return (
    <SketchPicker
      {...rest}
      color={rgbToRgba(rest.color, rest.opacity)}
      onChange={(c) => {
        const { r, g, b, a } = c.rgb;
        onSelect(`rgb(${r}, ${g}, ${b})`, a);
      }}
    />
  );
};

const initialPallet = [
  { offset: '0.00', color: 'rgb(238, 241, 11)' },
  { offset: '1.00', color: 'rgb(126, 32, 207)' },
];

const BackgroundSetter = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const [background, setBackground] = useState('');

  const [imagePositionY, setImagePositionY] = useState(100);

  const [open, setOpen] = useState(false);
  const [angle, setAngle] = useState(90);
  const [palette, setPalette] = useState(initialPallet);

  const [colorValue, setColorValue] = React.useState('#ffcfef');

  const setColor = (e) => {
    setColorValue(e.target.value);
  };

  //градиент и цвет обновляем в глобальном стейте только после подтверждения, так как операция затратна
  const sumbitGrad = () => {
    dispatch(updateColorAC({ palette, angle }));
  };

  const sumbitColor = () => {
    dispatch(updateColorAC(colorValue));
  };
  //при каждом измении стейта картинки диспатчим ее в стейт
  useEffect(() => {
    dispatch(updateImageAC(background));
  }, [background, dispatch]);

  // диспатчим параметры слайдера
  useEffect(() => {
    dispatch(updateImagePositionAC(imagePositionY));
  }, [imagePositionY, dispatch]);

  //загружаем картинку в стейт из ссылки
  const handleInput = (e) => {
    setBackground({ background: e.target.value, url: e.target.value });
  };

  //загружаем картинку в стейт из файла
  const handleUpload = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    if (e.target.files.length === 0) {
      return;
    }
    reader.onloadend = (e) => {
      setBackground({
        background: [reader.result],
        //заглушка для картинки из файла
        url: 'https://www.google.com/',
      });
    };
    reader.readAsDataURL(file);
  };
  // остслеживаем изменения слайдера и сохраняем в сосотояние компонента
  const handleSliderY = (e) => {
    setImagePositionY(e.target.value);
  };

  return (
    <div className="prep-wrapper">
      <div className="myHeader">
        <h1>Конструктор баннера</h1>
      </div>
      <div className="prep">
        <input
          className="prep-element"
          type="file"
          accept="image/*"
          name="file"
          onChange={handleUpload}
        />
        <input
          className="prep-element"
          type="text"
          name="url"
          onChange={handleInput}
          placeholder="ссылка на картинку"
        />
        <div className="setImagePosition">
          <p>Задать позицию изображения по высоте</p>
          <input
            value={imagePositionY}
            type="range"
            name="posY"
            min="0"
            max="100"
            onChange={handleSliderY}></input>
          <label htmlFor="volume">Позиция по Y</label>
        </div>
        <div className="color-input">
          <label htmlFor="color">Выберите цвет </label>
          {/* интегрируем стандартый HTML color пикер */}
          <input name="color" type="color" value={colorValue} onChange={setColor} />
        </div>
        <button onClick={sumbitColor}>подвердить</button>

        <div className="gradient-wrapper color-input">
          <label htmlFor="gradient">Выберите градиент </label>
          {/* итегрируем градиент пикер */}
          <GradientPickerPopover
            {...{
              open,
              setOpen,
              angle,
              setAngle,
              showAnglePicker: true,
              width: 220,
              maxStops: 3,
              paletteHeight: 32,
              palette,
              onPaletteChange: setPalette,
            }}>
            <WrappedSketchPicker />
          </GradientPickerPopover>
        </div>

        <button onClick={sumbitGrad}>подвердить</button>
      </div>
    </div>
  );
};

export default BackgroundSetter;
