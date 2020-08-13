import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';

// Sound storage variables

const soundBankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

const soundBankTwo = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
  },
  {
    keyCode: 89,
    keyTrigger: "Y",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  }
];

// End of Sound storage variables

// Style variables

const inactiveStyle = {
  backgroundColor: '#6c757d',
}

const activeStyle = {
  backgroundColor: '#ff9933',
  transform: 'translateY(3px)',
}


class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      style: inactiveStyle
    };
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.activateStyle = this.activateStyle.bind(this)
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillMount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }
  activateStyle() {
    if (this.state.active === false)
    {this.setState({
      active: true,
      style: activeStyle
    })
    setTimeout(() => this.setState({
      active: false,
      style: inactiveStyle
    }), 100)
  } else 
    {(this.setState({
      active: false,
      style: inactiveStyle
    }))
    setTimeout(() => this.setState({
      active: true,
      style: activeStyle
    }), 100)
  }
    
  }

  playSound(event) {
    const music = document.getElementById(this.props.keyTrigger);
    music.currentTime = 0;
    music.play();
    this.activateStyle()  
    this.props.displayUpdate(this.props.soundId)
    
  }

  render() {
    return (
      <Button
        active= {this.state.active}
        type="button"
        style={this.state.style}
        className="btn btn-secondary col-3 demo drum-pad"
        id={this.props.soundId}
        onClick={this.playSound}
      >
        <audio
          className="clip"
          id={this.props.keyTrigger}
          src={this.props.sound}
        ></audio>
        {this.props.keyTrigger}
     </Button>
    );
  }
}

class DrumPadContainer extends React.Component {
  render() {
    let soundBank = this.props.currentBank.map((drumObj, i, soundBankArr) => {
      return (
        <DrumPad
          soundId={soundBankArr[i].id}
          sound={soundBankArr[i].url}
          keyTrigger={soundBankArr[i].keyTrigger}
          keyCode={soundBankArr[i].keyCode}
          displayUpdate={this.props.displayUpdate}
        />
      );
    });

    return (
      <div className="pad-container row justify-content-center">
        {soundBank}
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bankStatus: true,
      display: String.fromCharCode(160),
      currentBank: soundBankOne,
      currentBankId: "Heater"
    };
    this.selectBank = this.selectBank.bind(this);
    this.displayClip = this.displayClip.bind(this);
    this.displayClear = this.displayClear.bind(this);
  }

  selectBank() {
    if (this.state.bankStatus === true) {
      this.setState({
        bankStatus: !this.state.bankStatus,
        currentBank: soundBankTwo,
        display: "Smooth Piano",
        currentBankId: "Smooth Piano"
      });
    } else {
      this.setState({
        bankStatus: !this.state.bankStatus,
        currentBank: soundBankOne,
        display: "Heater",
        currentBankId: "Heater"
      });
    }
    setTimeout(() => this.displayClear(), 400 )
  }

  displayClip(name) {
    this.setState({
      display: name
    })
    setTimeout(() => this.displayClear(), 400 )
  }

  displayClear() {
    this.setState({
      display: String.fromCharCode(160)
    })
  }

  render() {
    return (
      <div className="container-fluid w-100 h-100" id="wrapper">
        <div className="row align-items-center h-100">
          <div className="container-fluid" id="drum-machine">
            <div
              className="row justify-content-around align-items-center h-100"
              id="inner-container"
            >
              <div className="col-sm-4" align="center">
                <p>Drum Pad</p>
                <br></br>
                <DrumPadContainer
                currentBank={this.state.currentBank}
                displayUpdate={this.displayClip} />
              </div>
              <div className="col-sm-4" id="controls" align="center">
                <p className="mt-3">Control Panel</p>
                <div className="col align-items-center" id="display">
                  <p className="m-auto">{this.state.display}</p>
                </div>
                <div className="col center mt-3"><p>Switcher</p></div>
                <button
                  type="button"
                  className="btn btn-dark mb-3"
                  onClick={this.selectBank}
                >Change Chord  <i className="fas fa-sync fa-refresh"></i></button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
