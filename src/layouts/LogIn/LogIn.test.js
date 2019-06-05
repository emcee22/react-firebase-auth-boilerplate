import React from 'react';
import { shallow } from 'enzyme';
import { LogIn } from './LogIn';

it('renders without crashing', () => {
	shallow(<LogIn />);
});
