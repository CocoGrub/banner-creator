import React, { useContext, useState } from 'react';
import { store } from '../../store/store';
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
  const [open, setOpen] = useState(false);
  const [angle, setAngle] = useState(90);
  const [palette, setPalette] = useState(initialPallet);

  const [colorValue, setColorValue] = React.useState('#ffcfef');

  const setColorValueF = (e) => {
    setColorValue(e.target.value);
  };

  const globalState = useContext(store);
  const handleInput = (e) => {
    setBackground({ ...background, backgroundImage: e.target.value });
  };
  const [background, setBackground] = useState({
    backgroundImage: '',
    backgroundColor: '',
  });

  const handleUpload = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    if (e.target.files.length === 0) {
      return;
    }
    reader.onloadend = (e) => {
      setBackground({ ...background, backgroundImage: [reader.result] });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="prep-wrapper">
      {myHeader}
      <div className="prep">
        <div className="prep-col">
          <img src={background.backgroundImage} alt="" />
          <input className="prep-element" type="file" name="file" onChange={handleUpload} />
          <input type="text" name="url" onChange={handleInput} placeholder="ссылка на картинку" />
        </div>
        <div className="prep-col">
          <div>
            <label htmlFor="color">Выберите цвет </label>
            <br></br>
            <input name="color" type="color" value={colorValue} onChange={setColorValueF} />
          </div>
          <div>
            <label htmlFor="gradient">Выберите градиент </label>
            <br></br>
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
        </div>
      </div>
    </div>
  );
};

export default Background;
