import React, { useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import '../styles/components/attribute-slider.css';
import Add from '../assets/add.svg';
import SwitchButton from '../components/switchButton';

function AttributeSlider({ onAddAttribute }) {
  const [inputValues, setInputValues] = useState(Array(5).fill(''));
  const [currentSlide, setCurrentSlide] = useState(0);
  const [attributes, setAttributes] = useState([]);
  const [selectedOption, setSelectedOption] = useState(Array(5).fill('Lista de Opciones'));
  const [additionalInputValue, setAdditionalInputValue] = useState('');
  const [options, setOptions] = useState(Array(5).fill([]));
  const [isHovered, setIsHovered] = useState(false);

  const handleInputChange = (index, event) => {
    const newValues = [...inputValues];
    newValues[index] = event.target.value;
    setInputValues(newValues);
  };

  const handleAdditionalInputChange = (event) => {
    setAdditionalInputValue(event.target.value);
  };

  const handleAddOption = () => {
    if (additionalInputValue.trim() === '') {
      alert('Por favor, ingresa una opción');
      return;
    }
    const newOptions = [...options];
    newOptions[currentSlide] = [...newOptions[currentSlide], additionalInputValue.trim()];
    setOptions(newOptions);
    setAdditionalInputValue('');
  };

  const handleAddAttribute = () => {
    if (inputValues[currentSlide].trim() === '' || (selectedOption[currentSlide] === 'Lista de Opciones' && options[currentSlide].length === 0)) {
      alert('Por favor, completa el atributo y agrega al menos una opción si es una Lista de Opciones');
      return;
    }
    const newAttributes = [...attributes];
    newAttributes[currentSlide] = {
      name: inputValues[currentSlide].trim(),
      type: selectedOption[currentSlide],
      options: options[currentSlide]
    };
    setAttributes(newAttributes);

    if (currentSlide < 4) {
      setCurrentSlide(currentSlide + 1);
    }

    onAddAttribute(newAttributes);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && selectedOption[currentSlide] === 'Lista de Opciones') {
      handleAddOption();
    }
  };

  const handleOptionChange = (newValue, index) => {
    const newSelectedOption = [...selectedOption];
    newSelectedOption[index] = newValue;
    setSelectedOption(newSelectedOption);
    // Clear options if the selected option changes
    setOptions(options.map((opt, i) => (i === index ? [] : opt)));
  };

  const handlePreviousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const isCurrentSlideComplete = () => {
    return (
      inputValues[currentSlide].trim() !== '' &&
      (selectedOption[currentSlide] === 'Rango numérico' || options[currentSlide].length > 0)
    );
  };

  return (
    <div className="attribute-slider-container">
      <Splide
        options={{
          type: 'slide',
          perPage: 1,
          perMove: 1,
          arrows: false,
          pagination: true,
          drag: true,
        }}
        onMove={(splide, newIndex) => setCurrentSlide(newIndex)}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <SplideSlide key={index}>
            <div className="slide">
              <input
                type="text"
                className="textInput"
                value={inputValues[index]}
                onChange={(event) => handleInputChange(index, event)}
                placeholder="Nuevo atributo"
                disabled={index > currentSlide}
              />
              <div className="additionalInput">
                <p className={`toggleOption ${selectedOption[index] === 'Lista de Opciones' ? 'active' : ''}`}
                  onClick={() => handleOptionChange('Lista de Opciones', index)}>
                  Lista de Opciones
                </p>
                <SwitchButton
                  value={selectedOption[index]}
                  onChange={(newValue) => handleOptionChange(newValue, index)}
                  options={['Lista de Opciones', 'Rango numérico']}
                />
                <p className={`toggleOption ${selectedOption[index] === 'Rango numérico' ? 'active' : ''}`}
                  onClick={() => handleOptionChange('Rango numérico', index)}>
                  Rango numérico
                </p>
              </div>
              {selectedOption[index] === 'Lista de Opciones' && (
                <div className='optionsBox'>
                  <React.Fragment>
                    <input
                      className="optionsInput"
                      type="text"
                      placeholder="Agregue nueva opción"
                      value={additionalInputValue}
                      onChange={handleAdditionalInputChange}
                      onKeyPress={handleKeyPress}
                      disabled={index !== currentSlide}
                    />
                    <button
                      className="addOptionButton"
                      onClick={handleAddOption}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      disabled={index !== currentSlide}
                    >
                      <p>Agregar</p>
                    </button>
                  </React.Fragment>
                </div>
              )}
              {selectedOption[index] === 'Lista de Opciones' && options[index].length > 0 && (
                <div className="options-list">
                  <h2>Opciones ingresadas:</h2>
                  <ul className="options-added-list">
                    {options[index].map((option, i) => (
                      <li key={i}>{option}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}

export default AttributeSlider;
