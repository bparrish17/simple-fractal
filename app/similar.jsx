import React, { Component } from 'react';
import store from './store';

// Similar Candidates List Component
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
        const similar_candidates = this.props.similar_candidates
        return (
            <div>
                <h3>Similar Candidates</h3>
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
                        {similar_candidates.map(each_candidate => {
                            return (
                                <tr key={each_candidate.candidate_id}>
                                    <th scope="row">{each_candidate.candidate_id}</th>
                                    <td>{each_candidate.title}</td>
                                    <td>{each_candidate.communication_score}</td>
                                    <td>{each_candidate.coding_score}</td>
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