import * as actionTypes from './actions';

const initialState = {
    list: [
        { noteId: 101, content: 'Note 1', createdAt: new Date().toDateString() },
        { noteId: 102, content: 'Note 2', createdAt: new Date().toDateString() },
        { noteId: 103, content: 'Note 3', createdAt: new Date().toDateString() },
    ]
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case(actionTypes.ADD_NOTE):
            return {
                ...state,
                list: state.list.concat({ 
                    ...action.payload,
                    noteId: guid(),
                    createdAt: new Date().toLocaleDateString()
                })
            };
        case(actionTypes.EDIT_NOTE): {
            const notes = [...state.list];
            let idx = notes.findIndex(note => note.noteId === action.payload.noteId);
            notes[idx] =  {...notes[idx], ...action.payload.changes, ...{ createdAt: new Date().toLocaleDateString() }};
            return { ...state, list: notes };
        }
        default:
            return state;
    }
}

function guid() {
    return Math.floor(Math.random() * 100);
}

export default reducer;
