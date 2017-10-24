import React, { Component } from 'react';
import store from './store';


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
                <h3><strong>Search Results For [ {candidate.candidate_id} ]</strong></h3>
                <h4>Title: {candidate.title}</h4>
                <h4>Communication Score: {candidate.communication_score} ({comm_score}th Percentile)</h4>
                <h4>Coding Score: {candidate.coding_score} ({coding_score}th Percentile)</h4>
            </div>
        )
    }
}