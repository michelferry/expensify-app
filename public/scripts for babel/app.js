"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
  _inherits(IndecisionApp, _React$Component);

  function IndecisionApp(props) {
    _classCallCheck(this, IndecisionApp);

    var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

    _this.state = {
      options: []
    };
    _this.handleDeleteOptions = _this.handleDeleteOptions.bind(_this);
    _this.chooseRandomOption = _this.chooseRandomOption.bind(_this);
    _this.handleAddOption = _this.handleAddOption.bind(_this);
    _this.deleteSingleOption = _this.deleteSingleOption.bind(_this);
    return _this;
  }

  _createClass(IndecisionApp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      try {
        var json = localStorage.getItem("options");
        var options = JSON.parse(json);
        if (options) {
          this.setState(function () {
            return {
              options: JSON.parse(json)
            };
          });
        }
      } catch (e) {
        //Default values charged
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length != this.state.options.length) {
        var json = JSON.stringify(this.state.options);
        localStorage.setItem("options", json);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      console.log("Component will unmount");
    }
  }, {
    key: "handleDeleteOptions",
    value: function handleDeleteOptions() {
      this.setState(function () {
        return {
          options: []
        };
      });
    }
  }, {
    key: "deleteSingleOption",
    value: function deleteSingleOption(option) {
      console.log("remove single option " + option);
      this.setState(function (prevState) {
        return {
          options: prevState.options.filter(function (o) {
            return o != option;
          })
        };
      });
    }
  }, {
    key: "chooseRandomOption",
    value: function chooseRandomOption() {
      var rand = Math.floor(Math.random() * this.state.options.length);
      alert(this.state.options[rand]);
    }
  }, {
    key: "handleAddOption",
    value: function handleAddOption(option) {
      if (!option) {
        return "Enter valid value to add item.";
      } else if (this.state.options.indexOf(option) != -1) {
        return "The option already exists.";
      } else {
        this.setState(function (prevState) {
          return {
            options: prevState.options.concat([option])
          };
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var title = "Indecision App";
      var subtitle = "Put your life in the hands of a computer";

      return React.createElement(
        "div",
        null,
        React.createElement(Header, { subtitle: subtitle }),
        React.createElement(Action, { hasOptions: this.state.options.length > 0, chooseRandomOption: this.chooseRandomOption }),
        React.createElement(Options, { options: this.state.options, handleDeleteOptions: this.handleDeleteOptions, deleteSingleOption: this.deleteSingleOption }),
        React.createElement(AddOption, { handleAddOption: this.handleAddOption })
      );
    }
  }]);

  return IndecisionApp;
}(React.Component);

var Header = function Header(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      null,
      props.title
    ),
    props.subtitle && React.createElement(
      "h2",
      null,
      props.subtitle
    )
  );
};

Header.defaultProps = {
  title: "Indecision"
};

var Action = function Action(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      {
        onClick: props.chooseRandomOption,
        disabled: !props.hasOptions
      },
      "What should I do?"
    )
  );
};

var Options = function Options(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      { onClick: props.handleDeleteOptions },
      "Remove all"
    ),
    props.options.length == 0 && React.createElement(
      "p",
      null,
      "No options yet."
    ),
    React.createElement(
      "ul",
      null,
      props.options.map(function (o) {
        return React.createElement(Option, { key: props.options.indexOf(o), value: o, deleteSingleOption: props.deleteSingleOption });
      })
    )
  );
};

var Option = function Option(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "li",
      null,
      props.value
    ),
    React.createElement(
      "button",
      { onClick: function onClick(e) {
          props.deleteSingleOption(props.value);
        } },
      "Delete option"
    )
  );
};

var AddOption = function (_React$Component2) {
  _inherits(AddOption, _React$Component2);

  function AddOption(props) {
    _classCallCheck(this, AddOption);

    var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

    _this2.addNewOption = _this2.addNewOption.bind(_this2);
    _this2.state = {
      error: undefined
    };
    return _this2;
  }

  _createClass(AddOption, [{
    key: "addNewOption",
    value: function addNewOption(e) {
      e.preventDefault();

      var newOption = e.target.elements.option.value.trim();
      var error = this.props.handleAddOption(newOption);
      this.setState(function () {
        return {
          error: error
        };
      });
      if (!error) {
        e.target.elements.option.value = "";
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "form",
        { onSubmit: this.addNewOption },
        React.createElement("input", { type: "text", name: "option" }),
        React.createElement(
          "button",
          null,
          "Add option"
        ),
        this.state.error && React.createElement(
          "p",
          null,
          this.state.error
        )
      );
    }
  }]);

  return AddOption;
}(React.Component);

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById("app"));
