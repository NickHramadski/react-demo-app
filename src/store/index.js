import { createSelector } from 'reselect';

const getAuthLoggedIn = (state) => state.auth.loggedIn;
const getAuthUserEmail = (state) => state.auth.userEmail;
const getAuthLoginError = (state) => state.auth.loginError;

const getNotesMap = (state) => state.notes.map;
const getNotesSearchString = (state) => state.notes.searchString;

/* AUTH */
export const getIsUserLoggedIn = createSelector([ getAuthLoggedIn ], (loggedIn) => loggedIn);
export const getLoggedUserEmail = createSelector([ getAuthUserEmail ], (userEmail) => userEmail);
export const getLoginError = createSelector([ getAuthLoginError ], (loginError) => loginError);

/* NOTES */
export const getSearchString = createSelector([ getNotesSearchString ], (searchString) => searchString);
export const getNotesList = createSelector([ getNotesMap ], (notesMap) => {
  return [...notesMap].map(([key, value]) => ({...value, noteId: key}))
});
export const getFilteredNotes = createSelector([ getNotesList, getNotesSearchString ], (notesList, notesSearchString) => {
  if (!notesSearchString) return notesList;
    const notesSearchStringLower = notesSearchString.toLowerCase();
    return notesList.filter(note => note.content.toLowerCase().indexOf(notesSearchStringLower) >= 0);
  }
)