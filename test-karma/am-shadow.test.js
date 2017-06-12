import { HelloWorldElement } from './am-hello-world';
window.customElements.define('am-hello-world', HelloWorldElement);

document.body.innerHTML = `<template id="am-hello-world-template">
<h1 class="hello-world"><span class="hello-world__message"></span> World!</h1>
</template>
<am-hello-world message="Hello" data-src-message="innerHTML"></am-hello-world>`;

describe('HelloWorldElement => AmElement', () => {

	it('Check if custom element exists', () => {
		expect(document.querySelectorAll('am-hello-world').length).toEqual(1);
	});
	it('Check if custom element exists', () => {
		const element = document.querySelector('am-hello-world');
		console.log('Shadow root', element.shadowRoot);
		console.log('Root', element._root.innerHTML);
		console.log('HTML', element.innerHTML);
		// expect().toEqual(1);
	});

	it('Check constructor inheritance [constructor()]', () => {
		const element = document.querySelector('am-hello-world');
		// expect(element instanceof HelloWorldElement).toBeTrue();
		// expect(element instanceof AmElement).toBeTrue();
		// expect(element instanceof HTMLElement).toBeTrue();
	});

	it('Check observedAttributes<Property>', () => {
		expect(HelloWorldElement.observedAttributes).toEqual(['message']);
		expect(HelloWorldElement.observedAttributesProperty).toEqual({'message': 'innerHTML'});
	});

	it('Check if custom main class is correct', () => {
		const element = document.querySelector('am-hello-world');
		expect(element._mainClass).toEqual('hello-world');
	});

	it('Check attributes and placement at connection [connectedCallback()]', () => {
		const element = document.querySelector('am-hello-world');

		expect(element.getAttribute('message')).toEqual('Hello');
		expect(element.message).toEqual('Hello');

		console.log(element.querySelector('span') || 'MATAAAAAAAAAAAAA');
	});


	it('Check if functionality for getter/setter versut getAttribute/setAttribute [attributeChangedCallback()]', () => {
		const element = document.querySelector('am-hello-world');

		// won't work testing ...
		element.message = 'Hi';
		expect(element.getAttribute('message')).toEqual('Hi');
		expect(element.message).toEqual('Hi');

		element.setAttribute('message', 'Hallo');
		expect(element.getAttribute('message')).toEqual('Hallo');
		expect(element.message).toEqual('Hallo');
	});

	// expect(config.aurelia).toBe(aureliaMock);
	// expect(config.info).toEqual(jasmine.any(Array));
	// expect(config.info.length).toEqual(0);
	// expect(config.processed).toBeFalsy();
});
