import React, { Component } from 'react';
import { Card, Col, Row } from 'reactstrap';
import TimeTable from './timeTable';
import Results from './results';

export default class App extends Component {
  TimerState = {
    READY: 0,
    HELD: 1,
    RELEASABLE: 2,
    COUNTING: 3,
    RUNNING: 4,
  };

  reRoll = () => {
    this.setState({ ...this.newScramble() });
  };

  componentWillMount = () => {
    this.setState({
      ...this.newScramble(),
      timerState: this.TimerState.READY,
      heldTime: 0,
      cubeTime: [0, 0],
      timerArray: [],
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
        this.setState({ heldTime: 0, timerState: this.TimerState.RUNNING });
        this.startTime = performance.now();
        this.counting = setInterval(() => {
          const timeState =
            Math.round(performance.now() - this.startTime) / 1000;
          this.setState({
            cubeTime: [
              Math.round(timeState),
              Math.round((timeState * 100) % 100) < 10
                ? Math.round((timeState * 100) % 100) * 10
                : Math.round((timeState * 100) % 100),
            ],
          });
        }, 10);
      } else if (this.state.timerState === this.TimerState.HELD)
        this.setState({ timerState: this.TimerState.READY });
    });
    document.addEventListener('keypress', ({ keyCode }) => {
      if (this.state.timerState === this.TimerState.RUNNING && keyCode === 32) {
        clearInterval(this.counting);
        this.setState({ timerState: this.TimerState.READY });
        const timerArray = this.state.timerArray.concat({
          scramble: this.state.plainScramble,
          time: `${this.state.cubeTime[0]}.${this.state.cubeTime[1]}`,
        });
        this.setState({ timerArray });
        this.reRoll();
      } else if (
        this.state.timerState === this.TimerState.READY &&
        keyCode === 114
      ) {
        this.reRoll();
      }
    });
  };

  newScramble = () => {
    let scramble = '';
    let plainScramble = '';
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
          if (direction) {
            scramble += '<span style="color: orange;">R';
            plainScramble += 'R';
          } else {
            scramble += '<span style="color: red;">L';
            plainScramble += 'L';
          }
          break;
        case 1: // UD
          if (direction) {
            scramble += '<span style="color: yellow;">U';
            plainScramble += 'U';
          } else {
            scramble += '<span style="color: white;">D';
            plainScramble += 'D';
          }
          break;
        case 2: // FB
          if (direction) {
            scramble += '<span style="color: green;">F';
            plainScramble += 'F';
          } else {
            scramble += '<span style="color: blue;">B';
            plainScramble += 'B';
          }
          break;
        default: // Call the FBI
      }
      switch (spin) {
        case 0: // Regular
          scramble += '</span> ';
          plainScramble += ' ';
          break;
        case 1: // Reverse
          scramble += '&apos;</span>  ';
          plainScramble += "' ";
          break;
        case 2: // Double
          scramble += '2</span> ';
          plainScramble += '2 ';
          break;
        default: // WOW
      }
    }
    this.setState({ plainScramble });
    return { scramble, plainScramble };
  };

  render = () => {
    return (
      <Card
        style={{
          borderColor: '#00000000',
          backgroundColor: '#00000000',
          textAlign: 'center',
        }}
      >
        <Col>
          <p
            style={{
              fontSize: 15,
              alignContent: 'center',
            }}
          >
            Your scramble: <br />
            <span
              style={{
                backgroundColor: '#000000',
                color: '#ffffff',
              }}
              dangerouslySetInnerHTML={{ __html: this.state.scramble }}
            />
          </p>
          <p onClick={this.reRoll} type="button" className="btn btn-primary">
            <u>R</u>e-roll
          </p>
        </Col>
        <br />
        <p style={{ fontSize: 40 }}>
          {this.state.cubeTime[0] < 10 ? '0' : ''}
          {this.state.cubeTime[0]}.
          {this.state.cubeTime[1] === 0 ? '00' : this.state.cubeTime[1]}
        </p>
        <p
          style={{
            fontSize: 50,
            visibility:
              this.state.timerState === this.TimerState.RELEASABLE
                ? 'visible'
                : 'hidden',
          }}
        >
          GO
        </p>
        <Row style={{ maxHeight: '20vh', maxWidth: '100%' }}>
          <Col sm="6" style={{ maxHeight: '30vh', overflowY: 'auto' }}>
            <TimeTable table={this.state.timerArray} />
          </Col>
          <Col sm="6">
            <Results table={this.state.timerArray} />
          </Col>
        </Row>
      </Card>
    );
  };
}
