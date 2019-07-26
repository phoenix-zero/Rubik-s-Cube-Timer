import React, { Component } from 'react';

export default class Results extends Component {
  Ao5 = () => {
    if (this.props.table.length < 5) return 'NaN';
    const arr = this.props.table
      .map(a => parseFloat(a.time))
      .slice(this.props.table.length - 5);
    arr.sort();
    console.log(arr);
    let sum = 0;
    for (let i = 1; i < 4; i += 1) sum += arr[i];
    sum /= 3;
    return Math.round(sum * 100) / 100;
  };

  Ao12 = () => {
    if (this.props.table.length < 12) return 'NaN';
    const arr = this.props.table
      .map(a => parseFloat(a.time))
      .slice(this.props.table.length - 12);
    arr.sort();
    let sum = 0;
    for (let i = 1; i < 11; i += 1) sum += arr[i];
    sum /= 10;
    return Math.round(sum * 100) / 100;
  };

  Bo3 = () => {
    if (this.props.table.length < 3) return 'NaN';
    const arr = this.props.table
      .map(a => parseFloat(a.time))
      .slice(this.props.table.length - 3);
    arr.sort();
    return Math.round(arr[0] * 100) / 100;
  };

  PB = () => {
    if (this.props.table.length === 0) return 'NaN';
    const arr = this.props.table.map(a => parseFloat(a.time));
    arr.sort();
    return Math.round(arr[0] * 100) / 100;
  };

  render() {
    return (
      <div>
        Ao5: {this.Ao5()}
        <br /> Ao12: {this.Ao12()}
        <br /> Bo3: {this.Bo3()}
        <br /> PB: {this.PB()}
      </div>
    );
  }
}
