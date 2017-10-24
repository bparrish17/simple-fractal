import React, { Component } from 'react';
const read_scores = require('../data').read_scores;
const read_companies = require('../data').read_companies;

const find_candidate = (candidate_id) => {
    read_scores.then(score_records_data => {
        return score_records_data.find(candidate => candidate.candidate_id === candidate_id)
    })
    .then(res => {
        console.log(res)
        assess_candidate(res)
    })
}

export default class Root extends Component {
    componentDidMount() {
        find_candidate('946')
    }
    render() {
        return (
           <h1>Hello World</h1>
        )
    }
}