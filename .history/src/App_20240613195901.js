import { useEffect, useState } from 'react';
import './App.css';
import './styles.scss';

function App() {
  const bank1 = {
    Q: 'sounds/Heater-1.mp3',
    W: 'sounds/Heater-2.mp3',
    E: 'sounds/Heater-3.mp3',
    A: 'sounds/Heater-4_1.mp3',
    S: 'sounds/Heater-6.mp3',
    D: 'sounds/Dsc_Oh.mp3',
    Z: 'sounds/Kick_n_Hat.mp3', 
    X: 'sounds/RP4_KICK_1.mp3',
    C: 'sounds/Cev_H2.mp3'
  };

  const bank2 = {
    Q: 'sounds/piano.mp3',
    W: 'sounds/jazz.wav',
    E: 'sounds/bangu.wav',
    A: 'sounds/num.wav',
    S: 'sounds/stroke.wav',
    D: 'sounds/cymbals.wav',
    Z: 'sounds/tom.wav', 
    X: 'sounds/kick.wav',
    C: 'sounds/snare.wav'
  };

  const [volume, setVolume] = useState(50); // initial sound value
  const [power, setPower] = useState(false); //initial power volume
  const [bank, setBank] = useState(bank1); // initial bank value 
  const [isBank1, setIsBank1] = useState(true); // initial bank toggle state

  // Function to change volume
  const changeVolume = (event) => {
    setVolume(event.target.value); // Update the state with current value of the volume slider
  };

  // Function to toggle power
  const togglePower = () => {
    setPower(!power);
  };

  // Function to switch Banks
  const toggleBank = () => {
    setBank(isBank1 ? bank2 : bank1);
    setIsBank1(!isBank1);
  }

  // Use useEffect to add event listener for keydown events
  useEffect(() => {
    // Function to play sound
    const playSound = (id) => {
    if(!power) return; // Check if the power is on
    const audio = new Audio(bank[id]);
    audio.volume = volume / 100; // initial sound volume
    audio.currentTime = 0; // Set audio to beginning
    audio.play();
  };

    // Make the approptiate key play the approptiate sound
    const handleKeydown = (event) => {
      const key = event.key.toUpperCase();
      if(['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'].includes(key)) {
        playSound(key);

        // Add active class to the button
        const button = document.getElementById(`button-${key}`);
        if(button) {
          button.classList.add('active');
        }
      }
    };

    const handleKeyup = (event) => {
      const key = event.key.toUpperCase();
      if (['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'].includes(key)) {
        // Remove active class from the button
        const button = document.getElementById(`button-${key}`);
        if (button) {
          button.classList.remove('active');
        }
      }
    };

    // Add keydown event listener
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('keyup', handleKeyup);
    };
  }, [volume, power, bank]);

  return (
    <div className="App">
      <div id='drum-machine'>
        <div id='display'>
          <div className='buttons-grid'>
            <button id="button-Q" onClick={() => playSound('Q')}>Q</button>
            <button id="button-W" onClick={() => playSound('W')}>W</button>
            <button id="button-E" onClick={() => playSound('E')}>E</button>
            <button id="button-A" onClick={() => playSound('A')}>A</button>
            <button id="button-S" onClick={() => playSound('S')}>S</button>
            <button id="button-D" onClick={() => playSound('D')}>D</button>
            <button id="button-Z" onClick={() => playSound('Z')}>Z</button>
            <button id="button-X" onClick={() => playSound('X')}>X</button>
            <button id="button-C" onClick={() => playSound('C')}>C</button>
          </div>

          <div className='controls'>
            <div className='settings'>
              <label>Power</label>
              {/* Rounded switch */}
              <label className="switch">
                <input type="checkbox" checked={power} onChange={togglePower}/>
                <span className="slider round"></span>
              </label>
            </div>

            <div className='settings'>
              <label>Volume</label>
              <input
                type='range'
                min={0}
                max={100}
                value={volume}
                onChange={changeVolume}
                className='blue'
              />
            </div>

            <div className='settings'>
              <label>Bank</label>
              <label className="switch">
                <input type="checkbox" checked={!isBank1} onChange={toggleBank}/>
                <span className="slider bank"></span>
              </label>
            </div>
          </div>
        </div>
      </div>   
    </div>
  );
}

export default App;
