import React, { Component } from 'react';
import { Card } from 'reactstrap';

export default class App extends Component {
  componentWillMount = () => {
    this.setState({ scramble: this.newScramble() });
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
          style={{ borderColor: '#00000000', backgroundColor: '#00000000' }}
        >
          <p style={{ fontSize: 15 }}>
            {`Your scramble: `}
            <span dangerouslySetInnerHTML={{ __html: this.state.scramble }} />
          </p>
        </Card>
      </div>
    );
  };
}
