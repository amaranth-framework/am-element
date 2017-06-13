import { AmElement } from '../src/am-element';

class HelloWorldElement extends AmElement {
	/**
	* @see AmElement::constructor()
	*/
	constructor() {
		super(false);
	}
	/**
	* @see AmElement::observedAttributes()
	*/
	static get observedAttributes() {
		return ['message'];
	}
	/**
	* @see AmElement::observedAttributesProperty()
	*/
	static get observedAttributesProperty() {
		return {
			message: 'innerHTML'
		};
	}
};

window.customElements.define('am-hello-world-shadow', HelloWorldElement);

document.body.innerHTML += `<template id="am-hello-world-shadow-template">
<h1 class="hello-world-shadow"><span class="hello-world-shadow__message"></span> World!</h1>
</template>
<am-hello-world-shadow message="Hello" data-src-message="innerHTML"></am-hello-world-shadow>`;

/************************************************************************************************
 * [HelloWorldElement description]
 * @type {[type]}
 ************************************************************************************************/
describe('HelloWorldElement => AmElement', () => {

	it('Check if custom element exists', () => {
		expect(document.querySelectorAll('am-hello-world-shadow').length).toEqual(1);
	});

	it('Check constructor inheritance [constructor()]', () => {
		const element = document.querySelector('am-hello-world-shadow');
		// expect(element instanceof HelloWorldElement).toBeTrue();
		// expect(element instanceof AmElement).toBeTrue();
		// expect(element instanceof HTMLElement).toBeTrue();
	});

	it('Check observedAttributes<Property>', () => {
		expect(HelloWorldElement.observedAttributes).toEqual(['message']);
		expect(HelloWorldElement.observedAttributesProperty).toEqual({'message': 'innerHTML'});
	});

	it('Check if custom main class is correct', () => {
		const element = document.querySelector('am-hello-world-shadow');
		expect(element._mainClass).toEqual('hello-world-shadow');
	});

	it('Check attributes and placement at connection [connectedCallback()]', () => {
		const element = document.querySelector('am-hello-world-shadow');

		expect(element._attached).toBe(true);
		expect(element.querySelector('span').innerText).toEqual('Hello');
	});


	it('Check if functionality for getter/setter versut getAttribute/setAttribute [attributeChangedCallback()]', () => {
		const element = document.querySelector('am-hello-world-shadow');

		element.message = 'Hi';
		expect(element.getAttribute('message')).toEqual('Hi');
		expect(element.message).toEqual('Hi');

		element.setAttribute('message', 'Hallo');
		expect(element.getAttribute('message')).toEqual('Hallo');
		expect(element.message).toEqual('Hallo');

		expect(element.querySelector('span').innerText).toEqual('Hallo');
	});

});
