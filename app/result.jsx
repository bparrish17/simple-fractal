import React, { Component } from 'react';
import store from './store';

// Candidate Search Result Component
export default class Root extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
      }
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const candidate = this.props.candidate
        const comm_score = Math.round(this.state.percentiles[0])
        const coding_score = Math.round(this.state.percentiles[1])
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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">{candidate.candidate_id}</th>
                        <td>{candidate.title}</td>
                        <td>{candidate.communication_score} (Percentile: {comm_score})</td>
                        <td>{candidate.coding_score} (Percentile: {coding_score})</td>
                    </tr>
                </tbody>
                </table>
            </div>
        )
    }
}
// <div>
//     <h3>Search Results For [ {candidate.candidate_id} ]</h3>
//     <h4>Title: {candidate.title}</h4>
//     <h4>Communication Score: {candidate.communication_score} ({comm_score} Percentile)</h4>
//     <h4>Coding Score: {candidate.coding_score} ({coding_score} Percentile)</h4>
// </div>