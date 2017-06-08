'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @link https://developer.mozilla.org/en/docs/Web/API/HTMLElement
 */
var AmElement = function (_HTMLElement) {
	_inherits(AmElement, _HTMLElement);

	/**
  * @see HTMLElement::constructor()
  * @return {AmElement}
  */
	function AmElement() {
		_classCallCheck(this, AmElement);

		// determine whether template is attached or not
		var _this = _possibleConstructorReturn(this, (AmElement.__proto__ || Object.getPrototypeOf(AmElement)).call(this));

		_this._attached = false;

		// attach shadow root
		_this._root = _this.attachShadow({ mode: 'open' });

		// determine component main class
		_this._mainClass = _this.tagName.toLowerCase().replace('-element', '');

		//
		_this.defineObservedAttributesAsProperties();
		return _this;
	}
	/**
  * @see HTMLElement::attributeChangedCallback()
  * @param  {String} name
  * @param  {String} newValue
  * @param  {String} oldValue
  * @return {void}
  */


	_createClass(AmElement, [{
		key: 'attributeChangedCallback',
		value: function attributeChangedCallback(name, oldValue, newValue) {
			// if element is not created yet or new and old values are the same, ignore event
			if (!this._attached || newValue === oldValue) {
				return;
			}
			// if there is no callback method specifically defined for this attribute
			var callback = this.getAttributeChangedCallbackMethod(name);
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

	}, {
		key: 'connectedCallback',
		value: function connectedCallback() {
			var _this2 = this;

			this._attached = true;

			var TEMPLATE = document.querySelector('#' + this.tagName.toLowerCase() + '-template');
			if (TEMPLATE) {
				// const CONTENT = document.importNode(TEMPLATE.content, true);
				// this._root.appendChild(CONTENT);
				this._root.innerHTML = TEMPLATE.innerHTML;
			}
			this.constructor.observedAttributes.forEach(function (name) {
				_this2[name] = _this2.getAttribute(name);
			});
		}
		/**
   * @see HTMLElement::disctonnectedCallback()
   * @return {void} [description]
   */

	}, {
		key: 'disctonnectedCallback',
		value: function disctonnectedCallback() {
			console.log('Custom Element ' + this._mainClass + ' removed from DOM!');
		}
		/**
   * Return this list of observable attributes for the HTML Element
   * @return {Array(String)}
   */

	}, {
		key: 'changeValue',

		//////////////////////////////////////////////////////////////////////////
		//
		//////////////////////////////////////////////////////////////////////////
		/**
   * [setAttributeValue description]
   * @param {String} name
   * @param {String} newValue
   * @param {String} oldValue
   * @return {void}
   */
		value: function changeValue(name, newValue, oldValue) {
			// determine the attribute's element
			var ELEMENT = this._root.querySelector('.' + this._mainClass + '__' + name);
			// determine the attribute's element property
			var PROPERTY = ELEMENT.getAttribute('data-src-' + name);
			//
			ELEMENT[PROPERTY] = newValue;
		}
		/**
   * Define generic getter & setter for each observed attribute (as internal variables)
   * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
   * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
   * @return {void}
   */

	}, {
		key: 'defineObservedAttributesAsProperties',
		value: function defineObservedAttributesAsProperties() {
			var _this3 = this;

			this.constructor.observedAttributes.forEach(function (name) {
				if (!Object.getOwnPropertyDescriptor(_this3, name) || Object.getOwnPropertyDescriptor(_this3, name).get === undefined) {
					Object.defineProperty(_this3, name, {
						get: function get() {
							return this['__' + name];
						},
						set: function set(value) {
							this['__' + name] = value;
							this.setAttribute(name, value);
							// this.changeValue(name, value);
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

	}, {
		key: 'getAttributeChangedCallbackMethod',
		value: function getAttributeChangedCallbackMethod(name) {
			var method = 'attribute' + name.replace(/[\-_]\w/g, function (w) {
				return w.replace(/[\-_]/, '').toUpperCase();
			}) + 'ChangedCallback';
			return this[method];
		}
	}], [{
		key: 'observedAttributes',
		get: function get() {
			return [];
		}
	}]);

	return AmElement;
}(HTMLElement);