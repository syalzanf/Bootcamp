import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    message: ''
  };

  componentDidMount() {
    axios.get('/api/data')
      .then(response => {
        this.setState({ message: response.data.message });
      })
      .catch(error => {
        console.error('Ada kesalahan!', error);
      });
  }
  handleInputChange = (event) => {
    this.setState({ name: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/data', { name: this.state.name })
      .then(response => {
        this.setState({ message: response.data.message });
      })
      .catch(error => {
        console.error('Ada kesalahan!', error);
      });
  }

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            value={this.state.name} 
            onChange={this.handleInputChange} 
            placeholder="Enter your name"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
