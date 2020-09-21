import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';
import { findIndex, without } from 'lodash';

class App extends Component {
  constructor() {
    super()
    this.state = {
      allAppointments: [],
      formDisplay: false,
      orderBy: 'model',
      orderDir: 'asc',
      queryText: '',
      lastApptId: 1
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchAppts = this.searchAppts.bind(this);
    // this.updateInfo = this.updateInfo.bind(this);
  }

  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay
    })
  }

  searchAppts(query) {
    this.setState({ queryText: query });
  }

  changeOrder(order, dir) {
    this.setState({
      orderBy: order,
      orderDir: dir
    });
  }

  updateInfo = (name, value, id) => {
    let tempAppts = this.state.allAppointments;
    let apptIndex = findIndex(this.state.allAppointments, {
      apptId: id
    });
    tempAppts[apptIndex][name] = value;
    this.setState({
      allAppointments: tempAppts
    });
    // console.log(name);
    // console.log(value);
    // console.log(id);
    // console.log(apptIndex);
  }

  addAppointment(appt) {
    let tempAppts = this.state.allAppointments;
    appt.apptId = this.state.lastApptId;
    tempAppts.unshift(appt);

    this.setState({
      allAppointments: tempAppts,
      lastApptId: this.state.lastApptId + 1
    })
  }

  deleteAppointment(appt) {
    let tempAppts = this.state.allAppointments;
    tempAppts = without(tempAppts, appt);

    this.setState({
      allAppointments: tempAppts
    });
  }

  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const appts = result.map(item => {
          item.apptId = this.state.lastApptId;
          this.setState({ lastApptId: this.state.lastApptId + 1 });
          return item;
        });
        this.setState({
          allAppointments: appts
        });
      });
  }
  render() {
    let order;
    let filteredAppts = this.state.allAppointments;
    if (this.state.orderDir === 'asc') {
      order = 1;
    } else {
      order = -1;
    }

    filteredAppts = filteredAppts.sort((a, b) => {
      if (
        a[this.state.orderBy].toLowerCase() <
        b[this.state.orderBy].toLowerCase()
      ) {
        return -1 * order;
      } else {
        return 1 * order;
      }
    })
      .filter(eachItem => {
        return (
          eachItem['model']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem['make']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem['owner']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem['apptNotes']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase())
        );
      });

    return (
      <main className="page bg-white" id="modelratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                  addAppointment={this.addAppointment} />
                <SearchAppointments
                  orderBy={this.state.orderBy}
                  orderDir={this.state.orderDir}
                  changeOrder={this.changeOrder}
                  searchAppts={this.searchAppts} />
                <ListAppointments
                  appointments={filteredAppts}
                  deleteAppointment={this.deleteAppointment}
                  updateInfo={this.updateInfo} />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;