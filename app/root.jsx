import React, { Component } from 'react';
import {fetchCandidates} from './reducer';
import store from './store';

const read_scores = require('../data').read_scores;
const read_companies = require('../data').read_companies;


export default class Root extends Component {
    constructor() {
        super();
        this.state = store.getState();
      }
    componentDidMount() {
        store.dispatch(fetchCandidates())
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        let candidates = this.state.candidates;
        return (
            <div>
                <h1>Hello World</h1>
                {candidates.map(candidate => <h4>{candidate.title}</h4>)}
            </div>
        )
    }
}