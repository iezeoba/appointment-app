import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';

class AddAppointments extends Component {
    constructor() {
        super()
        this.state = {
            model: '',
            make: '',
            owner: '',
            apptDate: '',
            apptTime: '',
            apptNotes: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd(e) {
        e.preventDefault();
        let tempAppt = {
            model: this.state.model,
            make: this.state.make,
            owner: this.state.owner,
            apptDate: this.state.apptDate + ' ' + this.state.apptTime,
            apptNotes: this.state.apptNotes
        };
        this.props.addAppointment(tempAppt);

        this.setState({
            model: '',
            make: '',
            owner: '',
            apptDate: '',
            apptTime: '',
            apptNotes: ''
        });
        this.props.toggleForm();
    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }
    render() {
        return (
            <div
                className={
                    'card textcenter mt-3 ' +
                    (this.props.formDisplay ? '' : 'add-appointment')
                }
            >
                <div className="appt-addheading card-header bg-primary text-white"
                    onClick={this.props.toggleForm}>
                    <FaPlus /> Add Appointment
                    </div>
                <div className="card-body" onSubmit={this.handleAdd}>
                    <form id="apptForm" noValidate>
                        <div className="form-group form-row">
                            <label
                                className="col-md-2 col-form-label text-md-right"
                                htmlFor="model"
                                readOnly
                            >
                                Vehicle Model
              </label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="model"
                                    placeholder="Model and Year"
                                    value={this.state.model}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group form-row">
                            <label
                                className="col-md-2 col-form-label text-md-right"
                                htmlFor="make"
                                readOnly
                            >
                                Vehicle Make
              </label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="make"
                                    placeholder="Make"
                                    value={this.state.make}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group form-row">
                            <label
                                className="col-md-2 col-form-label text-md-right"
                                htmlFor="owner"
                            >
                                Vehicle Owner
              </label>
                            <div className="col-md-10">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="owner"
                                    placeholder="Owner's Name"
                                    value={this.state.owner}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group form-row">
                            <label
                                className="col-md-2 col-form-label text-md-right"
                                htmlFor="apptDate"
                            >
                                Date
              </label>
                            <div className="col-md-4">
                                <input
                                    type="date"
                                    className="form-control"
                                    name="apptDate"
                                    id="apptDate"
                                    value={this.state.apptDate}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <label
                                className="col-md-2 col-form-label text-md-right"
                                htmlFor="apptTime"
                            >
                                Time
              </label>
                            <div className="col-md-4">
                                <input
                                    type="time"
                                    className="form-control"
                                    name="apptTime"
                                    id="apptTime"
                                    value={this.state.apptTime}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group form-row">
                            <label className="col-md-2 text-md-right" htmlFor="apptNotes">
                                Appt. Notes
              </label>
                            <div className="col-md-10">
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    cols="50"
                                    name="apptNotes"
                                    id="apptNotes"
                                    placeholder="Appointment Notes"
                                    value={this.state.apptNotes}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group form-row mb-0">
                            <div className="offset-md-2 col-md-10">
                                <button
                                    type="submit"
                                    className="btn btn-primary d-block ml-auto"
                                >
                                    Add Appointment
                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddAppointments;