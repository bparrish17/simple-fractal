import React, { Component } from 'react';
import store from '../store';

// Candidate Search Result Component
export default class Root extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const candidate = this.props.candidate
        const comm_score = Math.round(this.props.percentiles[0])
        const coding_score = Math.round(this.props.percentiles[1])
        return (
            <div>
                <h3>Candidate Info</h3>
                <table id="candidateTable" className="table">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Communication Score</th>
                    <th>Coding Score</th>
                    <th>Company</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">{candidate.candidate_id}</th>
                        <td>{candidate.title}</td>
                        <td>{candidate.communication_score} (Percentile: {comm_score})</td>
                        <td>{candidate.coding_score} (Percentile: {coding_score})</td>
                        <td>{candidate.company_id}</td>
                    </tr>
                </tbody>
                </table>
            </div>
        )
    }
}