import React, { Component } from 'react';
import {fetchCandidates, fetchCompanies, searchForCandidates} from '../store/reducer';
import store from '../store'
import Result from './Result'
import Similar from './Similar'


//Root Component
// Renders Main Page with Search Form
// + Renders Candidate Search Result Component (Result)
// + Renders Similar Candidates List Component (Similar)
export default class Root extends Component {
    constructor() {
        super();
        this.state = store.getState();
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    componentDidMount() {
        store.dispatch(fetchCandidates())
        store.dispatch(fetchCompanies())
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    handleSubmit(event) {
        event.preventDefault();
        const id = this.refs.candidateId.value
        store.dispatch(searchForCandidates(id));
        document.getElementById("search-candidates").reset();
    }

    render() {
        let candidates = this.state.candidates
        let searchResult = this.state.searchResult
        let similar_candidates = this.state.similarCandidates
        let percentiles = this.state.percentiles
        return (
            <div id="search-container" className="col-xs-10">
                <h3>Search For Candidate</h3>
                {/* Search Form */}
                <form id="search-candidates" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input 
                            id="search-bar"
                            ref="candidateId"
                            className="form-control" 
                            type="text" 
                            name="candidateId" 
                            placeholder="Enter Candidate ID" 
                            onChange={this.handleChange}
                            />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                </form>
                <br />
                {/* If There Is Result, Show it. Otherwise Alert That No Results Were Found */}
                <div>
                    {
                    searchResult
                    ? <Result candidate={searchResult} percentiles={percentiles}/>
                    : <div></div> 
                    }
                    {/* To Ensure That 'No Results' Only Renders When Searched */}
                    {
                    searchResult === undefined
                    ? <div id="no-results" className="alert alert-warning" role="alert">No Results Found</div>
                    : <div></div>
                    }
                </div>
                <br />

                {/* Render Table of Similar Candidates, Each Row in 'Similar' Component */}
                <div>
                    {
                    similar_candidates.length && searchResult
                    ? <Similar similar_candidates={similar_candidates} />
                    : <div></div>
                    }
                </div>
            </div>
        )
    }
}