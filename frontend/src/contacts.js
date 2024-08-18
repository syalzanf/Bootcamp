import React, { Component } from 'react';
import axios from 'axios';

class Contact extends Component {
  state = {
    contacts: [],
    errorMessage: ''
  };

  componentDidMount() {
    this.loadContacts();
  }

  loadContacts = () => {
    axios.get('/api/contacts')
      .then(response => {
        this.setState({ contacts: response.data });
      })
      .catch(error => {
        console.error('Ada kesalahan!', error);
      });
  }

  handleDelete = (name) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      axios.post(`/api/contact/delete/${name}`)
        .then(response => {
          this.loadContacts();
        })
        .catch(error => {
          console.error('Ada kesalahan!', error);
        });
    }
  }

  render() {
    const { contacts, errorMessage } = this.state;

    return (
      <div className="container">
        <h2>Contact List</h2>
        <a href="/contact/add" className="btn btn-primary">
          Add New
        </a>

        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        {contacts.length === 0 ? (
          <div className="alert alert-info" role="alert">
            No contacts available.
          </div>
        ) : (
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact.name}>
                  <td>{contact.name}</td>
                  <td>{contact.phone}</td>
                  <td>
                    <a href={`/contact/edit/${contact.name}`} className="btn btn-info btn-sm">
                      Edit
                    </a>
                    <button 
                      className="btn btn-danger btn-sm" 
                      onClick={() => this.handleDelete(contact.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default Contact;
