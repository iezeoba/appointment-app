import React, { Component } from 'react';
import { FaTimes } from 'react-icons/fa';
import Moment from 'react-moment';

class ListAppointments extends Component {
    render() {

        return (
            <div className="appointment-list item-list mb-3">
                {this.props.appointments.map(item => (
                    <div className="model-item col media py-3" key={item.apptId}>
                        <div className="mr-3">
                            <button className="model-delete btn btn-sm btn-danger"
                                onClick={() => this.props.deleteAppointment(item)}>
                                <FaTimes />
                            </button>
                        </div>

                        <div className="model-info media-body">
                            <div className="model-head d-flex">
                                <span className="model-name" contentEditable
                                    suppressContentEditableWarning
                                    onBlur={e =>
                                        this.props.updateInfo(
                                            'model',
                                            e.target.innerText,
                                            item.apptId
                                        )
                                    }>
                                    {item.model}
                                </span>
                                <span className="appt-date ml-auto">
                                    <Moment
                                        date={item.apptDate}
                                        parse="YYYY-MM-DD hh:mm"
                                        format="YYYY-MMM-D h:mma"
                                    />
                                </span>
                            </div>

                            <div className="make">
                                <span className="label-item">Make: </span>
                                <span
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={e =>
                                        this.props.updateInfo(
                                            'make',
                                            e.target.innerText,
                                            item.apptId
                                        )
                                    }>
                                    {item.make}
                                </span>
                            </div>

                            <div className="owner">
                                <span className="label-item">Owner: </span>
                                <span
                                    contentEditable
                                    suppressContentEditableWarning
                                    onBlur={e =>
                                        this.props.updateInfo(
                                            'owner',
                                            e.target.innerText,
                                            item.apptId
                                        )
                                    }>
                                    {item.owner}
                                </span>
                            </div>

                            <div
                                className="appt-notes"
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={e =>
                                    this.props.updateInfo(
                                        'apptNotes',
                                        e.target.innerText,
                                        item.apptId
                                    )
                                }>
                                {item.apptNotes}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default ListAppointments;