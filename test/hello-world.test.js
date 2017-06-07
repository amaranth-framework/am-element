import { Selector } from 'testcafe';


fixture `Amaranth Custom Element`
    .page `./build/am-element.html`

test('Check if custom element exists', async t => {
    // Test code
	const customElement = Selector('am-hello-world');

	await t.expect(customElement.count).eql(1);
});
