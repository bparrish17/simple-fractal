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
export const GET_COMPANIES = 'GET_COMPANIES';
export const SEARCH_CANDIDATE = 'SEARCH_CANDIDATE';
export const FOUND_SIMILAR = 'FOUND_SIMILAR';
export const FOUND_PERCENTILES = 'FOUND_PERCENTILES'

//Action Creators
export const getCandidates = (candidates) => { 
    return {
        type: GET_CANDIDATES, candidates 
    }
}
export const getCompanies = (companies) => { 
    return {
        type: GET_COMPANIES, companies
    }
}
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

//Thunks
// Get All Candidates
export function fetchCandidates () {
    return function thunk(dispatch) {
      return axios.get('/api/candidates')
      .then(res => res.data)
      .then(candidates => {
          dispatch(getCandidates(candidates));
        })
    }
}

export function fetchCompanies () {
    return function thunk(dispatch) {
      return axios.get('/api/companies')
      .then(res => res.data)
      .then(companies => {
          dispatch(getCompanies(companies));
        })
    }
}

// Get All Candidates from Similar Companies, Titles, and Skills
// + Calculate Percentile of Searched Candidate
export function searchForCandidates (candidate_id) {
    return function thunk(dispatch) {
        return axios.get('/api/candidates')
        .then(res => res.data)
        .then(candidates => {
            let candidate = candidates.find(candidate => candidate.candidate_id === candidate_id)

            //Send Searched Candidate to Reducer
            dispatch(searchCandidate(candidate));
            if(candidate) {
                //Search for Similar Companies/Candidates then Calculate Percentile
                getSimilarCompanies(candidate.company_id)
                .then(similar_companies => getSimilarCandidates(candidate.title, candidates, similar_companies))
                .then(similar_candidates => {
                    dispatch(foundSimilar(similar_candidates))
                    let percentiles = calculatePercentiles(candidate.communication_score, candidate.coding_score, similar_candidates)
                    dispatch(foundPercentiles(percentiles))
                })
            }
        })
    }
}

// Get All Companies
function getSimilarCompanies(id) {
    return axios.get('/api/companies')
    .then(res => res.data)
    .then(companies => {
        let found = companies.find(company => company.company_id === id)
        return sortSimilarCompanies(found, companies)
    })
}

//Helper Functions
// Takes in a Company and Looks for Matches Based on Fractal Index
function sortSimilarCompanies(match, companies) {
    let similar_companies = [];
    companies.forEach(company => {
        if(areSimilar(company, match)) {
            similar_companies.push(company)
        }
    })
    return similar_companies;
}

// Takes in Two Companies and Determines if Similar Based on Fractal Index
function areSimilar (company_1, company_2) {
    return Math.abs(company_1['fractal_index'] - company_2['fractal_index']) < 0.15;
}

// Goes Through Similar Companies to Find Candidates With Similar Titles
// + add percentiles to each candidate
// + returns all similar candidates
function getSimilarCandidates(title, candidates, companies) {
    let similar_candidates = [];
    companies.forEach(company => {
        candidates.forEach(candidate => {
            if(candidate.title === title && candidate.company_id === company.company_id) {
                similar_candidates.push(candidate)
            }
        })
    })
    similar_candidates.forEach(candidate => {
        candidate['percentiles'] = calculatePercentiles(candidate.communication_score, candidate.coding_score, similar_candidates)
    })
    return similar_candidates;
}

// Calculates Percentile of Communication and Coding Scores for Candidate in Relation to Similar Candidates
// + adds and sorts scores then calculates percentiles
// + returns percentiles
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
    let comm_percentile = Math.abs(100*((i-0.5)/n)) 

    let n2 = similar_cod.length
    let i2 = similar_cod.indexOf(Number(coding_score))
    let coding_percentile = Math.abs(100*((i2-0.5)/n2))

    return [comm_percentile, coding_percentile]
}


const reducer = function(state = initialState, action) {
    switch(action.type) {
        case GET_CANDIDATES:
            return Object.assign({}, state, {candidates: action.candidates})
        case GET_COMPANIES:
            return Object.assign({}, state, {companies: action.companies})
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