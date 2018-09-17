import React, { Component } from 'react';
import '../CSS/Note.css';
export default class Note extends Component {
  removeNote = (id) =>{
    this.props.removeNote(id);
  }
  render() {
    return (
      <div className="note">
          <span onClick={ () => this.removeNote(this.props.noteId) }> &times; </span>
          <p>ID:          {this.props.id}</p>
          <p>Name:        {this.props.firstName}</p>
          <p>Second Name: {this.props.secondName}</p>
          <p>Last Name:   {this.props.firstLastName} {this.props.secondLastName}</p>
          <p>Account:     {this.props.account}</p>
          <p>Password:    {this.props.password}</p>
      </div>
    )
  }
}
