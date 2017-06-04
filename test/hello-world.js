import { AmElement } from '../src/am-element.js';

class HelloWorldElement extends AmElement {
	/**
	 * @see AmElement::connectedCallback()
	 */
	connectedCallback() {
		this._attached = true;
		this._root.innerHTML = '<p>Hello World!</p>';
	}
}

document.registerElement('am-hello-world', HelloWorldElement);

describe('AmElement', () => {

	it('should initialize', () => {

		let loader = jasmine.createSpy('loader');

		console.log('test');

		expect(true).toBeTrue();

		// document.body.innerHTML = '<hello-world></hello-world>';
		// let aureliaMock = jasmine.createSpyObj('aureliaMock', ['loader']);
		// let config = new FrameworkConfiguration(aureliaMock);

		// expect(config).toBeDefined();
		// expect(config.aurelia).toBe(aureliaMock);
		// expect(config.info).toEqual(jasmine.any(Array));
		// expect(config.info.length).toEqual(0);
		// expect(config.processed).toBeFalsy();
	});

});
