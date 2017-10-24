import axios from 'axios';

const initialState = {
    candidates: [],
    companies: [],
    searchResult: '',
    similarCandidates: [],
    percentiles: []
}

//Action Types
export const GET_CANDIDATES = 'GET_CANDIDATES';
export const SEARCH_CANDIDATE = 'SEARCH_CANDIDATE';
export const FOUND_SIMILAR = 'FOUND_SIMILAR';
export const FOUND_PERCENTILES = 'FOUND_PERCENTILES'

export const getCandidates = (candidates) => {
    return {
      type: GET_CANDIDATES,
      candidates
    }
}

//Action Creators
export const searchCandidate = (candidate) => {
    return {
      type: SEARCH_CANDIDATE,
      candidate
    }
}

export const foundSimilar = (candidates) => {
    return {
        type: FOUND_SIMILAR,
        candidates
    }
}

export const foundPercentiles = (percentiles) => {
    return {
        type: FOUND_PERCENTILES,
        percentiles
    }
}

export function fetchCandidates () {
    return function thunk(dispatch) {
      return axios.get('/api/candidates')
      .then(res => res.data)
      .then(candidates => {
          dispatch(getCandidates(candidates));
        })
    }
}

function getSimilarCompanies(match, companies) {
    let similar_companies = [];
    companies.forEach(company => {
        if(areSimilar(company, match)) {
            similar_companies.push(company)
        }
    })
    return similar_companies;
}

function getCompany(id) {
    return axios.get('/api/companies')
    .then(res => res.data)
    .then(companies => {
        let found = companies.find(company => company.company_id === id)
        return getSimilarCompanies(found, companies)
    })
}

function areSimilar (company_1, company_2) {
    return Math.abs(company_1['fractal_index'] - company_2['fractal_index']) < 0.15;
}

function findSimilarCandidates(title, candidates, companies) {
    let similar_candidates = [];
    companies.forEach(company => {
        candidates.forEach(candidate => {
            if(candidate.title === title && candidate.company_id === company.company_id) {
                similar_candidates.push(candidate)
            }
        })
    })
    return similar_candidates;
}

export function searchForCandidates (candidate_id) {
    return function thunk(dispatch) {
        return axios.get('/api/candidates')
        .then(res => res.data)
        .then(candidates => {
            let candidate = candidates.find(candidate => candidate.candidate_id === candidate_id)
            dispatch(searchCandidate(candidate));

            getCompany(candidate.company_id)
            .then(similar_companies => findSimilarCandidates(candidate.title, candidates, similar_companies))
            .then(similar_candidates => {
                dispatch(foundSimilar(similar_candidates))
                let percentiles = calculatePercentiles(candidate.communication_score, candidate.coding_score, similar_candidates)
                dispatch(foundPercentiles(percentiles))
            })
        })
    }
}

function calculatePercentiles(comm_score, coding_score, similar_candidates) {
    let sortNumber = (a, b) => a - b
    let similar_comm = [];
    let similar_cod = [];
    similar_candidates.forEach(candidate => {
        similar_comm.push(Number(candidate.communication_score))
        similar_cod.push(Number(candidate.coding_score))
    })
    similar_comm.push(Number(comm_score))
    similar_comm.sort(sortNumber)

    similar_cod.push(Number(coding_score))
    similar_cod.sort(sortNumber)

    let n = similar_comm.length
    let i = similar_comm.indexOf(Number(comm_score))
    let p = 100*((i-0.5)/n) 

    let n2 = similar_cod.length
    let i2 = similar_cod.indexOf(Number(coding_score))
    let p2 = 100*((i2-0.5)/n2)

    return [p, p2]
}



const reducer = function(state = initialState, action) {
    switch(action.type) {
        case GET_CANDIDATES:
            return Object.assign({}, state, {candidates: action.candidates})
        case SEARCH_CANDIDATE:
            return Object.assign({}, state, {searchResult: action.candidate})
        case FOUND_SIMILAR: 
            return Object.assign({}, state, {similarCandidates: action.candidates})
        case FOUND_PERCENTILES:
            return Object.assign({}, state, {percentiles: action.percentiles})
        default: return state
    }
  };
  
export default reducer;