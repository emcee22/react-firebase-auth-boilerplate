import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from './auth.context';
import { firebaseAppAuth } from '../firebase';

it('renders without crashing', () => {
	const wrapper = shallow(<Provider />);
	const instance = wrapper.instance();

	expect(instance.mounted).toBe(true);
	expect(instance.unsubscribe).toBeTruthy();
});

it('checks if componentWillUnmount() works', () => {
	const wrapper = shallow(<Provider />);
	const instance = wrapper.instance();
	const spy = jest.spyOn(instance, 'unsubscribe');

	instance.componentWillUnmount();

	expect(instance.mounted).toBe(false);
	expect(spy).toHaveBeenCalled();
});

it('checks if logIn() works', () => {
	const wrapper = shallow(<Provider />);
	const instance = wrapper.instance();
	const spy = jest.spyOn(firebaseAppAuth, 'signInWithPopup');

	instance.logIn();

	expect(spy).toHaveBeenCalled();
});

it('checks if logOut() works', () => {
	const wrapper = shallow(<Provider />);
	const instance = wrapper.instance();
	const spy = jest.spyOn(firebaseAppAuth, 'signOut');

	instance.logOut();

	expect(spy).toHaveBeenCalled();
});
