'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('./index.less');
var React = require('react');

function testType(src) {
  var t = typeof src === 'undefined' ? 'undefined' : _typeof(src);
  if (t === 'function' && src.prototype && (src.prototype.isReactComponent || src.prototype instanceof React.Component)) {
    return 'ReactClass';
  } else if (t === 'object' && React.isValidElement(src)) {
    return 'ReactElement';
  }
  return t;
}

module.exports = function (store) {
  var Icon = function (_React$Component) {
    _inherits(Icon, _React$Component);

    function Icon() {
      _classCallCheck(this, Icon);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Icon).apply(this, arguments));
    }

    _createClass(Icon, [{
      key: 'render',
      value: function render() {
        var src = this.props.name,
            type = testType(src);

        var className = "svgicon svgicon-size-" + this.props.size;
        if (this.props.className) {
          className += " " + this.props.className;
        }

        var props = Object.assign({}, this.props, {
          className: className,
          size: null,
          name: null
        });

        if (type === 'ReactClass') {
          return React.createElement(src, props);
        }
        if (type === 'ReactElement') {
          return React.cloneElement(src, props);
        }
        if (type === 'string' && (src = store(src))) {
          return React.createElement(src, props);
        }
        return null;
      }
    }]);

    return Icon;
  }(React.Component);

  Icon.defaultProps = {
    size: 'large'
  };

  Icon.propTypes = {
    size: React.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge'])
  };

  var Button = function (_React$Component2) {
    _inherits(Button, _React$Component2);

    function Button() {
      _classCallCheck(this, Button);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Button).apply(this, arguments));
    }

    _createClass(Button, [{
      key: 'render',
      value: function render() {
        var className = "svgicon-button";
        if (this.props.className) {
          className += " " + this.props.className;
        }
        return React.createElement(
          'div',
          _extends({}, this.props, { className: className, size: null, text: null, name: null }),
          React.createElement(Icon, { name: this.props.name, size: this.props.size || "small" }),
          this.props.text && React.createElement(
            'span',
            { className: 'svgicon-text' },
            this.props.text
          )
        );
      }
    }]);

    return Button;
  }(React.Component);

  Icon.Button = Button;

  return Icon;
};