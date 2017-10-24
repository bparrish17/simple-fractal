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
        return (
            <div>
                <hr />
                <h5>Title: {candidate.title}</h5>
                <h5>Communication Score: {candidate.communication_score}</h5>
                <h5>Coding Score: {candidate.coding_score}</h5>
            </div>
        )
    }
}