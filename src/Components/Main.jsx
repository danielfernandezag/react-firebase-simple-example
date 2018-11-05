import React, { Component } from "react";
import firebase from "firebase";
import { DB_CONFIG } from "../JS/firebase";
import "firebase/database";
import Header from "./Header";
import Payments from "./PaymentsForm";
import Tables from "./TablesForm";
import Users from "./UsersForm";
import Reservations from "./ReservationsForm";
import Footer from "./Footer";
import "../CSS/Main.css";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMenu: 1,
      /**
       * 1 = Users form
       * 2 = Tables form
       * 3 = Payments form
       * 4 = Reservations form
       */
      users: [],
      tables: [],
      payments: [],
      reservations: []
    };
    this.app = firebase.initializeApp(DB_CONFIG);
    this.USERS = this.app
      .database()
      .ref()
      .child("USERS");
    this.TABLES = this.app
      .database()
      .ref()
      .child("TABLES");
    this.PAYMENTS = this.app
      .database()
      .ref()
      .child("PAYMENTS");
    this.RESERVATIONS = this.app
      .database()
      .ref()
      .child("RESERVATIONS");
  }

  hanfleMenuChange = menu => this.setState({ currentMenu: menu });

  componentDidMount() {
    /**INSERTS TO FIREBASE */
    const usersAux = this.state.users;
    this.USERS.on("child_added", snap => {
      usersAux.push({
        id: snap.key,
        fName: snap.val().fName,
        sName: snap.val().sName,
        fLast: snap.val().fLast,
        sLast: snap.val().sLast,
        account: snap.val().account,
        mail: snap.val().mail,
        pass: snap.val().pass
      });
      this.setState({ users: usersAux });
    });

    const tablesAux = this.state.tables;
    this.TABLES.on("child_added", snap => {
      tablesAux.push({
        id: snap.key,
        table: snap.val().table, //# de mesa
        seat: snap.val().seat, //# de asiento
        status: snap.val().status, // ocupada o no
        account: snap.val().account //quien la ocupo
      });
      this.setState({ tables: tablesAux });
    });

    const reservationsAux = this.state.reservations;
    this.RESERVATIONS.on("child_added", snap => {
      reservationsAux.push({
        id: snap.key,
        account: snap.val().account, // dueño de la reservacion
        status: snap.val().status, // pagada o no
        table: snap.val().table, // mesa reservada
        seats: snap.val().seats, // # de asientos reservados
        date: snap.val().date // fecha del ultimo pago
      });
      this.setState({ reservations: reservationsAux });
    });

    const paymentsAux = this.state.payments;
    this.PAYMENTS.on("child_added", snap => {
      paymentsAux.push({
        id: snap.key,
        account: snap.val().account, // quien pago
        amount: snap.val().amount, //cuanto pago
        debt: snap.val().debt, //cuanto debe
        prevDebt: snap.val().prevDebt, //cuanto debia
        date: snap.val().date //cuando pago
      });
      this.setState({ payments: paymentsAux });
    });

    /** DELETES FROM FIREBASE */
    this.USERS.on("child_removed", snap => {
      const usersAux = this.state.users;
      const indexToRemove = usersAux.findIndex(User => User.id === snap.id);
      usersAux.splice(indexToRemove, 1);
      this.setState({ users: usersAux });
    });

    this.TABLES.on("child_removed", snap => {
      const tablesAux = this.state.tables;
      const indexToRemove = tablesAux.findIndex(table => table.account=== snap.account);
      tablesAux.splice(indexToRemove, 1);
      this.setState({ tables: tablesAux });
    });

    this.PAYMENTS.on("child_removed", snap => {
      const paymentsAux = this.state.payments;
      const indexToRemove = paymentsAux.findIndex(
        payment => payment.id === snap.id
      );
      paymentsAux.splice(indexToRemove, 1);
      this.setState({ payments: paymentsAux });
    });

    this.RESERVATIONS.on("child_removed", snap => {
      const reservationsAux = this.state.reservations;
      const indexToRemove = reservationsAux.findIndex(
        reservation => snap.id === reservation.id
      );
      reservationsAux.splice(indexToRemove, 1);
      this.setState({ reservations: reservationsAux });
    });

    
  }

  addUser = user =>
    this.USERS.push().set({
      fName: user.fName,
      sName: user.sName,
      fLast: user.fLast,
      sLast: user.sLast,
      account: user.account,
      mail: user.mail,
      pass: user.pass
    });

  deleteUser = id => this.USERS.child(id).remove();

  addTable = table =>
    this.TABLES.push().set({
      table: table.table,
      seat: table.seat,
      status: table.status,
      account: table.account
    });

  addPayment = payment =>
    this.PAYMENTS.push().set({
      account: payment.account,
      amount: payment.amount,
      debt: payment.debt,
      prevDebt: payment.prevDebt,
      date: payment.date
    });

  addReservation = reservation =>
    this.RESERVATIONS.push().set({
      account: reservation.account,
      status: reservation.status,
      table: reservation.table,
      seats: reservation.seats,
      date: reservation.date
    });

  render() {
    console.log(this.state.tables);
    return (
      <div className="Main">
        <Header changeMenu={this.hanfleMenuChange} />
        <div className="wrapper">
          {this.state.currentMenu === 1 && (
            <Users add={this.addUser} list={this.state.users} delete={this.deleteUser}/>
          )}
          {this.state.currentMenu === 2 && (
            <Tables add={this.addTable} list={this.state.tables} />
          )}
          {this.state.currentMenu === 3 && (
            <Payments add={this.addPayment} list={this.state.payments} />
          )}
          {this.state.currentMenu === 4 && (
            <Reservations
              add={this.addReservation}
              list={this.state.reservations}
            />
          )}
        </div>
        <Footer className="footer" />
      </div>
    );
  }
}
