import { notesApi } from '../../axios.instance'

export const INIT = 'INIT';
export const SEARCH = 'NOTES_SEARCH';
export const LOAD_NOTES = 'NOTES_LOAD_NOTES';
export const LOAD_NOTES_SUCCESS = 'NOTES_LOAD_NOTES_SUCCESS';
export const LOAD_NOTES_FAILED = 'NOTES_LOAD_NOTES_FAILED';
export const ADD_NOTE = 'NOTES_ADD_NOTE';
export const ADD_NOTE_SUCCESS = 'NOTES_ADD_NOTE_SUCCESS';
export const ADD_NOTE_FAILED = 'NOTES_ADD_NOTE_FAILED';
export const UPDATE_NOTE = 'NOTES_UPDATE_NOTE';
export const UPDATE_NOTE_SUCCESS = 'NOTES_UPDATE_NOTE_SUCCESS';
export const UPDATE_NOTE_FAILED = 'NOTES_UPDATE_NOTE_FAILED';

export const searchNotes = (searchString) => {
    return {
        type: SEARCH,
        payload: searchString
    };
};

export const loadNotesSuccess = (data) => {
    return {
        type: LOAD_NOTES_SUCCESS,
        payload: data
    };
};

export const loadNotesFailed = (error) => {
    return {
        type: LOAD_NOTES_FAILED,
        payload: error
    };
};

export const loadNotes = () => {
    return dispatch => {
        notesApi.get(`notes.json`)
            .then(response => {
                dispatch(loadNotesSuccess(response.data)) //map(note => [note.noteId, note])
            })
            .catch(error => {
                dispatch(loadNotesFailed(error))
            })
    };
};

export const addNoteSuccess = (data) => {
    return {
        type: ADD_NOTE_SUCCESS,
        payload: data
    };
};

export const addNoteFailed = (error) => {
    return {
        type: ADD_NOTE_FAILED,
        payload: error
    };
};

export const addNote = (data) => {
    return dispatch => {
        const entity = { 
            createdAt: new Date().toLocaleDateString(),
            ...data
        };
        notesApi.post(`notes.json`, entity)
            .then(response => {
                const result = {...entity, noteId: response.data.name};
                dispatch(addNoteSuccess(result))
            })
            .catch(error => {
                dispatch(addNoteFailed(error))
            })
    };
};

export const updateNoteSuccess = (noteId, data) => {
    return {
        type: UPDATE_NOTE_SUCCESS,
        payload: { noteId , data }
    };
};

export const updateNoteFailed = (error) => {
    return {
        type: UPDATE_NOTE_FAILED,
        payload: error
    };
};

export const updateNote = (noteId, changes) => {
    return dispatch => {
        const entity = {...changes, ...{ createdAt: new Date().toLocaleDateString() }};
        notesApi.patch(`notes/${noteId}/.json`, entity)
            .then(response => {
                console.log('--UPDATE:', response.data);
                dispatch(updateNoteSuccess(noteId, entity))
            })
            .catch(error => {
                dispatch(updateNoteFailed(error))
            })
    };
};
