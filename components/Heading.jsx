import React, { Component } from 'react';
import { Card } from 'reactstrap';

export default class Heading extends Component {
  getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  render() {
    return (
      <Card
        style={{
          textAlign: 'center',
          borderColor: '#00000000',
          background: '#020923ff',
          color: '#bf7474ff',
        }}
      >
        <h1>
          {"Rubik's Cube Timer".split('').map((letter, index) => (
            <span key={index} style={{ color: this.getRandomColor() }}>
              {letter}
            </span>
          ))}
        </h1>
      </Card>
    );
  }
}
