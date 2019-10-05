"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = exports.get = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _config = _interopRequireDefault(require("./config"));

var _logger = _interopRequireDefault(require("./logger"));

var get =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(_ref) {
    var site_name, site;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            site_name = _ref.site;
            site = _config["default"].sites.find(function (site) {
              return site.name == site_name;
            });

            if (!site) {
              _logger["default"].error("Site not found");

              process.exit(-1);
            }

            if (_fsExtra["default"].existsSync("".concat(site.dir, "/state.json"))) {
              _context.next = 6;
              break;
            }

            _context.next = 6;
            return _fsExtra["default"].writeJSON("".concat(site.dir, "/state.json"), {
              history: []
            });

          case 6:
            _context.next = 8;
            return _fsExtra["default"].readJson("".concat(site.dir, "/state.json"));

          case 8:
            return _context.abrupt("return", _context.sent);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function get(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.get = get;

var set =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(_ref3) {
    var site_name, state, site;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            site_name = _ref3.site, state = _ref3.state;
            site = _config["default"].sites.find(function (site) {
              return site.name == site_name;
            });
            _context2.next = 4;
            return _fsExtra["default"].writeJSON("".concat(site.dir, "/state.json"), state);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function set(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

exports.set = set;