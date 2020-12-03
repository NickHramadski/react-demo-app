import { Map } from 'immutable';
import * as actionTypes from './actions';

const initialState = {
    searchString: '',
    map: Map(),
    error: null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.LOAD_NOTES_SUCCESS): 
            return {
                ...state,
                map: Map(action.payload)
            };
        case(actionTypes.SEARCH):
            return {
                ...state,
                searchString: action.payload
            };
        case(actionTypes.ADD_NOTE_SUCCESS): {
            return {
                ...state,
                map: state.map.set(action.payload.noteId, action.payload)
            };
        }
        case(actionTypes.UPDATE_NOTE_SUCCESS): {
            return { ...state, map: state.map.set(action.payload.noteId, action.payload.data) };
        }
        default:
            return state;
    }
}

export default reducer;
