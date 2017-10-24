import axios from 'axios';

const initialState = {
    candidates: [],
    companies: []
}

export const GET_CANDIDATES = 'GET_CANDIDATES';

export const getCandidates = (candidates) => {
    return {
      type: GET_CANDIDATES,
      candidates
    }
  }

export function fetchCandidates () {
    return function thunk(dispatch) {
      return axios.get('/api/candidates')
      .then(res => res.data)
      .then(candidates => {
        console.log('candidates', candidates)
        dispatch(getCandidates(candidates));
      })
    }
  }


const reducer = function(state = initialState, action) {
    switch(action.type) {
      case GET_CANDIDATES:
        return Object.assign({}, state, {candidates: action.candidates})
      default: return state
    }
  };
  
export default reducer;