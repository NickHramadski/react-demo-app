import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { ControlLabel } from "react-bootstrap";

import { Home } from "./Home";
import { NotesList } from "../components/NotesList";

configure({ adapter: new Adapter() });

const NOTE_CREATED_AT = '12-03-2020';
const TEST_NOTES = [
  { noteId: '1', content: 'Note 1', createdAt: NOTE_CREATED_AT },
  { noteId: '2', content: 'Note 2', createdAt: NOTE_CREATED_AT },
  { noteId: '3', content: 'Note 3', createdAt: NOTE_CREATED_AT },
];

describe('<Home />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Home notes={TEST_NOTES} />);
  });

  it('renders one <ControlLabel /> component', () => {
    expect(wrapper.contains(<ControlLabel>Search</ControlLabel>)).toEqual(true);
  });

  it('renders one <NotesList /> component', () => {
    expect(wrapper.contains(<NotesList></NotesList>)).toEqual(true);
  });
});