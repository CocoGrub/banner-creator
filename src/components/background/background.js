import React, { useContext, useEffect, useState } from 'react';
import { store } from '../../store/store';
import { updateColorAC, updateImageAC } from '../../store/actions';
import { SketchPicker } from 'react-color';
import { GradientPickerPopover } from 'react-linear-gradient-picker';
import 'react-color-gradient-picker/dist/index.css';

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

const myHeader = (
  <div className="myHeader">
    <h1>Конструктор баннера</h1>
  </div>
);

const Background = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const [background, setBackground] = useState('');
  const [open, setOpen] = useState(false);
  const [angle, setAngle] = useState(90);
  const [palette, setPalette] = useState(initialPallet);
  const [colorValue, setColorValue] = React.useState('#ffcfef');

  const setColorValueF = (e) => {
    setColorValue(e.target.value);
  };

  const sumbitGrad = () => {
    dispatch(updateColorAC({ palette, angle }));
  };
  const sumbitColor = () => {
    dispatch(updateColorAC(colorValue));
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(updateColorAC({ palette, angle }));
  //     console.log('disp');
  //   }, 1000);
  // }, [palette, angle]);

  useEffect(() => {
    dispatch(updateImageAC(background));
  }, [background]);

  const handleInput = (e) => {
    setBackground(e.target.value);
  };

  const handleUpload = (e) => {
    //загружаем картинку в стейт
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    if (e.target.files.length === 0) {
      return;
    }
    reader.onloadend = (e) => {
      setBackground([reader.result]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="prep-wrapper">
      {myHeader}
      <div className="prep">
        <input className="prep-element" type="file" name="file" onChange={handleUpload} />
        <input type="text" name="url" onChange={handleInput} placeholder="ссылка на картинку" />
        <div className="color-input">
          <label htmlFor="color">Выберите цвет </label>
          <input name="color" type="color" value={colorValue} onChange={setColorValueF} />
        </div>
        <button onClick={sumbitColor}>подвердить</button>
        <div className="gradient-wrapper color-input">
          <label htmlFor="gradient">Выберите градиент </label>

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

export default Background;
