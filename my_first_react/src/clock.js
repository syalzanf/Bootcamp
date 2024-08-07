import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
    time: new Date().toLocaleTimeString()
    };
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.updateTime(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  updateTime() {
    this.setState({
      time: new Date().toLocaleTimeString()
    });
  }

  render() {
    return (
      <div> 
        <h5>{this.state.time}.</h5>
      </div>
    );
  }
}

export default Clock;
