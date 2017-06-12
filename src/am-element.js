/**
 * @link https://developer.mozilla.org/en/docs/Web/API/HTMLElement
 */
export class AmElement extends HTMLElement {
	/**
	 * @see HTMLElement::constructor()
	 * @return {AmElement}
	 */
	constructor(_useShadow = { mode: 'open' }) {
		super();

		/**
		 * [_useShadow description]
		 * @type {[type]}
		 */
		this._useShadow = _useShadow;

		// determine whether template is attached or not
		this._attached = false;

		// attach shadow root
		if (_useShadow) this.attachShadow(_useShadow);
		// this._root = this.attachShadow({ mode: 'open' });

		// determine component main class
		this._mainClass = this.tagName.toLowerCase().replace('am-', '').replace('-element', '');

		//
		this.defineObservedAttributesAsProperties();
	}
	/**
	 * @see HTMLElement::attributeChangedCallback()
	 * @param  {String} name
	 * @param  {String} newValue
	 * @param  {String} oldValue
	 * @return {void}
	 */
	attributeChangedCallback(name, oldValue, newValue) {
		// if element is not created yet or new and old values are the same, ignore event
		if (!this._attached || newValue === oldValue) {
			return;
		}
		// if there is no callback method specifically defined for this attribute
		let callback = this.getAttributeChangedCallbackMethod(name);
		if (!callback) {
			this[name] = newValue;
		} else {
			callback.call(this, [newValue, oldValue]);
		}
	}
	/**
	 * @see HTMLElement::connectedCallback()
	 * @return {void}
	 */
	connectedCallback() {
		this._attached = true;

		const TEMPLATE = document.querySelector(`#${this.tagName.toLowerCase()}-template`);
		if (TEMPLATE) {
			// const CONTENT = document.importNode(TEMPLATE.content, true);
			// this._root.appendChild(CONTENT);
			this.shadowRoot.innerHTML = TEMPLATE.innerHTML;
		}
		this.constructor.observedAttributes.forEach((name) => { this[name] = this.getAttribute(name); });
	}
	/**
	 * @see HTMLElement::disctonnectedCallback()
	 * @return {void} [description]
	 */
	disctonnectedCallback() {
		console.log(`Custom Element ${this._mainClass} removed from DOM!`);
	}
	/**
	 * Return this list of observable attributes for the HTML Element
	 * @return {Array(String)}
	 */
	static get observedAttributes() {
		return [];
	}
	//////////////////////////////////////////////////////////////////////////
	//
	//////////////////////////////////////////////////////////////////////////
	/**
	 * Apply an attribute value to the required element
	 * @param {String} name
	 * @param {String} newValue
	 * @return {void}
	 */
	attributeApplyValue(name, value) {
		let method = this.getAttributeApplyValueMethod(name);
		if (!method) {
			// determine the attribute's element
			const ELEMENT = this.shadowRoot.querySelector(`.${this._mainClass}__${name}`);
			// determine the attribute's element property
			const PROPERTY = this.constructor.observedAttributesProperty[name] || this.getAttribute(`data-src-${name}`);
			// set property to inner element
			ELEMENT[PROPERTY] = value;
		} else {
			method.call(this, [value]);
		}
	}
	/**
	 * Define generic getter & setter for each observed attribute (as internal variables)
	 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
	 * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
	 * @return {void}
	 */
	defineObservedAttributesAsProperties() {
		this.constructor.observedAttributes.forEach((name) => {
			if (!Object.getOwnPropertyDescriptor(this, name) || Object.getOwnPropertyDescriptor(this, name).get === undefined) {
				Object.defineProperty(this, name, {
					get: function() { return this[`__${name}`] },
					set: function(value) {
						this[`__${name}`] = value;
						this.setAttribute(name, value);
						this.attributeApplyValue(name, value);
					}
				});
			}
		});
	}
	/**
	 * Try to obtain the attributeChanged{Name}Callback method; return false in stead
	 * @method getAttributeChangedCallbackMethod
	 * @param  {String}           name
	 * @return {Boolean|Function}
	 */
	getAttributeChangedCallbackMethod(name) {
		let method = `attribute${name.replace(/[\-_]\w/g, (w) => w.replace(/[\-_]/, '').toUpperCase())}ChangedCallback`;
		return this[method];
	}
	getAttributeApplyValueMethod(name) {
		let method = `attribute${name.replace(/[\-_]\w/g, (w) => w.replace(/[\-_]/, '').toUpperCase())}ApplyValue`;
		return this[method];
	}
	/**
	 * Return the list of property names changeable by observedAttributes list
	 * @return {Object(String:String)}
	 */
	static get observedAttributesProperty() {
		return {};
	}
}
