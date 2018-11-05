import React, { Component } from 'react'
import {
  FormControl,
  FormGroup,
  ControlLabel,
  Button,
  Table
} from "react-bootstrap";
import "../CSS/Reservations.css";

export default class ReservationsForm extends Component {

  state = {
    aValue: "",
    stValue: false,
    tValue: 0,
    sValue: 0,
    date: ""
  }

  handleAccount = e => this.setState({ aValue: e.target.value });
  handleStatus = e => this.setState({ stValue: e.target.value });
  handleTable = e => this.setState({ tValue: e.target.value });
  handleSeats = e => this.setState({ sValue: e.target.value });
  handleDate = e => this.setState({ date: e.target.value });
  handleSend = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.add({
      account: this.state.aValue,
      status: this.state.stValue,
      table: this.state.tValue,
      seats: this.state.sValue,
      date: this.state.date
    });
  };

  render() {
    return (
      <div className="reservations-form-wrapper" style={{padding:'15%',paddingBottom:'2%', paddingTop:'2%', alignItems:'center'}}>
        <form onSubmit={this.handleSend}>
          <FormGroup className="Pacc">
            <ControlLabel className="PaccL">Cuenta</ControlLabel>
            <FormControl
              className="PaccI"
              type="number"
              value={this.state.aValue}
              placeholder="cuenta..."
              onChange={this.handleAccount}
            />
          </FormGroup>
          <br />
          <FormGroup className="Status">
            <ControlLabel className="StatusL">Cuenta</ControlLabel>
            <FormControl
              className="StatusI"
              type="number"
              value={this.state.aValue}
              placeholder="cuenta..."
              onChange={this.handleAccount}
            />
          </FormGroup>
          <br />
          <Button className="BtnSendReservations" type="submit" style={{ width: '100%' }}>
            Registrar
          </Button>
        </form>
        <br />
        <Table responsive className="ReservationsList">
          <thead>
            <tr>
              <th>Cuenta</th>
              <th>Pago Completo</th>
              <th>Mesa</th>
              <th>Asientos</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {this.props.list.map(reservation => (
              <tr key={reservation.id}>
                <td>{reservation.account}</td>
                <td>{reservation.status}</td>
                <td>{reservation.table}</td>
                <td>{reservation.seats}</td>
                <td>{reservation.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}
