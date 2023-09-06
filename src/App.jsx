import { useState } from 'react';
import './App.css';

const Header = () => {
  return (
    <header className='header'>
      <h1>Welcome to my color picker using React.js</h1>
    </header>
  );
};

const Main = () => {
  const [color, setColor] = useState('#333');
  const [savedColors, setSavedColors] = useState([]);

  const createHexaColor = () => {
    let str = '0123456789abcdef';
    let backColor = '#';

    for (let i = 0; i < 6; i++) {
      let index = Math.floor(Math.random() * str.length);
      backColor += str[index];
    }

    setColor(backColor);
  };

  const handleChange = (e) => {
    let newColor = e.target.value;

    if (newColor[0] === '#' && newColor.length > 3) {
      setColor(newColor);
    }
  };

  const handleSaveClick = () => {
    setSavedColors([...savedColors, color]);
  };

  const deleteColor = (id) => {
    let newColors = savedColors.filter((color, index) => {
      return index !== Number(id.target.id);
    });

    setSavedColors(newColors);
  };

  return (
    <div style={{ backgroundColor: color }} className='main'>
      <div className='color-tracker-container'>
        {savedColors.length > 0 ? <p>Saved Colors:</p> : null}
        {savedColors.map((color, index) => {
          return (
            <div
              key={index}
              id={index}
              color={color}
              style={{ backgroundColor: color }}
              className='color-stamp'
            >
              <span
                key={index}
                id={index}
                onClick={deleteColor}
                className='close'
              >
                x
              </span>
              {color}
            </div>
          );
        })}
      </div>
      <h1>{color}</h1>

      <button onClick={createHexaColor} className='btn'>
        Click to change the background color
      </button>
      <span>OR</span>
      <form action=''>
        <label htmlFor='input'>
          Input a hex color code:
          <span className='required-input'>(Must start with #)</span>
        </label>
        <input
          style={{ border: color[0] === '#' ? 'transparent' : '3px solid red' }}
          maxLength='7'
          onChange={handleChange}
          type='text'
          placeholder='#000000'
        />
      </form>
      <button onClick={handleSaveClick} className='saveBtn'>
        Save Color
      </button>
    </div>
  );
};

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className='footer'>
      <h2>Copyright {year}</h2>
    </footer>
  );
};

function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
