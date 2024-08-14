import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  reset = () => {
    this.setState({ count: 0 });
  };

  render() {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1>{this.state.count}</h1>
        <button onClick={this.increment}>Plus</button>
        <button onClick={this.decrement}>Min</button>
        <button onClick={this.reset}>Reset</button>
      </div>
    );
  }
}

export default Counter;