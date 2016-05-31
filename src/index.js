require('./index.less');
const React = require('react');

function testType(src) {
  let t = typeof src;
  if (t === 'function' && src.prototype && (src.prototype.isReactComponent || src.prototype instanceof React.Component)) {
    return 'ReactClass';
  }
  else if (t === 'object' && React.isValidElement(src)) {
    return 'ReactElement';
  }
  return t;
}

module.exports = function (store) {

  class Icon extends React.Component {
    render() {
      let src = this.props.name, type = testType(src);

      let className = "svgicon svgicon-size-" + this.props.size;
      if (this.props.className) {
        className += " " + this.props.className;
      }

      let props = Object.assign({}, this.props, {
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
  }

  Icon.defaultProps = {
    size: 'large'
  };

  Icon.propTypes = {
    size: React.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge'])
  };

  class Button extends React.Component {
    render() {
      let className = "svgicon-button";
      if (this.props.className) {
        className += " " + this.props.className;
      }
      let contents = this.props.text || this.props.children;
      return <div {...this.props} className={className} size={null} text={null} name={null}>
        <Icon name={this.props.name} size={this.props.size || "small"}/>
        {contents && <span className="svgicon-contents">{contents}</span>}
      </div>;
    }
  }

  Icon.Button = Button;

  return Icon;
};
