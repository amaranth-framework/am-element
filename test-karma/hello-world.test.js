import { AmElement } from '../src/am-element';

class HelloWorldElement extends AmElement {
  /**
   * @see AmElement::constructor()
   */
  constructor() {
	super();
	// this._root = this;
  }
  /**
   * @see AmElement::observedAttributes()
   */
  static get observedAttributes() {
	return ['message'];
  }
};

window.customElements.define('am-hello-world', HelloWorldElement);

document.body.innerHTML = `<template id="am-hello-world-template">
<h1 class="hello-world"><span class="hello-world__message"></span> World!</h1>
</template>
<am-hello-world message="Hello" data-src-message="innerHTML"></am-hello-world>`;

describe('the framework config', () => {
	it('should initialize', () => {

		console.log(document.querySelector('am-hello-world'));

		// let aureliaMock = jasmine.createSpyObj('aureliaMock', ['loader']);
		// let config = new FrameworkConfiguration(aureliaMock);
		//
		// expect(config).toBeDefined();
		// expect(config.aurelia).toBe(aureliaMock);
		// expect(config.info).toEqual(jasmine.any(Array));
		// expect(config.info.length).toEqual(0);
		// expect(config.processed).toBeFalsy();
	});
}

// import { Selector } from 'testcafe';
//
//
// const WAITTIME=100;
// // const WAITTIME=60*1000;
//
// fixture `Amaranth Custom Element`
//     .page `./build/am-element.html`
//
// test('Check if custom element exists', async t => {
//     // Test Element
// 	const selector = Selector('am-hello-world');
// 	// Test Code
// 	await t.wait(WAITTIME).expect(selector.count).eql(1);
// });
//
// test('Check attribute presence', async t => {
//     // Test Element
// 	const selector = Selector('am-hello-world').addCustomDOMProperties({
//         message: el => el.message,
//         _mainClass: el => el._mainClass,
// 		element: el => el
//     });
// 	const element = await selector.element;
// 	// Test Code
// 	await t.expect(element._mainClass).eql('hello-world');
//
// 	await t.expect(element.getAttribute('message')).eql('Hello');
// 	await t.expect(element.message).eql('Hello');
//
// 	// won't work testing ...
// 	// element.message = 'Hi';
// 	// await t.expect(element.getAttribute('message')).eql('Hi');
// 	// await t.expect(element.message).eql('Hi');
//
// 	// element.setAttribute('message', 'Hallo');
// 	// await t.expect(element.getAttribute('message')).eql('Hallo');
// 	// await t.expect(element.message).eql('Hallo');
// });
