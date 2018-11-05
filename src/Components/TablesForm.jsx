import React, { Component } from "react";
import { Radio, FormControl, FormGroup, ControlLabel, Button, Table } from "react-bootstrap";
import "../CSS/Tables.css";

export default class TablesForm extends Component {
  state = {
    tValue: 0,
    sValue: 0,
    stValueFree: false,
    stValueGiven: true,
    aValue: ""
  };

  handleTable = e => this.setState({ tValue: e.target.value });
  handleSeat = e => this.setState({ sValue: e.target.value });
  handleStatus = e => this.setState({ stValueFree: !this.state.stValueFree, stValueGiven: !this.state.stValueGiven });
  handlesAccount = e => this.setState({ aValue: e.target.value });

  handleSend = e => {
    e.preventDefault();
    e.stopPropagation();
    // alert(`MESA: ${this.state.tValue} SILLA: ${this.state.sValue} DISPONIBLE: ${this.state.stValueFree} CUENTA: ${this.state.aValue}`);
    this.props.add({
      table: this.state.tValue,
      seat: this.state.sValue,
      status: this.state.stValueFree,
      account: this.state.aValue
    });
  };

  render() {
    return (
      <div className="tables-form-wrapper" style={{padding:'15%',paddingBottom:'2%', paddingTop:'2%', alignItems:'center'}}>
      <form onSubmit={this.handleSend}>
        <FormGroup className="tables">
          <ControlLabel className="tablesL">Mesa</ControlLabel>
          <FormControl
            className="tablesI"
            type="number"
            value={this.state.tValue}
            placeholder="0"
            onChange={this.handleTable}
          />
        </FormGroup>
        <br/>
        <FormGroup className="seats">
          <ControlLabel className="seatsL">Asiento</ControlLabel>
          <FormControl
            className="seatsI"
            type="number"
            value={this.state.sValue}
            placeholder="0"
            onChange={this.handleSeat}
          />
        </FormGroup>
        <br/>
        <FormGroup style={{ alignItems: 'center'}}>
          <Radio name="rLibre" inline onChange={this.handleStatus} checked={this.state.stValueFree}>
            Libre
          </Radio>{" "}
          <Radio name="rOcupado" inline onChange={this.handleStatus} checked={this.state.stValueGiven}>
            Ocupado
          </Radio>{" "}
        </FormGroup>
        <br/>
        <FormGroup className="accounts">
          <ControlLabel className="accountsL">Cuenta</ControlLabel>
          <FormControl
            className="accountsI"
            type="number"
            value={this.state.aValue}
            placeholder="cuenta..."
            onChange={this.handlesAccount}
          />
        </FormGroup>
        <br/>
        <Button className="BtnSendTable" type="submit" style={{ width: '100%' }}>
          Registrar
        </Button>
      </form>
      <br/>
      <Table responsive className="TableList">
        <thead>
          <tr>
            <th>ID</th>
            <th>Mesa</th>
            <th>Asiento</th>
            <th>Estado</th>
            <th>Cuenta</th>
          </tr>
        </thead>
        <tbody>
          {this.props.list.map(seat => (
            <tr key={seat.id}>
              <td>{seat.id}</td>
              <td>{seat.table}</td>
              <td>{seat.seat}</td>
              <td>{seat.status  === true ? 'LIBRE' : 'RESERVADO'}</td>
              <td>{seat.account}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    );
  }
}
