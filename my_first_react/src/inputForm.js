import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    alert(`A form was submitted: 
            Name: ${this.state.name}
            Phone: ${this.state.phone}
            Email: ${this.state.email}`);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
        <label>
          Name:
          <input
            className="form-control"
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        </div>
        <div className="form-group">
        <label>
          Phone:
          <input
            className="form-control"
            type="tel"
            name="phone"
            value={this.state.phone}
            onChange={this.handleChange}
          />
        </label><br></br>
        </div>
        <div className="form-group">
        <label>
          Email:
          <input
            className="form-control"
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </label><br></br>
        </div>
        <div className="form-group">
        <input type="submit" value="Submit" className="btn btn-primary" />
        </div>
      </form>
    );
  }
}

export default Form;