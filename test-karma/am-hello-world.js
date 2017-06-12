import { AmElement } from '../src/am-element';

class HelloWorldElement extends AmElement {
	/**
	* @see AmElement::constructor()
	*/
	constructor(...args) {
		super(...args);
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
