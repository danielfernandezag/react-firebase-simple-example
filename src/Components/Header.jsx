import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
export default class Header extends Component {
  render() {
    return (
      <Navbar
        style={{
          borderRadius: "0px",
          color: "white",
          WebkitTextFillColor: "white"
        }}
        inverse
        collapseOnSelect
      >
        <Navbar.Header>
          <Navbar.Brand>
            <a>Administrador Evento Graduación</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} onClick={()=>this.props.changeMenu(1)}>
              Alumnos
            </NavItem>
            <NavItem eventKey={2} onClick={()=>this.props.changeMenu(2)}>
              Mesas
            </NavItem>
            <NavItem eventKey={3}  onClick={()=>this.props.changeMenu(3)}>
              Pagos
            </NavItem>
            <NavItem eventKey={4}  onClick={()=>this.props.changeMenu(4)}>
              Reservaciones
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1}>
              Cerrar Sesión
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
