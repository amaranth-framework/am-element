import { Selector } from 'testcafe';


const WAITTIME=100;
// const WAITTIME=60*1000;

fixture `Amaranth Custom Element`
    .page `./build/am-element.html`

test('Check if custom element exists', async t => {
    // Test Element
	const selector = Selector('am-hello-world');
	// Test Code
	await t.wait(WAITTIME).expect(selector.count).eql(1);
});

test('Check attribute presence', async t => {
    // Test Element
	const selector = Selector('am-hello-world').addCustomDOMProperties({
        message: el => el.message,
		element: el => el
    });
	const element = await selector.element;
	// Test Code
	await t.expect(element.getAttribute('message')).eql('Hello');
	await t.expect(element.message).eql('Hello');

	// won't work testing ... 
	// element.message = 'Hi';
	// await t.expect(element.getAttribute('message')).eql('Hi');
	// await t.expect(element.message).eql('Hi');

	// element.setAttribute('message', 'Hallo');
	// await t.expect(element.getAttribute('message')).eql('Hallo');
	// await t.expect(element.message).eql('Hallo');
});
