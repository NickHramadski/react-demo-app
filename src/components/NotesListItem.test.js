import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import { LinkContainer } from "react-router-bootstrap";
import { ListGroupItem } from "react-bootstrap";
import NotesListItem from "./NotesListItem";

configure({ adapter: new Adapter() });

const NOTE_CREATED_AT = '12-03-2020';
const TEST_NOTE = { noteId: '1', content: 'Note 1', createdAt: NOTE_CREATED_AT };

describe('<NotesListItem />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NotesListItem note={TEST_NOTE} />);
  });

  it('renders one <LinkContainer /> components and one <ListGroupItem /> component', () => {
    expect(wrapper.find(LinkContainer)).toHaveLength(1);
    expect(wrapper.find(ListGroupItem)).toHaveLength(1);
  });

  it('renders note data', () => {
    expect(wrapper.contains("Created: " + new Date(NOTE_CREATED_AT).toLocaleString())).toBeTruthy();
  });
});