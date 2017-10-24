import React, { Component } from 'react';
import {fetchCandidates, searchForCandidates} from './reducer';
import store from './store'
import Result from './result'
import Similar from './similar'


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
        return (
            <div>
                <div>
                    <div className="col-xs-6">
                    <h3><strong>Search For Candidate</strong></h3>
                    <form id="search-candidates" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input 
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
                    <div>
                    {searchResult
                    ? <Result candidate={searchResult}/>
                    : <div className="alert alert-warning" role="alert">
                        No Results.
                    </div>
                    }
                    </div>
                    <div>
                    {similar_candidates.length && searchResult
                        ? similar_candidates.map(each => <Similar candidate={each} />)
                        : <div></div>
                        }
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}