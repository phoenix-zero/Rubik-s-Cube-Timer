import React, { Component } from 'react';
import { Card } from 'reactstrap';

export default class App extends Component {
  TimerState = {
    READY: 0,
    HELD: 1,
    RELEASABLE: 2,
    COUNTING: 3,
    RUNNING: 4,
  };

  componentWillMount = () => {
    this.setState({
      scramble: this.newScramble(),
      timerState: this.TimerState.READY,
      heldTime: 0,
      cubeTime: 0,
    });
    this.startTime = 0;
    this.counting = null;
    document.addEventListener('keydown', ({ keyCode }) => {
      if (keyCode !== 32) return;
      if (this.state.timerState === this.TimerState.HELD) {
        if (performance.now() - this.state.heldTime >= 1000) {
          this.setState({ timerState: this.TimerState.RELEASABLE });
          return;
        }
      }
      if (this.state.timerState !== this.TimerState.READY) return;
      console.log('Setting timer');
      this.setState({
        heldTime: performance.now(),
        timerState: this.TimerState.HELD,
      });
    });
    document.addEventListener('keyup', ({ keyCode }) => {
      if (keyCode !== 32) return;
      if (this.state.timerState === this.TimerState.RELEASABLE) {
        console.log(performance.now() - this.state.heldTime);
        this.setState({ heldTime: 0, timerState: this.TimerState.RUNNING });
        this.startTime = performance.now();
        this.counting = setInterval(() => {
          this.setState({ cubeTime: performance.now() - this.startTime });
        }, 100);
      }
    });
    document.addEventListener('keypress', () => {
      if (this.state.timerState === this.TimerState.RUNNING)
        clearInterval(this.counting);
    });
  };

  newScramble = () => {
    let newString = '';
    let last = -1;
    for (let i = 0; i < 10; i += 1) {
      const face = Math.floor(Math.random() * 3);
      const direction = Boolean(Math.floor(Math.random() * 2));
      const spin = Math.floor(Math.random() * 3);
      if (face * 2 + direction === last) {
        i -= 1;
        // eslint-disable-next-line no-continue
        continue;
      } else last = face * 2 + direction;
      switch (face) {
        case 0: // RL
          if (direction) newString += '<span style="color: orange;">R';
          else newString += '<span style="color: red;">L';
          break;
        case 1: // UD
          if (direction) newString += '<span style="color: yellow;">U';
          else newString += '<span style="color: white;">D';
          break;
        case 2: // FB
          if (direction) newString += '<span style="color: green;">F';
          else newString += '<span style="color: blue;">B';
          break;
        default: // Call the FBI
      }
      switch (spin) {
        case 0: // Regular
          newString += '</span> ';
          break;
        case 1: // Reverse
          newString += '&apos;</span>  ';
          break;
        case 2: // Double
          newString += '2</span> ';
          break;
        default: // WOW
      }
    }
    return newString;
  };

  render = () => {
    return (
      <div style={{ backgroundColor: '#000000', height: '100vh' }}>
        <Card
          style={{
            textAlign: 'center',
            borderColor: '#00000000',
            background: '#020923ff',
            color: '#bf7474ff',
          }}
        >
          <h1>Rubik&apos;s Cube timer</h1>
        </Card>
        <Card
          style={{
            borderColor: '#00000000',
            backgroundColor: '#00000000',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: 15, alignContent: 'center' }}>
            {`Your scramble: `}
            <span dangerouslySetInnerHTML={{ __html: this.state.scramble }} />
          </p>
          <br />
          <p>
            {this.state.timerState === this.TimerState.RELEASABLE ? 'GO' : ''}
          </p>
          <p> {this.state.cubeTime / 1000}</p>
        </Card>
      </div>
    );
  };
}
