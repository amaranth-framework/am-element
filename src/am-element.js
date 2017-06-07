/**
 * @link https://developer.mozilla.org/en/docs/Web/API/HTMLElement
 */
class AmElement extends HTMLElement {
    /**
     * AmElement Constructor
     * @return {AmElement}
     */
    constructor() {
        super();

        // determine whether template is attached or not
        this._attached = false;

        // attach shadow root
        this._root = this.attachShadow({ mode: 'open' });

        // determine component main class
        this._mainClass = this.tagName.toLowerCase().replace('-element', '');

        //
        this.defineObservedAttributesAsProperties();
    }
    /**
     * Event for Attribute Value Changed
     * @param  {String} name
     * @param  {String} newValue
     * @param  {String} oldValue
     * @return {void}
     */
    attributeChangedCallback(name, newValue, oldValue) {
        // if element is not created yet or new and old values are the same, ignore event
        if (!this._attached || newValue === oldValue) {
            return;
        }

        let _name = name.replace(/[\-_]\w/g, (w) => w.replace(/[\-_]/, '').toUpperCase());
        let _method = `attribute${_name}Changed`;
        if (this[_method]) {
            this[_method](newValue, oldValue);
        } else {
            this[name] = newValue;
        }
    }
    /**
     * [connectedCallback description]
     * @return {void} [description]
     */
    connectedCallback() {
        this._attached = true;

        const TEMPLATE = document.querySelector(`#${this.tagName.toLowerCase()}-template`);
        if (TEMPLATE) {
			// const CONTENT = document.importNode(TEMPLATE.content, true);
        	this._root.innerHTML = TEMPLATE.innerHTML;
		}

        this.constructor.observedAttributes.forEach((name) => { this[name] = this.getAttribute(name); });
    }
    /**
     * [disctonnectedCallback description]
     * @return {void} [description]
     */
    disctonnectedCallback() {
        console.log("Custom Element removed from DOM!");
    }
    /**
     * [setAttributeValue description]
     * @param {String} name     [description]
     * @param {String} newValue [description]
     * @param {String} oldValue [description]
     */
    changeValue(name, newValue, oldValue) {
        // determine the attribute's element
        const ELEMENT = this._root.querySelector(`.${this._mainClass}__${name}`);
        // determine the attribute's element property
        const PROPERTY = ELEMENT.getAttribute(`data-src-${name}`);
        //
        ELEMENT[PROPERTY] = newValue;
    }
    /**
     * Return this list of observable attributes for the HTML Element
     * @return {Array(String)}
     */
    static get observedAttributes() {
        return [];
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
                        this.changeValue(name, value);
                    }
                });
            }
        });
    }
}
