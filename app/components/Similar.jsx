import React, { Component } from 'react';
import store from '../store';

// Similar Candidates List Component
export default class Root extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
    }
    render() {
        const similar_candidates = this.props.similar_candidates
        similar_candidates.forEach(candidate => {
            candidate['outlier'] = (candidate.percentiles[0] > 60 && candidate.percentiles[1] > 60)
            ? true 
            : false
        })
        return (
            <div>
                <h3>Similar Candidates</h3>
                <h7>*Higher Percentile Candidates Marked Yellow</h7>
                <br />
                <br />
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
                        {similar_candidates.map(candidate => {
                            let style;
                            if(candidate['outlier']) style = { 'backgroundColor': 'rgba(241, 232, 14, 0.74)' }
                            else style = {};
                            return (
                                <tr style={style} key={candidate.candidate_id}>
                                    <th scope="row">{candidate.candidate_id}</th>
                                    <td>{candidate.title}</td>
                                    <td>{candidate.communication_score} (Percentile: {Math.round(candidate.percentiles[0])})</td>
                                    <td>{candidate.coding_score} (Percentile: {Math.round(candidate.percentiles[1])})</td>
                                    <td>{candidate.company_id}</td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}