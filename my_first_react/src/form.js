import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      employed: false,
      education: '',
      expertise: {
        html: false,
        css: false,
        javascript: false
      },
      position: '',
      notes: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleCheckboxChange(event) {
    const { name, checked } = event.target;
    this.setState(prevState => ({
      expertise: {
        ...prevState.expertise,
        [name]: checked
      }
    }));
  }

  handleSubmit(event) {
    alert(`Form submitted:
      First Name: ${this.state.firstname}
      Last Name: ${this.state.lastname}
      Employed: ${this.state.employed}
      Education: ${this.state.education}
      Expertise: ${Object.keys(this.state.expertise).filter(key => this.state.expertise[key]).join(', ')}
      Position: ${this.state.position}
      Notes: ${this.state.notes}`);
    event.preventDefault();
  }

  handleReset(event) {
    this.setState({
      firstname: '',
      lastname: '',
      employed: false,
      education: '',
      expertise: {
        html: false,
        css: false,
        javascript: false
      },
      position: '',
      notes: '',
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>
            First Name:
            <input
              className="form-control"
              type="text"
              name="firstname"
              value={this.state.firstname}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Last Name:
            <input
              className="form-control"
              type="text"
              name="lastname"
              value={this.state.lastname}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Employed:
            <input
              type="checkbox"
              name="employed"
              checked={this.state.employed}
              onChange={e => this.setState({ employed: e.target.checked })}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Education:
            <select
              className="form-control"
              name="education"
              value={this.state.education}
              onChange={this.handleChange}
            >
              <option value="">Select...</option>
              <option value="smk">smk</option>
              <option value="sma">sma</option>
              <option value="s1">s1</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>Expertise:</label><br />
          <label>
            <input
              type="checkbox"
              name="html"
              checked={this.state.expertise.html}
              onChange={this.handleCheckboxChange}
            />
            HTML
          </label>
          <label>
            <input
              type="checkbox"
              name="css"
              checked={this.state.expertise.css}
              onChange={this.handleCheckboxChange}
            />
            CSS
          </label>
          <label>
            <input
              type="checkbox"
              name="javascript"
              checked={this.state.expertise.javascript}
              onChange={this.handleCheckboxChange}
            />
            JavaScript
          </label>
        </div>
        <div className="form-group">
          <label>Preferred Technology:</label><br />
          <label>
            <input
              type="radio"
              name="position"
              value="Front End"
              checked={this.state.position === 'Front End'}
              onChange={this.handleChange}
            />
            Front End
          </label>
          <label>
            <input
              type="radio"
              name="position"
              value="Back End"
              checked={this.state.position === 'Back End'}
              onChange={this.handleChange}
            />
            Back End
          </label>
          <label>
            <input
              type="radio"
              name="position"
              value="Full Stack"
              checked={this.state.position === 'Full Stack'}
              onChange={this.handleChange}
            />
            Full Stack
          </label>
        </div>
        <div className="form-group">
          <label>
            Notes:
            <textarea
              className="form-control"
              name="notes"
              value={this.state.notes}
              onChange={this.handleChange}
              rows="4"
            />
          </label>
        </div>
        <div className="form-group">
          <input type="submit" value="Submit" className="btn btn-success" />
          <input type="reset" value="Reset" className="btn btn-warning" />
        </div>
      </form>
    );
  }
}

export default Form;
