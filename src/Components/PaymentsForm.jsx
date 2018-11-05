import React, { Component } from "react";
import {
  FormControl,
  FormGroup,
  ControlLabel,
  Button,
  Table
} from "react-bootstrap";
import "../CSS/Payments.css";

export default class PaymentsForm extends Component {
  state = {
    aValue: "",
    amValue: 0,
    dValue: 0,
    pValue: 0,
    date: null
  }

  handleAccount = e => this.setState({ aValue: e.target.value });
  handleAmount = e => this.setState({ amValue: e.target.value });
  handleDebt = e => this.setState({ dValue: e.target.value });
  handlePrevious = e => this.setState({ pValue: e.target.value });
  handleDate = e => this.setState({ date: e.target.value });
  handleSend = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.add({
      account: this.state.aValue,
      amount: this.state.amValue,
      debt: this.state.dValue,
      prevDebt: this.state.pValue,
      date: this.state.date
    });
  };

  render() {
    return (
      <div className="payments-form-wrapper" style={{padding:'15%',paddingBottom:'2%', paddingTop:'2%', alignItems:'center'}}>
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
          <FormGroup className="amount">
            <ControlLabel className="amountL">Cantidad</ControlLabel>
            <FormControl
              className="amountI"
              type="number"
              value={this.state.amValue}
              placeholder="cantidad..."
              onChange={this.handleAmount}
            />
          </FormGroup>
          <br />
          <FormGroup className="debt">
            <ControlLabel className="debtL">Saldo a pagar</ControlLabel>
            <FormControl
              className="debtI"
              type="number"
              value={this.state.dValue}
              placeholder="deuda..."
              onChange={this.handleDebt}
            />
          </FormGroup>
          <br />
          <FormGroup className="previous">
            <ControlLabel className="prevL">Saldo Anterior</ControlLabel>
            <FormControl
              className="prevI"
              type="number"
              value={this.state.pValue}
              placeholder="deuda anterior..."
              onChange={this.handlePrevious}
            />
          </FormGroup>
          <br />
          <FormGroup className="date">
            <ControlLabel className="dateL">Fecha</ControlLabel>
            <FormControl
              className="dateI"
              type="date"
              value={this.state.date}
              placeholder="fecha..."
              onChange={this.handleDate}
            />
          </FormGroup>
          <br />
          <Button className="BtnSendPayments" type="submit" style={{ width: '100%' }}>
            Registrar
          </Button>
        </form>
        <br />
        <Table responsive className="PaymentsList">
          <thead>
            <tr>
              <th>Cuenta</th>
              <th>Cantidad</th>
              <th>Deuda</th>
              <th>Deuda Anterior</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {this.props.list.map(payment => (
              <tr key={payment.id}>
                <td>{payment.account}</td>
                <td>{payment.amount}</td>
                <td>{payment.debt}</td>
                <td>{payment.prevDebt}</td>
                <td>{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}
