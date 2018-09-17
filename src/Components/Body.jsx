import React, { Component } from 'react'
import Note from './Note';
import firebase from 'firebase';
import { DB_CONFIG } from '../JS/firebase'
import 'firebase/database' 

export default class Body extends Component {
  constructor(props){
    super(props);
    this.app = firebase.initializeApp( DB_CONFIG );
    this.db = this.app.database().ref().child('Users');
    this.state = { 
      users: [] 
    } 
  }

  componentDidMount(){
    const users = this.state.users;
    this.db.on('child_added', snap => { 
      users.push({ 
        id: snap.key, 
        firstName: snap.val().firstName,
        secondName: snap.val().secondName,
        firstLastName: snap.val().firstLastName,
        secondLastName: snap.val().secondLastName,
        password: snap.val().password,
        account: snap.val().account, 
      }); 
      this.setState({ users: users }); 
    });

    this.db.on('child_removed', snap => {
      const indexToRemove = users.findIndex((User) => User.id === User.key ); 
      users.splice(indexToRemove,1); 
      this.setState({ users: users }); 
    });
  }

  removeNote = (id) => this.db.child(id).remove();
  addNote = () => this.db.push().set({ 
    firstName: document.getElementById("noteText").value,
    secondName: document.getElementById("noteText1").value,
    firstLastName: document.getElementById("noteText2").value,
    secondLastName: document.getElementById("noteText3").value,
    password: document.getElementById("noteText4").value,
    account: document.getElementById("noteText5").value 
  });

  render() {
    return (
      <div className="notesBody">
          <span>{ this.state.users.map((User)=> <Note key={User.id} id={User.id} firstName={User.firstName} 
          secondName={User.secondName} firstLastName={User.firstLastName} secondLastName={User.secondLastName} account={User.account} password={User.password} 
          removeNote={this.removeNote}/>) }</span>
          <input type="text" id="noteText" required placeholder="add a new first name..." max={144}/><br/>
          <input type="text" id="noteText1" required placeholder="add a new second name..." max={144}/><br/>
          <input type="text" id="noteText2" required placeholder="add a new first last name..." max={144}/><br/>
          <input type="text" id="noteText3" required placeholder="add a new second last name..." max={144}/><br/>
          <input type="text" id="noteText4" required placeholder="add a new password..." max={144}/><br/>
          <input type="text" id="noteText5" required placeholder="add a new account..." max={144}/><br/>
          <button onClick={this.addNote}>Add Note</button>
      </div>
    )
  }
}
