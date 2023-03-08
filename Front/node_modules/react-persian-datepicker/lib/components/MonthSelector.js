'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _momentJalali = require('moment-jalali');

var _momentJalali2 = _interopRequireDefault(_momentJalali);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _MonthsViewHeading = require('./MonthsViewHeading');

var _MonthsViewHeading2 = _interopRequireDefault(_MonthsViewHeading);

var _persian = require('../utils/persian');

var _assets = require('../utils/assets');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// List of months
var months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

var MonthSelector = function (_Component) {
  _inherits(MonthSelector, _Component);

  function MonthSelector() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MonthSelector);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MonthSelector.__proto__ || Object.getPrototypeOf(MonthSelector)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      year: _this.props.selectedMonth
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MonthSelector, [{
    key: 'nextYear',
    value: function nextYear() {
      this.setState({
        year: this.state.year.clone().add(1, 'year')
      });
    }
  }, {
    key: 'prevYear',
    value: function prevYear() {
      this.setState({
        year: this.state.year.clone().subtract(1, 'year')
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(key) {
      var _context = this.context,
          setMonth = _context.setMonth,
          setCalendarMode = _context.setCalendarMode;

      setMonth((0, _momentJalali2.default)(key, 'jM-jYYYY'));
      setCalendarMode('days');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var year = this.state.year;
      var _props = this.props,
          selectedMonth = _props.selectedMonth,
          styles = _props.styles;


      return _react2.default.createElement(
        'div',
        { className: 'month-selector' },
        _react2.default.createElement(_MonthsViewHeading2.default, {
          styles: styles,
          year: year,
          onNextYear: this.nextYear.bind(this),
          onPrevYear: this.prevYear.bind(this)
        }),
        _react2.default.createElement(
          'div',
          { className: styles.monthsList },
          months.map(function (name, key) {
            var buttonFingerprint = key + 1 + '-' + year.format('jYYYY');
            var selectedMonthFingerprint = selectedMonth.format('jM-jYYYY');
            var isCurrent = selectedMonthFingerprint === buttonFingerprint;

            var className = (0, _classnames3.default)(styles.monthWrapper, _defineProperty({}, styles.selected, isCurrent));

            return _react2.default.createElement(
              'div',
              { key: key, className: className },
              _react2.default.createElement(
                'button',
                { onClick: _this2.handleClick.bind(_this2, buttonFingerprint) },
                name
              )
            );
          })
        )
      );
    }
  }]);

  return MonthSelector;
}(_react.Component);

MonthSelector.propTypes = {
  styles: _propTypes2.default.object,
  selectedMonth: _propTypes2.default.object.isRequired
};
MonthSelector.contextTypes = {
  setCalendarMode: _propTypes2.default.func.isRequired,
  setMonth: _propTypes2.default.func.isRequired
};
exports.default = MonthSelector;