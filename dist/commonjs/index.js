'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AmElement = function (_HTMLElement) {
	_inherits(AmElement, _HTMLElement);

	function AmElement() {
		_classCallCheck(this, AmElement);

		var _this = _possibleConstructorReturn(this, (AmElement.__proto__ || Object.getPrototypeOf(AmElement)).call(this));

		_this._attached = false;

		_this._root = _this.attachShadow({ mode: 'open' });

		_this._mainClass = _this.tagName.toLowerCase().replace('am-', '').replace('-element', '');

		_this.defineObservedAttributesAsProperties();
		return _this;
	}

	_createClass(AmElement, [{
		key: 'attributeChangedCallback',
		value: function attributeChangedCallback(name, oldValue, newValue) {
			if (!this._attached || newValue === oldValue) {
				return;
			}

			var callback = this.getAttributeChangedCallbackMethod(name);
			if (!callback) {
				this[name] = newValue;
			} else {
				callback.call(this, [newValue, oldValue]);
			}
		}
	}, {
		key: 'connectedCallback',
		value: function connectedCallback() {
			var _this2 = this;

			this._attached = true;

			var TEMPLATE = document.querySelector('#' + this.tagName.toLowerCase() + '-template');
			if (TEMPLATE) {
				this._root.innerHTML = TEMPLATE.innerHTML;
			}
			this.constructor.observedAttributes.forEach(function (name) {
				_this2[name] = _this2.getAttribute(name);
			});
		}
	}, {
		key: 'disctonnectedCallback',
		value: function disctonnectedCallback() {
			console.log('Custom Element ' + this._mainClass + ' removed from DOM!');
		}
	}, {
		key: 'attributeApplyValue',
		value: function attributeApplyValue(name, value) {
			var method = this.getAttributeApplyValueMethod(name);
			if (!method) {
				var ELEMENT = this._root.querySelector('.' + this._mainClass + '__' + name);

				var PROPERTY = this.getAttribute('data-src-' + name);

				ELEMENT[PROPERTY] = value;
			} else {
				method.call(this, [value]);
			}
		}
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
							this.attributeApplyValue(name, value);
						}
					});
				}
			});
		}
	}, {
		key: 'getAttributeChangedCallbackMethod',
		value: function getAttributeChangedCallbackMethod(name) {
			var method = 'attribute' + name.replace(/[\-_]\w/g, function (w) {
				return w.replace(/[\-_]/, '').toUpperCase();
			}) + 'ChangedCallback';
			return this[method];
		}
	}, {
		key: 'getAttributeApplyValueMethod',
		value: function getAttributeApplyValueMethod(name) {
			var method = 'attribute' + name.replace(/[\-_]\w/g, function (w) {
				return w.replace(/[\-_]/, '').toUpperCase();
			}) + 'ApplyValue';
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