import React, { Component } from "react";
import {
  FormControl,
  FormGroup,
  ControlLabel,
  Button,
  Table
} from "react-bootstrap";
import "../CSS/User.css";

export default class UsersForm extends Component {
  state = {
    fNValue: "",
    sNValue: "",
    fLValue: "",
    sLValue: "",
    aValue: "",
    mValue: "",
    passValue: ""
  };

  handlefName = e => this.setState({ fNValue: e.target.value });
  handlesName = e => this.setState({ sNValue: e.target.value });
  handlefLast = e => this.setState({ fLValue: e.target.value });
  handlesLast = e => this.setState({ sLValue: e.target.value });
  handleAccount = e => this.setState({ aValue: e.target.value });
  handlePassword = e => this.setState({ passValue: e.target.value });
  handleMail = e => this.setState({ mValue: e.target.value });
  handleDelete = account => { console.log(account); this.props.delete(account)};

  handleSend = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.add({
      fName: this.state.fNValue.toUpperCase(),
      sName: this.state.sNValue.toUpperCase(),
      fLast: this.state.fLValue.toUpperCase(),
      sLast: this.state.sLValue.toUpperCase(),
      account: this.state.aValue,
      mail: this.state.mValue,
      pass: this.state.passValue
    });
  };

  render() {
    return (
      <div className="user-form-wrapper" style={{padding:'15%',paddingBottom:'2%', paddingTop:'2%', alignItems:'center'}}>
        <form onSubmit={this.handleSend}>
          <FormGroup className="fName">
            <ControlLabel className="fNameL">Primer Nombre *</ControlLabel>
            <FormControl
              className="fNameI"
              type="text"
              value={this.state.fNValue}
              placeholder="primer nombre..."
              onChange={this.handlefName}
            />
          </FormGroup>
          <br />
          <FormGroup className="sName">
            <ControlLabel className="sNameL">Segundo Nombre</ControlLabel>
            <FormControl
              className="sNameI"
              type="text"
              value={this.state.sNValue}
              placeholder="segundo nombre..."
              onChange={this.handlesName}
            />
          </FormGroup>
          <br />
          <FormGroup className="fLast">
            <ControlLabel className="fLastL">Primer Apellido *</ControlLabel>
            <FormControl
              className="fLastI"
              type="text"
              value={this.state.fLValue}
              placeholder="appellido paterno..."
              onChange={this.handlefLast}
            />
          </FormGroup>
          <br />
          <FormGroup className="sLast">
            <ControlLabel className="sLastL">Segundo Apellido </ControlLabel>
            <FormControl
              className="sLastI"
              type="text"
              value={this.state.sLValue}
              placeholder="appellido materno..."
              onChange={this.handlesLast}
            />
          </FormGroup>
          <br />
          <FormGroup className="acc">
            <ControlLabel className="accL">Cuenta</ControlLabel>
            <FormControl
              className="accI"
              type="number"
              value={this.state.aValue}
              placeholder="cuenta..."
              onChange={this.handleAccount}
            />
          </FormGroup>
          <br />
          <FormGroup className="pass">
            <ControlLabel className="passL">Contraseña</ControlLabel>
            <FormControl
              className="passI"
              type="password"
              value={this.state.passValue}
              placeholder="contraseña..."
              onChange={this.handlePassword}
            />
          </FormGroup>
          <br />
          <FormGroup className="mail">
            <ControlLabel className="mailL">Correo</ControlLabel>
            <FormControl
              className="mailI"
              type="email"
              value={this.state.mValue}
              placeholder="correo..."
              onChange={this.handleMail}
            />
          </FormGroup>
          <br />
          <Button className="BtnSend" type="submit" style={{ width: '100%' }}>
            Registrar
          </Button>
        </form>
        <br />
        <Table responsive className="UserList">
          <thead>
            <tr>
              <th>Cuenta</th>
              <th>{"Nombre(s)"}</th>
              <th>{"Apellido(s)"}</th>
              <th>Contraseña</th>
              <th>Correo</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {this.props.list.map(user => (
              <tr key={user.id}>
                <td>{user.account}</td>
                <td>{`${user.fName} ${user.sName}`}</td>
                <td>{`${user.fLast} ${user.sLast}`}</td>
                <td>{user.pass}</td>
                <td>{user.mail}</td>
                <td>
                  <Button onClick={()=>this.handleDelete(user.account)} bsStyle="danger">X</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
