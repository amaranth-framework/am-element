let AmElement = class AmElement extends HTMLElement {
	constructor() {
		super();

		this._attached = false;

		this._root = this.attachShadow({ mode: 'open' });

		this._mainClass = this.tagName.toLowerCase().replace('am-', '').replace('-element', '');

		this.defineObservedAttributesAsProperties();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (!this._attached || newValue === oldValue) {
			return;
		}

		let callback = this.getAttributeChangedCallbackMethod(name);
		if (!callback) {
			this[name] = newValue;
		} else {
			callback.call(this, [newValue, oldValue]);
		}
	}

	connectedCallback() {
		this._attached = true;

		const TEMPLATE = document.querySelector(`#${this.tagName.toLowerCase()}-template`);
		if (TEMPLATE) {
			this._root.innerHTML = TEMPLATE.innerHTML;
		}
		this.constructor.observedAttributes.forEach(name => {
			this[name] = this.getAttribute(name);
		});
	}

	disctonnectedCallback() {
		console.log(`Custom Element ${this._mainClass} removed from DOM!`);
	}

	static get observedAttributes() {
		return [];
	}

	attributeApplyValue(name, value) {
		let method = this.getAttributeApplyValueMethod(name);
		if (!method) {
			const ELEMENT = this._root.querySelector(`.${this._mainClass}__${name}`);

			const PROPERTY = this.getAttribute(`data-src-${name}`);

			ELEMENT[PROPERTY] = value;
		} else {
			method.call(this, [value]);
		}
	}

	defineObservedAttributesAsProperties() {
		this.constructor.observedAttributes.forEach(name => {
			if (!Object.getOwnPropertyDescriptor(this, name) || Object.getOwnPropertyDescriptor(this, name).get === undefined) {
				Object.defineProperty(this, name, {
					get: function () {
						return this[`__${name}`];
					},
					set: function (value) {
						this[`__${name}`] = value;
						this.setAttribute(name, value);
						this.attributeApplyValue(name, value);
					}
				});
			}
		});
	}

	getAttributeChangedCallbackMethod(name) {
		let method = `attribute${name.replace(/[\-_]\w/g, w => w.replace(/[\-_]/, '').toUpperCase())}ChangedCallback`;
		return this[method];
	}
	getAttributeApplyValueMethod(name) {
		let method = `attribute${name.replace(/[\-_]\w/g, w => w.replace(/[\-_]/, '').toUpperCase())}ApplyValue`;
		return this[method];
	}
};